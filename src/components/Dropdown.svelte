<script>
  import "bootstrap/js/dist/dropdown";

  export let keys;
  export let value;
</script>

<button
  class="btn btn-outline-light dropdown-toggle"
  type="button"
  data-toggle="dropdown"
  aria-haspopup="true"
  aria-expanded="false">
  {value}
</button>
<div class="dropdown-menu">
  {#each keys as k}
    <div>
      <a
        class="dropdown-item"
        href={'#'}
        on:click|preventDefault={() => (value = k)}>
        {k}
      </a>
    </div>
  {/each}
</div>
