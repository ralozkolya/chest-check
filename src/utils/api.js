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
