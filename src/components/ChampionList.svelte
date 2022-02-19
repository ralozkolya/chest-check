<script>
  import Champion from "./Champion.svelte";
  import { flip } from "svelte/animate";
  import TumbleWeedContainer from "./TumbleWeedContainer.svelte";

  import '../scss/champion-list.scss';

  export let perPage = null;
  export let list = [];
  export let size = "lg";
  
  const elementId = `id-${crypto.randomUUID()}`;
  let sliced;

  $: sliced = perPage ? list.slice(0, perPage) : list;
</script>

{#if sliced.length}
  <div class="row position-relative" id={ elementId }>
    {#each sliced as champion (champion.id)}
      <div
        animate:flip={{ duration: 200 }}
        class="col-3 col-md-4 my-2 overflow-hidden"
        class:col-lg-2={'lg' !== size}
        class:col-lg-3={'lg' === size}>
        <Champion on:forget {champion} parent={ `#${elementId}` } />
      </div>
    {/each}
  </div>
{:else}
  <h3 class="darken">Nothing here :(</h3>
  <TumbleWeedContainer />
{/if}
{#if sliced.length < list.length && list.length > perPage}
  <div class="d-grid">
    <button
      class="btn btn-outline-light my-3"
      on:click={() => (sliced = list.slice(0, sliced.length + perPage))}>
      Load more
    </button>
  </div>
{/if}
