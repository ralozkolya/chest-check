<script>
  export let keys;
  export let value;
</script>

<select class="dropdown-toggle form-select bg-dark text-light" bind:value>
  {#each keys as k}
    <option value="{k}">{k}</option>
  {/each}
</select>
