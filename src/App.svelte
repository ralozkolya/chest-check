<script>
  import { Router, Link, Route } from "svelte-routing";

  import SearchForm from "./components/SearchForm.svelte";
  import User from "./components/User.svelte";
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
      <span class="float-end text-secondary">v13.20.1</span>
      <a
        class="mr-3"
        rel="noreferrer"
        href="https://github.com/ralozkolya/chest-check"
        target="_blank">Source</a
      >
    </footer>
  </div>
</Router>
