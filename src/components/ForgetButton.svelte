<script>
  import { forgottenIds, championId } from "../stores/champions";

  export let id;

  $: forgotten = $forgottenIds.has(id);

  const onForget = (id) => {
    if ($forgottenIds.has(id)) {
      $forgottenIds.delete(id);
    } else {
      $forgottenIds.add(id);
    }
    $forgottenIds = $forgottenIds;
    $championId = null;
  };
</script>

<button
  class="btn btn-sm"
  class:btn-danger={!forgotten}
  class:btn-success={forgotten}
  on:click={() => onForget(id)}
>
  {forgotten ? "Restore" : "Forget"}
</button>
