<script>

import { createEventDispatcher } from 'svelte';

import '../scss/champion.scss';

export let champion;
export let size;
export let showForget = true;

const dispatch = createEventDispatcher();

function forget(id) {
    dispatch('forget', id);
}

</script>

<div
    class="col-3 col-md-4 my-1 text-center overflow-hidden"
    class:col-lg-2={ 'lg' !== size  } class:col-lg-3={ 'lg' === size }>
    {#if showForget}
        <div class="close">
            <button class="btn btn-sm btn-danger" on:click={ () => forget(champion.id) }>&times;</button>
        </div>
    {/if}
    <img class="w-100" src={ champion.image } alt={ champion.name }>
    <div class:small={ 'lg' !== size }>{ champion.name }</div>
</div>
