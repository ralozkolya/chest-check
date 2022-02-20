import { readable, writable } from "svelte/store";
import regions from "../../data/regions.json";

const path = location.pathname.split("/").slice(1);

const _keys = Object.keys(regions);

let _region;
let _username;

if (2 === path.length && path[0] in regions) {
  [ _region, _username ] = path;
} else {
  _region = _keys[0];
  _username = '';
}

export const region = writable(_region);
export const username = writable(_username);
export const regionKeys = readable(_keys);
