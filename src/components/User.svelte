<script>

import _ from 'lodash';
import { onMount } from 'svelte';

import regions from '../../data/regions.json';
import ChampionList from './ChampionList.svelte';
import Dropdown from './Dropdown.svelte';
import { splitData, updateForgotten } from '../utils/filter';
import search from '../utils/api';

export let username;
export let region;
export let loading = true;

export function update() {
    loading = true;
    retrieve();
}

let data;
let error;
let granted;
let notGranted;
let forgotten;
let name;

$: filter(data);

const retrieve = _.debounce(async () => {
    loading = true;
    try {
        data = error = null;
        data = await search(username, regions[region]);
    } catch (e) {
        error = e.message;
    }
    loading = false;
}, 10);

function filter() {
    ({ granted, notGranted, forgotten } = splitData(data, name));
}

function forget(id) {
    updateForgotten(id);
    filter();
}

onMount(update);

</script>

<div>
    {#if !loading}
        <div class="row my-5">
            <div class="col-md-4 offset-md-8">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Filter"
                    bind:value={ name }
                    on:input={ filter }
                    aria-label="Filter">
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
