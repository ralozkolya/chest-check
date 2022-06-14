import transform from './transform';

export default async function search(username, region) {
  try {

    const url = `/api/search?${new URLSearchParams({ username, region })}`;
    const response = await fetch(url);

    if (response.ok) {
      return response.json();
    }

    throw Error('Summoner was not found');

  } catch (e) {
    const message = e.message === 'Summoner was not found'
      ? e.message
      : 'Unexpected error occured';
    throw Error(message);
  }
}

export async function runes(champion, mode, rank, role) {

  champion = transform(champion);

  const params = new URLSearchParams();

  Object.entries({ champion, mode, rank, role }).forEach(([ key, value ]) => {
    value && params.set(key, value);
  });

  const url = `/api/runes?${ params }`;
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  }

  throw Error('Unexpected error occured');

}
