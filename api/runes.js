import axios from 'axios';
import * as cheerio from 'cheerio';

export default async (req, res) => {

  const { champion, mode, rank, role } = req.query;

  let response;

  switch (mode) {
    case 'aram':
      response = await axios.get(`https://u.gg/lol/champions/aram/${champion}-aram`);
      break;
    case 'arurf':
      response = await axios.get(`https://u.gg/lol/champions/arurf/${champion}-arurf`);
      break;
    default:
      response = await axios.get(
        `https://u.gg/lol/champions/${champion}/build`,
        {
          params: { rank, role }
        }
      );
  }

  const $ = cheerio.load(response.data);

  const primaryTree = getTree($, '.media-query_MOBILE_LARGE__DESKTOP_LARGE .primary-tree');
  const secondaryTree = getTree($, '.media-query_MOBILE_LARGE__DESKTOP_LARGE .secondary-tree');

  res.send({ primaryTree, secondaryTree });

};

function getTree($, selector) {

  const rows = $(`${selector} .perk-row`);

  const header = $(`${selector} .rune-tree_header`);
  const title = header.find('.perk-style-title').html();
  const img = header.find('img');
  const src = img.attr('src');
  const alt = img.attr('alt');

  const tree = rows.map((i, row) => {

    const perk = $(row).find('.perk, .shard').map((i, perk) => {
      const active = !perk.attribs.class.includes('inactive');
      const keystone = perk.attribs.class.includes('keystone');
      const img = $(perk).find('img');
      const src = img.attr('src');
      const alt = img.attr('alt');
      const shard = i > 2;
      return { active, src, alt, shard, keystone };
    }).get();

    return [ perk ];

  }).get();

  return { tree, title, src, alt };
}
