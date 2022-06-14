import axios from 'axios';
import * as cheerio from 'cheerio';

export default async (req, res) => {

  const { champion, mode, rank, role } = req.query;

  let response;

  if ('ranked' === mode) {
    response = await axios.get(
      `https://u.gg/lol/champions/${champion}/build`,
      {
        params: { rank, role }
      }
    );
  } else {
    response = await axios.get(`https://u.gg/lol/champions/aram/${champion}-aram`);
  }

  const $ = cheerio.load(response.data);

  const primaryTree = getPrimaryTree($);
  const secondaryTree = getSecondaryTree($);

  res.send({ primaryTree, secondaryTree });

};

function getPrimaryTree($) {

  const rows = $('.media-query_MOBILE_LARGE__DESKTOP_LARGE .primary-tree .perk-row');

  const result = rows.map((i, row) => {

    const perk = $(row).find('.perk').map((i, perk) => {
      const active = !perk.attribs.class.includes('inactive');
      const keystone = perk.attribs.class.includes('keystone');
      const img = $(perk).find('img');
      const src = img.attr('src');
      const alt = img.attr('alt');
      return { active, src, alt, keystone };
    }).get();

    return [ perk ];
  }).get();

  return result;

}

function getSecondaryTree($) {

  const rows = $('.media-query_MOBILE_LARGE__DESKTOP_LARGE .secondary-tree .perk-row');

  const result = rows.map((i, row) => {

    const perk = $(row).find('.perk, .shard').map((j, perk) => {
      const active = !perk.attribs.class.includes('inactive');
      const shard = i > 2;
      const img = $(perk).find('img');
      const src = img.attr('src');
      const alt = img.attr('alt');
      return { active, src, alt, shard };
    }).get();

    return [ perk ];

  }).get();

  return result;
}
