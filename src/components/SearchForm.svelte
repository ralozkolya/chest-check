<script>

import { createEventDispatcher } from 'svelte';
import dropdown from 'bootstrap/js/dist/dropdown';
import { navigate } from 'svelte-routing';
import regions from '../../data/regions.json';
import '../scss/search-form.scss';
import Dropdown from './Dropdown.svelte';

export let loading;

const REGION_KEY = 'region';
const USERNAME_KEY = 'username';

const regionKeys = Object.keys(regions);

const path = location.pathname.split('/').slice(1);
let region;
let username;

if (2 === path.length && regionKeys.includes(path[0])) {
    [ region, username ] = path;
} else {
    region = localStorage.getItem(REGION_KEY) || regionKeys[0];
    username = localStorage.getItem(USERNAME_KEY) || '';
}

const dispatch = createEventDispatcher();

function onSubmit() {

    localStorage.setItem(REGION_KEY, region);
    localStorage.setItem(USERNAME_KEY, username);
    navigate(`/${region}/${username}`);
    dispatch('update', { username, region });
}

</script>

<form on:submit|preventDefault={onSubmit}>
    <div class="form-group">
        <div class="input-group">
            <input
                type="text"
                class="form-control form-control-lg"
                bind:value={ username }
                placeholder="Summoner name"
                aria-label="Summoner name"
                required>
            <div class="input-group-append">
                <Dropdown keys={ regionKeys } bind:value={ region } />
            </div>
            <div class="input-group-append">
                <button class="btn btn-outline-light wide" disabled={ loading }>
                    { loading ? 'Loading...' : 'Search' }
                </button>
            </div>
        </div>
    </div>
</form>
