<script>

import Champion from './Champion.svelte';
import '../scss/champion-list.scss';

export let perPage = null;
export let list = [];
export let size = 'lg';
export let showForget = true;

let sliced;

$: sliced = perPage ? list.slice(0, perPage) : list;

</script>

{#if sliced.length}
    <div class="row">
    {#each sliced as champion}
        <Champion { champion } { size } { showForget } on:forget />
    {/each}
    </div>
{:else}
    <h3>Nothing here :(</h3>
{/if}
{#if sliced.length < list.length && list.length > perPage}
    <button
        class="btn btn-block btn-outline-light my-3"
        on:click={ () => sliced = list.slice(0, sliced.length + perPage) }>
        Load more
    </button>
{/if}
