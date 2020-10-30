<script>

import axios from 'axios';
import { onMount } from 'svelte';
import _ from 'lodash';

import regions from '../../data/regions.json';
import '../scss/user.scss';
import ChampionList from './ChampionList.svelte';

export let username;
export let region;
export let loading = true;

export const update = _.debounce(_update, 20);

let data;
let error;
let granted;
let notGranted;

let filterText;
$: {
    granted =  data && data.filter(champion => champion.chestGranted);
    notGranted = data && data.filter(champion => !champion.chestGranted);
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

function filter() {

    if (filterText) {
        granted = data.filter(champion => {
            const champName = champion.name.toLowerCase();
            const inputName = filterText.toLowerCase();
            return champion.chestGranted && champName.includes(inputName);
        });

        notGranted = data.filter(champion => {
            const champName = champion.name.toLowerCase();
            const inputName = filterText.toLowerCase();
            return !champion.chestGranted && champName.includes(inputName);
        });
    } else {
        data = data;
    }
}

onMount(() => update(username, region));

</script>

<div>
    {#if granted}
        <div class="row my-5">
            <div class="col-md-4 offset-md-8">
                <input class="form-control" type="text" placeholder="Filter" bind:value={ filterText } on:input={ filter }>
            </div>
        </div>
        <div class="row">
            <div class="col-md-7">
                <h2>To earn:</h2>
                <ChampionList list={ notGranted } perPage={ 24 } />
            </div>
            <div class="col-md-5">
                <h2>Earned:</h2>
                <ChampionList list={ granted } size="sm" />
            </div>
        </div>
    {:else}
        <h3>{ error ? error : 'Loading...' }</h3>
    {/if}
</div>
