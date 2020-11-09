const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = async () => {
    
    const { data: [ version ] } = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');

    let existingVersion;

    try {
        existingVersion = fs.readFileSync(path.join(__dirname, '../data/version')).toString();
    } catch (e) {
        existingVersion = null;
    }

    if (existingVersion !== version) {
        const { data } = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/championFull.json`);
        fs.writeFileSync(path.join(__dirname, '../data/championsFull.json'), JSON.stringify(data));
        fs.writeFileSync(path.join(__dirname, '../data/version'), version);
    }

    return version;

};
