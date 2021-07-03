<script>
  import { createEventDispatcher } from "svelte";
  import { flip } from "svelte/animate";
  import TumbleWeedContainer from "./TumbleWeedContainer.svelte";
  import "../scss/champion-list.scss";

  export let perPage = null;
  export let list = [];
  export let size = "lg";

  const dispatch = createEventDispatcher();

  let sliced;

  $: sliced = perPage ? list.slice(0, perPage) : list;
</script>

{#if sliced.length}
  <div class="row">
    {#each sliced as champion (champion.id)}
      <div
        animate:flip={{ duration: 200 }}
        class="col-3 col-md-4 my-1 text-center overflow-hidden"
        class:col-lg-2={'lg' !== size}
        class:col-lg-3={'lg' === size}>
        <div class="close">
          <button
            class="btn btn-sm btn-danger"
            on:click={() => dispatch('forget', champion.id)}>
            &times;
          </button>
        </div>
        <img class="w-100" src={champion.image} alt={champion.name} />
        <div class="name" class:small={'lg' !== size}>
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://u.gg/lol/champions/${champion.name.toLowerCase()}/build`}>
            {champion.name} 🡕
          </a>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <h3 class="darken">Nothing here :(</h3>
  <TumbleWeedContainer />
{/if}
{#if sliced.length < list.length && list.length > perPage}
  <button
    class="btn btn-block btn-outline-light my-3"
    on:click={() => (sliced = list.slice(0, sliced.length + perPage))}>
    Load more
  </button>
{/if}
