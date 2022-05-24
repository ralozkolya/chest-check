<script>

  import { runes } from '../utils/api';
  import RuneTree from './RuneTree.svelte';

  export let champion;

  let rank = 'gold';
  let role = '';
  $: response = runes(champion.name, rank, role);

</script>

<div class="row my-3">
  <div class="col">
    <select class="form-select bg-dark text-light" bind:value={ rank }>
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
  </div>
  <div class="col">
    <select class="form-select bg-dark text-light" bind:value={ role }>
      <option value="">Default</option>
      <option value="top">Top</option>
      <option value="jungle">Jungle</option>
      <option value="middle">Mid</option>
      <option value="adc">ADC</option>
      <option value="support">Support</option>
    </select>
  </div>
</div>

{#await response}
  <div class="py-3">
    <div class="spinner-border text-center" role="status"></div>
  </div>
{:then runes}
  <div class="row my-5">
    <div class="col-md-6">
      <RuneTree tree={ runes.primaryTree } />
    </div>
    <div class="col-md-5 offset-md-1">
      <RuneTree tree={ runes.secondaryTree } />
    </div>
  </div>
{:catch e}
  { e }
{/await}
