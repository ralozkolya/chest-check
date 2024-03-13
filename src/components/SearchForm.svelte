<script>
  import { navigate } from "svelte-routing";
  import debounce from "lodash/debounce";
  import regions from "../../data/regions.json";
  import { username, region, regionKeys } from "../stores/summoner";
  import { champions } from "../stores/champions";
  import { loading, refresh, error, version } from "../stores/app";
  import search from "../utils/api";
  import Dropdown from "./Dropdown.svelte";

  import "../scss/search-form.scss";
  import { onMount } from "svelte";

  const retrieve = debounce(async () => {
    $loading = true;
    try {
      $error = null;
      const response = await search($username, regions[$region]);
      $champions = response.champions;
      $version = response.version;
    } catch (e) {
      $error = e.message;
    }
    $loading = false;
  }, 10);

  function onSubmit() {
    $loading = true;
    $error = null;
    navigate(`/${$region}/${$username}`);
    retrieve();
  }

  onMount(() => $username && $region && retrieve());
</script>

<form on:submit|preventDefault={onSubmit}>
  <div class="input-group">
    <input
      type="text"
      class="form-control form-control-lg search-input"
      bind:value={$username}
      placeholder="Summoner name"
      aria-label="Summoner name"
      required
    />
    <Dropdown keys={$regionKeys} bind:value={$region} />
    <button class="btn btn-outline-light wide" disabled={$loading}>
      {$loading ? "Loading..." : $refresh ? "Refresh" : "Search"}
    </button>
  </div>
</form>
