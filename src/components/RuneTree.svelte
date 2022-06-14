<div>
  <h5 class="mb-3 p-2 rounded">
    <img class="perk-style" src={ data.src } alt={ data.alt }>
    { data.title }
  </h5>
  {#each data.tree as row}
    <div
      class:px-3={ !row[0].keystone }
      class="d-flex justify-content-between mb-4">
      {#each row as img}
        <img
          class="rune"
          class:keystone={ img.keystone }
          class:inactive={ !img.active }
          class:shard={ img.shard }
          src={ img.src }
          alt={ img.alt } />
      {/each}
    </div>
  {/each}
</div>

<script>

  export let data;

</script>

<style>

  .rune {
    width: 40px;
  }

  .keystone {
    width: 60px;
  }

  .shard {
    width: 30px;
  }

  .rune.inactive {
    filter: saturate(0);
  }

  .rune:not(.inactive) {
    border-radius: 50%;
    border: solid 2px #3273fa;
  }

  h5 {
    background: rgba(0, 0, 0, .7);
  }

  .perk-style {
    width: 50px;
  }

</style>
