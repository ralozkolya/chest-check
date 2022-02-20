import { champions, granted, notGranted, forgotten } from '../stores/stores/stores';

const FORGOTTEN_KEY = 'forgotten';

let forgottenIds = localStorage.getItem(FORGOTTEN_KEY);
forgottenIds = forgottenIds ? forgottenIds.split(',').map(id => parseInt(id)) : [];

export function splitData(data, name) {

  const response = {
    granted: [],
    notGranted: [],
    forgotten: []
  };

  if (name) {
    name = name.toLowerCase();
    data = data.filter(champ => champ.name.toLowerCase().includes(name));
  }

  Array.isArray(data) && data.forEach(champ => {
    if (forgottenIds.includes(champ.id)) {
      response.forgotten.push(champ);
    } else if (champ.chestGranted) {
      response.granted.push(champ);
    } else {
      response.notGranted.push(champ);
    }
  });

  return response;
}

export function updateForgotten(id) {
  forgottenIds.includes(id) ? forgottenIds.splice(forgottenIds.indexOf(id), 1) : forgottenIds.push(id);
  localStorage.setItem(FORGOTTEN_KEY, forgottenIds.filter(i => i));
}
