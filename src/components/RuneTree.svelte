<div>
  {#each tree as row}
    <div
      class:px-3={ !row[0].keystone }
      class="d-flex justify-content-between mb-4">
      {#each row as img}
        <img
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

  export let tree;

</script>

<style>

  img {
    width: 40px;
  }

  .keystone {
    width: 60px;
  }

  .shard {
    width: 30px;
  }

  .inactive {
    filter: saturate(0);
  }

  img:not(.inactive) {
    border-radius: 50%;
    border: solid 2px #3273fa;
  }

</style>
