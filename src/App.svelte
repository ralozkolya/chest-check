<script>
  import { Link, Route, Router } from "svelte-routing";

  import SearchForm from "./components/SearchForm.svelte";
  import User from "./components/User.svelte";
  import { version } from "./stores/app";

  import "./scss/app.scss";
</script>

<Router>
  <div class="container d-flex flex-column min-vh-100">
    <header class="my-5">
      <h1><Link to="/">Chest check</Link></h1>
    </header>

    <main class="flex-grow-1">
      <SearchForm />
      <Route path=":region/:username">
        <User />
      </Route>
      <Route path="/">
        <h3>Enter summoner name to check granted chests</h3>
      </Route>
    </main>

    <footer class="my-3 text-center">
      {#if $version}
        <span class="float-end text-secondary">v{$version}</span>
      {/if}
      <a
        class="mr-3"
        rel="noreferrer"
        href="https://github.com/ralozkolya/chest-check"
        target="_blank">Source</a
      >
    </footer>
  </div>
</Router>
