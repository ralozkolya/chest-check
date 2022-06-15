<script>
  import Champion from "./Champion.svelte";
  import { flip } from "svelte/animate";
  import TumbleWeedContainer from "./TumbleWeedContainer.svelte";

  import '../scss/champion-list.scss';

  export let perPage = null;
  export let list = [];
  export let size = "lg";

  $: sliced = perPage ? list.slice(0, perPage) : list;
</script>

{#if sliced.length}
  <div class="row">
    {#each sliced as champion (champion.id)}
      <div
        animate:flip={{ duration: 200 }}
        class="col-3 col-md-4 my-2 overflow-hidden"
        class:col-lg-2={'lg' !== size}
        class:col-lg-3={'lg' === size}>
        <Champion {champion} />
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
