import axios from 'axios';

export default async function search(username, region) {
    try {
        const response = await axios.get('/api/search', {
            params: { username, region }
        });
        return response.data;
    } catch (e) {
        if (e.response && 404 === e.response.status) {
            throw Error('Summoner was not found');
        } else {
            throw Error('Unexpected error occured');
        }
    }
}
