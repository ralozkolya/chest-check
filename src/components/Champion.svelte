<script>
  import { createEventDispatcher, onMount } from "svelte";
  import Collapse from 'bootstrap/js/dist/collapse';
  import Bluebird from 'bluebird';

  import '../scss/champion.scss';

  export let champion;
  export let parent;

  const dispatch = createEventDispatcher();

  const transform = name => name.replace(/\W/g, '').toLowerCase();

  let collapseRef, collapse, show;

  const toggleDetails = async () => {
    if (parent) {
      const collapses = document.querySelector(parent).querySelectorAll('.collapse');
      await Bluebird.each(collapses, async ref => {
        if (ref.classList.contains('show')) {
          Collapse.getOrCreateInstance(ref).hide();
          await Bluebird.delay(350);
        }
      });
    }

    collapse.toggle();
  };

  onMount(async () => {
    collapse = Collapse.getOrCreateInstance(collapseRef, { toggle: false });
    collapseRef.addEventListener('show.bs.collapse', () => show = true);
    collapseRef.addEventListener('hide.bs.collapse', () => show = false);
  });
</script>

<div class="wrapper" class:open={ show }>
  <div class="champion">
    <div class="img-container">
      <a href="/" on:click|preventDefault={ toggleDetails }>
        <img class="w-100" src={champion.image} alt={champion.name} />
      </a>
    </div>
  </div>
  <div
    bind:this={collapseRef}
    class="collapse details"
    style="--background-image: url('{ champion.splash }')">
    <h5 class="mb-3">{ champion.name }</h5>
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://u.gg/lol/champions/${transform(champion.name)}/build`}
      class="btn btn-sm btn-primary">
      Visit U.GG page
    </a>
    <button class="btn btn-sm btn-danger" on:click={() => dispatch("forget", champion.id)}>
      Forget
    </button>
  </div>
</div>