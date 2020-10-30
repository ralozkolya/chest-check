const axios = require('axios');
const assert = require('assert');
const regions = require('../data/regions.json');
const champMap = require('../data/map.json');

module.exports = async (req, res) => {
  
  const { RIOT_KEY } = process.env;
  const params = { headers: { 'X-Riot-Token': RIOT_KEY } };

  try {
    validate(req.query);
  } catch (e) {
    return res.status(422).send(e.message);
  }

  const { username, region } = req.query;
  const url = `https://${region}.api.riotgames.com`;

  try {

    const { data: { id } } = await axios.get(`${url}/lol/summoner/v4/summoners/by-name/${username}`, params);

    const mastery = await axios.get(`${url}/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`, params);

    const mapped = mastery.data.map(champ => {

      const full = champMap[champ.championId];

      return {
        id: champ.championId,
        points: champ.championPoints,
        name: full.name,
        level: champ.championLevel,
        chestGranted: champ.chestGranted,
        image: `https://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${full.image.full}`
      };
    });

    res.send(mapped);

  } catch (e) {
    res.status(e.response && e.response.status || 500).send(e);
  }

};


function validate(data) {
  const { username, region } = data;

  const regionValues = Object.values(regions);
  assert(regionValues.includes(region), `'region' must be one of ${regionValues.join(', ')}`);
  assert(username, "'username' is mandatory");
}
