<script>
  import { runes } from "../utils/api";
  import RuneTree from "./RuneTree.svelte";
  import { mode } from "../stores/runes";

  export let champion;

  let rank = "gold";
  let role = "";
  $: response = runes(champion.name, $mode, rank, role);
</script>

<div class="row my-3">
  <div class="col-lg mb-3">
    <label class="w-100">
      Mode
      <select class="form-select bg-dark text-light" bind:value={$mode}>
        <option value="ranked">Ranked</option>
        <option value="aram">ARAM</option>
        <!-- <option value="arurf">ARURF</option> -->
      </select>
    </label>
  </div>
  {#if $mode === "ranked"}
    <div class="col-lg mb-2">
      <label class="w-100">
        Rank
        <select class="form-select bg-dark text-light" bind:value={rank}>
          <option value="">Platinum +</option>
          <option value="diamond_plus">Diamond +</option>
          <option value="diamond_2_plus">Diamond 2 +</option>
          <option value="master_plus">Master +</option>
          <option value="overall">All Ranks</option>
          <option value="challenger">Challenger</option>
          <option value="grandmaster">Grandmaster</option>
          <option value="master">Master</option>
          <option value="diamond">Diamond</option>
          <option value="platinum">Platinum</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="bronze">Bronze</option>
          <option value="iron">Iron</option>
        </select>
      </label>
    </div>
    <div class="col-lg mb-2">
      <label class="w-100">
        Role
        <select class="form-select bg-dark text-light" bind:value={role}>
          <option value="">Default</option>
          <option value="top">Top</option>
          <option value="jungle">Jungle</option>
          <option value="middle">Mid</option>
          <option value="adc">ADC</option>
          <option value="support">Support</option>
        </select>
      </label>
    </div>
  {/if}
</div>

{#await response}
  <div class="py-3 text-center">
    <div class="spinner-border" role="status" />
  </div>
{:then runes}
  <div class="row my-3">
    <div
      class="col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-0 col-xl-5 offset-xl-1"
    >
      <RuneTree data={runes.primaryTree} />
    </div>
    <div
      class="col-10 offset-1 col-md-8 offset-md-2 col-lg-4 offset-lg-2 col-xl-3 offset-xl-2"
    >
      <RuneTree data={runes.secondaryTree} />
    </div>
  </div>
{:catch e}
  {e}
{/await}
