import { writable, derived, readable } from 'svelte/store';

const FORGOTTEN_KEY = 'forgotten';

let _forgottenIds = localStorage.getItem(FORGOTTEN_KEY);
_forgottenIds = _forgottenIds ? new Set(_forgottenIds.split(',').map(Number)) : new Set();

export const forgottenIds = writable(_forgottenIds);

export const champions = writable([]);

export const championName = writable('');

export const filtered = derived(
  [ champions, championName ],
  ([ $champions, $name ]) => $champions.filter(champ => {
    return !$name || champ.name.toLowerCase().includes($name.toLowerCase())
  })
);

export const granted = derived(
  [ filtered, forgottenIds ],
  ([ $champions, $forgottenIds ]) => {
    return $champions.filter(champ => !$forgottenIds.has(champ.id) && champ.chestGranted);
  }
);

export const notGranted = derived(
  [ filtered, forgottenIds ],
  ([ $champions, $forgottenIds ]) => {
    return $champions.filter(champ => !$forgottenIds.has(champ.id) && !champ.chestGranted)
  }
);

export const forgotten = derived(
  [ filtered, forgottenIds ],
  ([ $champions, $forgottenIds ]) => {
    return $champions.filter(champ => $forgottenIds.has(champ.id))
  }
);

forgottenIds.subscribe(ids => {
  localStorage.setItem(FORGOTTEN_KEY, ([ ...ids ]).join(','));
});
