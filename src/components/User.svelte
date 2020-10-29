<script>

import axios from 'axios';
import { onMount } from 'svelte';
import _ from 'lodash';

import regions from '../constants/regions.js';
import '../scss/user.scss';

export let username;
export let region;
export let loading = true;

export const update = _.debounce(_update, 20);

let data;
let error;
let notGrantedFull;
let notGranted;

let filterText;
$: granted =  data && data.filter(champion => champion.chestGranted);
$: {
    notGrantedFull = data && data.filter(champion => !champion.chestGranted);
    notGranted = data && data.filter(champion => !champion.chestGranted).slice(0, 24)
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
                {#if notGranted.length}
                    <div class="row">
                    {#each notGranted as champion}
                        <div class="col-3 col-md-4 col-lg-3 my-1 text-center">
                            <img src={ champion.image } alt={ champion.name }>
                            <div>{ champion.name }</div>
                        </div>
                    {/each}
                    </div>
                {:else}
                    <h3>Nothing here :(</h3>
                {/if}
                {#if notGranted.length < notGrantedFull.length}
                    <button
                        class="btn btn-block btn-outline-light my-3"
                        on:click={ () => notGranted = notGrantedFull.slice(0, notGranted.length + 24) }>
                        Load more
                    </button>
                {/if}
            </div>
            <div class="col-md-5">
                <h2>Earned:</h2>
                {#if granted.length}
                    <div class="row">
                    {#each granted as champion}
                        <div class="col-3 col-md-4 col-lg-2 my-1 text-center">
                            <img src={ champion.image } alt={ champion.name }>
                            <div class="small">{ champion.name }</div>
                        </div>
                    {/each}
                    </div>
                {:else}
                    <h3>Nothing here :(</h3>
                {/if}
            </div>
        </div>
    {:else}
        <h3>{ error ? error : 'Loading...' }</h3>
    {/if}
</div>
