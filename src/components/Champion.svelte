<script>

  import { fly } from 'svelte/transition';

  import transform from '../utils/transform';
  import { championId } from '../stores/champions';

  import ForgetButton from "./ForgetButton.svelte";

  import "../scss/champion.scss";

  export let champion;

  const toggleDetails = () => {
    let id = $championId === champion.id ? null : champion.id;
    championId.set(id);
  };

  $: show = $championId === champion.id;
</script>

<div class="wrapper" class:open={show}>
  <div class="champion">
    <div class="img-container">
      <a href="/" on:click|preventDefault={ toggleDetails }>
        <img class="w-100" src={champion.image} alt={champion.name} />
      </a>
    </div>
  </div>
  {#if show}
    <div
      transition:fly={{ y: -50, duration: 350 }}
      class="details"
      style="--background-image: url('{champion.splash}')"
    >
      <div class="p-3">
        <h5 class="mb-3">{champion.name}</h5>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://u.gg/lol/champions/${transform(champion.name)}/build`}
          class="btn btn-sm btn-primary"
        >
          Visit U.GG page
        </a>
        <ForgetButton id={ champion.id } />
      </div>
    </div>
  {/if}
</div>
