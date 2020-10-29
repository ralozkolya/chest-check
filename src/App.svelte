<script>

import { Router, Link, Route } from 'svelte-routing';

import SearchForm from './components/SearchForm.svelte';
import User from './components/User.svelte';
import './scss/app.scss';

let user;
let loading;

function handleUpdate(d) {
  const { username, region } = d.detail;
  setTimeout(() => user.update(username, region), 0);
}

</script>

<Router>
  <div class="container">
    <header class="my-5">
      <h1><Link to="/">Chest check</Link></h1>
    </header>

    <main>
      <SearchForm { loading } on:update={ handleUpdate } />
      <Route path=":region/:username" let:params>
        <User bind:this={ user } bind:loading={ loading } { ...params } />
      </Route>
      <Route path="/">
        <h3>Enter summoner name to check granted chests</h3>
      </Route>
    </main>

  </div>

</Router>
