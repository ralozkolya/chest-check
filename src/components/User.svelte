<script>

import axios from 'axios';
import { onMount } from 'svelte';
import _ from 'lodash';

import regions from '../../data/regions.json';
import ChampionList from './ChampionList.svelte';
import Dropdown from './Dropdown.svelte';

export let username;
export let region;
export let loading = true;

export const update = _.debounce(_update, 20);

const FORGOTTEN_KEY = 'forgotten';

let data;
let error;
let granted;
let notGranted;
let forgotten;
let forgottenIds = localStorage.getItem(FORGOTTEN_KEY)?.split(',').map(id => parseInt(id));

$: {
    granted =  data?.filter(champion => champion.chestGranted);
    notGranted = data?.filter(champion => !champion.chestGranted && !forgottenIds.includes(champion.id));
    forgotten = data?.filter(champion => forgottenIds.includes(champion.id));
};

async function _update(username, region) {
    try {
        loading = true;
        data = error = null;
        const response = await axios.get('/api/search', {
            params: { username, region: regions[region] }
        });
        data = response.data;
    } catch (e) {
        if (e.response && 404 === e.response.status) {
            error = 'Summoner was not found';
        } else {
            error = 'Unexpected error occured';
        }
    }

    loading = false;
}

function filter({ target: { value } }) {

    if (value) {

        const inputName = value.toLowerCase();

        granted = [];
        notGranted = [];

        data.forEach(champion => {
            if (champion.name.toLowerCase().includes(inputName)) {
                champion.chestGranted ? granted.push(champion) : notGranted.push(champion);
            }
        });

    } else {
        data = data;
    }
}

function forget(id) {
    forgottenIds.includes(id) ? forgottenIds.splice(forgottenIds.indexOf(id), 1) : forgottenIds.push(id);
    localStorage.setItem(FORGOTTEN_KEY, forgottenIds.filter(i => i));
    data = data;
}

onMount(() => update(username, region));

</script>

<div>
    {#if granted}
        <div class="row my-5">
            <div class="col-md-4 offset-md-8">
                <input class="form-control" type="text" placeholder="Filter" on:input={ filter }>
            </div>
        </div>
        <div class="row">
            <div class="col-md-7">
                <h2>To earn:</h2>
                <ChampionList list={ notGranted } perPage={ 24 } on:forget={ e => forget(e.detail) } />
            </div>
            <div class="col-md-5">
                <h2>Earned:</h2>
                <ChampionList list={ granted } size="sm" showForget={ false } />
                {#if forgotten.length}
                    <h2 class="mt-3">Forgotten (RIP):</h2>
                    <ChampionList list={ forgotten } size="sm"  on:forget={ e => forget(e.detail) } />
                {/if}
            </div>
        </div>
    {:else}
        <h3>{ error ? error : 'Loading...' }</h3>
    {/if}
</div>
