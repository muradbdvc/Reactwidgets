import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PLAYERS_FILE = join(__dirname, '..', 'src', 'data', 'players.json');
const API = 'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=thumbnail&pithumbsize=120&origin=*&titles=';

let raw = readFileSync(PLAYERS_FILE, 'utf-8');
// Strip BOM if present
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const data = JSON.parse(raw);
const all = [];

for (const [country, players] of Object.entries(data)) {
  for (const p of players) {
    all.push({ country, player: p, wikiName: p.name.replace(/[\s.]+/g, '_') });
  }
}

for (let i = 0; i < all.length; i += 50) {
  const batch = all.slice(i, i + 50);
  const titles = batch.map(x => x.wikiName).join('|');
  const url = API + encodeURIComponent(titles);

  try {
    const res = await fetch(url);
    const json = await res.json();
    const pages = json?.query?.pages || {};

    for (const [, page] of Object.entries(pages)) {
      if (page?.thumbnail?.source) {
        const found = batch.find(x => x.wikiName === page.title.replace(/ /g, '_'));
        if (found) {
          found.player.photo = page.thumbnail.source;
        }
      }
    }
  } catch (err) {
    console.error(`Batch ${i} failed:`, err.message);
  }

  console.log(`Processed ${Math.min(i + 50, all.length)} / ${all.length}`);
  await new Promise(r => setTimeout(r, 300));
}

writeFileSync(PLAYERS_FILE, JSON.stringify(data, null, 2), { encoding: 'utf-8' });
console.log('Done. Updated players.json');
