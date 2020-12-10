<script>
  import _ from "lodash";
  import { onMount } from "svelte";

  import regions from "../../data/regions.json";
  import ChampionList from "./ChampionList.svelte";
  import Dropdown from "./Dropdown.svelte";
  import { splitData, updateForgotten } from "../utils/filter";
  import search from "../utils/api";

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

  $: filter(data, name);

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

  function filter(data, name) {
    ({ granted, notGranted, forgotten } = splitData(data, name));
  }

  function forget(id) {
    updateForgotten(id);
    filter(data, name);
  }

  onMount(update);
</script>

<div>
  {#if !loading && !error}
    <div class="row my-5">
      <div class="col-md-4 offset-md-8">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Filter"
            bind:value={name}
            aria-label="Filter" />
          <div class="input-group-append">
            <button class="btn btn-outline-light" on:click={() => (name = '')}>
              &times;
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-7">
        <h2>To earn ({notGranted.length}):</h2>
        <ChampionList
          list={notGranted}
          perPage={24}
          on:forget={e => forget(e.detail)} />
      </div>
      <div class="col-md-5">
        <h2>Earned ({granted.length}):</h2>
        <ChampionList
          list={granted}
          size="sm"
          on:forget={e => forget(e.detail)} />
        {#if forgotten.length}
          <h2 class="mt-3">Forgotten (RIP) ({forgotten.length}):</h2>
          <ChampionList
            list={forgotten}
            size="sm"
            on:forget={e => forget(e.detail)} />
        {/if}
      </div>
    </div>
  {:else if error}
    <h3 class="darken">{error}</h3>
  {:else}
    <div class="d-flex justify-content-center align-items-center align mt-5 darken">
      <div class="spinner-border text-center" role="status"></div>
      <h3 class="ml-3">Loading...</h3>
    </div>
  {/if}
</div>
