import { writable, derived } from "svelte/store";

export const loading = writable(false);
export const error = writable(null);
export const version = writable(null);

let triggered = false;
export const refresh = derived(loading, ($loading) => {
  if ($loading) {
    triggered = true;
  }
  return triggered;
});
