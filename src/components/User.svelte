<script>

  import ChampionList from "./ChampionList.svelte";
  import { granted, notGranted, forgotten, championName } from '../stores/champions';
  import { loading, error } from '../stores/app';

</script>

<div>
  <div class="row my-5">
    <div class="col-md-4 offset-md-8">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Filter"
          bind:value={$championName}
          aria-label="Filter" />
        <div class="input-group-append">
          <button class="btn btn-outline-light" on:click={() => championName.set('')}>
            &times;
          </button>
        </div>
      </div>
    </div>
  </div>
  {#if !$loading && !$error}
    <div class="row position-relative">
      <div class="col-md-7">
        <h4>To earn ({$notGranted.length}):</h4>
        <ChampionList
          list={$notGranted}
          perPage={24} />
      </div>
      <div class="col-md-5">
        <h4>Earned ({$granted.length}):</h4>
        <ChampionList
          list={$granted}
          size="sm" />
        {#if $forgotten.length}
          <h4 class="mt-3">Forgotten (RIP) ({$forgotten.length}):</h4>
          <ChampionList
            list={$forgotten}
            size="sm" />
        {/if}
      </div>
    </div>
  {:else if $error}
    <h3 class="darken">{$error}</h3>
  {:else}
    <div class="d-flex justify-content-center align-items-center align mt-5 darken">
      <div class="spinner-border text-center" role="status"></div>
      <h3 class="ms-3">Loading...</h3>
    </div>
  {/if}
</div>
