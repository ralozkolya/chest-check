import axios from "axios";
import assert from "assert";
import regions from "../data/regions.json";

// To retrieve the versions list, check
// https://ddragon.leagueoflegends.com/api/versions.json
// Champion list
// https://ddragon.leagueoflegends.com/cdn/13.13.1/data/en_US/championFull.json
import champMap from "../data/championFull.json";

export default async (req, res) => {
  const { RIOT_KEY } = process.env;
  const params = { headers: { "X-Riot-Token": RIOT_KEY } };

  try {
    validate(req.query);
  } catch (e) {
    return res.status(422).send(e.message);
  }

  const { username, region } = req.query;
  const url = `https://${region}.api.riotgames.com`;

  try {
    const {
      data: { id },
    } = await axios.get(
      `${url}/lol/summoner/v4/summoners/by-name/${username}`,
      params
    );

    const mastery = await axios.get(
      `${url}/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`,
      params
    );

    const mapped = mastery.data.map((champ) => {
      const full = champMap.data[champMap.keys[champ.championId]];

      return (
        full && {
          id: champ.championId,
          points: champ.championPoints,
          name: full.name,
          level: champ.championLevel,
          chestGranted: champ.chestGranted,
          image: `https://ddragon.leagueoflegends.com/cdn/${champMap.version}/img/champion/${full.image.full}`,
          splash: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${full.id}_0.jpg`,
        }
      );
    });

    res.send(mapped.filter((champ) => champ));
  } catch (e) {
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
