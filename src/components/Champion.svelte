<script>
  import { fly } from "svelte/transition";

  import { championId } from "../stores/champions";
  import { mode } from "../stores/runes";

  import ForgetButton from "./ForgetButton.svelte";
  import Runes from "./Runes.svelte";

  import "../scss/champion.scss";

  export let champion;

  const toggleDetails = () => {
    let id = $championId === champion.id ? null : champion.id;
    championId.set(id);
  };

  $: url =
    "ranked" === $mode
      ? `https://u.gg/lol/champions/${champion.id}/build`
      : `https://u.gg/lol/champions/aram/${champion.id}-aram`;

  $: show = $championId === champion.id;
</script>

<div class="wrapper" class:open={show}>
  <div class="champion">
    <div class="img-container">
      <a href="/" on:click|preventDefault={toggleDetails}>
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
        <div class="d-flex mb-3">
          <h5 class="flex-grow-1">{champion.name}</h5>
          <a
            target="_blank"
            rel="noreferrer"
            href={url}
            class="btn btn-sm btn-primary me-2"
          >
            Visit U.GG page
          </a>
          <ForgetButton id={champion.id} />
          <button
            on:click={() => (show = false)}
            class="btn btn-sm btn-secondary ms-2"
          >
            Close
          </button>
        </div>
        <Runes {champion} />
      </div>
    </div>
  {/if}
</div>
