import axios from "axios";
import assert from "assert";
import regions from "../data/regions.json";

export default async (req, res) => {
  const { RIOT_KEY } = process.env;

  const {
    data: [version],
  } = await axios.get("https://ddragon.leagueoflegends.com/api/versions.json");

  const { data: champMap } = await axios.get(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/championFull.json`
  );

  const client = axios.create({ headers: { "X-Riot-Token": RIOT_KEY } });

  try {
    validate(req.query);
  } catch (e) {
    return res.status(422).send(e.message);
  }

  const { username, region } = req.query;
  const url = `https://${region}.api.riotgames.com`;

  try {
    const {
      data: { puuid },
    } = await client.get(
      `${url}/lol/summoner/v4/summoners/by-name/${username}`
    );

    const mastery = await client.get(
      `${url}/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`
    );

    const indexedMastery = {};
    mastery.data.forEach(
      (mastery) => (indexedMastery[mastery.championId] = mastery)
    );

    const mapped = Object.entries(champMap.keys).map(([id, name]) => {
      const champ = champMap.data[name];
      const mastery = indexedMastery[id];

      return {
        id: champ.id,
        name: champ.name,
        points: mastery?.championPoints ?? 0,
        level: mastery?.championLevel ?? 1,
        chestGranted: !!mastery?.chestGranted,
        image: `https://ddragon.leagueoflegends.com/cdn/${champMap.version}/img/champion/${champ.image.full}`,
        splash: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`,
      };
    });

    res.send({
      champions: mapped.sort((a, b) => b.points - a.points),
      version,
    });
  } catch (e) {
    console.error(e.response.data);
    res.status((e.response && e.response.status) || 500).send(e);
  }
};

function validate(data) {
  const { username, region } = data;

  const regionValues = Object.values(regions);
  assert(
    regionValues.includes(region),
    `'region' must be one of ${regionValues.join(", ")}`
  );
  assert(username, "'username' is mandatory");
}
