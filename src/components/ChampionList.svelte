<script>

export let perPage = null;
export let list = [];
export let size = 'lg';

let sliced;

$: sliced = perPage ? list.slice(0, perPage) : list;

</script>

{#if sliced.length}
    <div class="row">
    {#each sliced as champion}
        <div
            class="col-3 col-md-4 my-1 text-center"
            class:col-lg-2={ size !== 'lg' } class:col-lg-3={ size === 'lg' }>
            <img src={ champion.image } alt={ champion.name }>
            <div>{ champion.name }</div>
        </div>
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
