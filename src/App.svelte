<script lang="ts">
	import {Router} from '@roxi/routify';
	import routes from '../.routify/routes.default.js';
  import Header from '$cmp/Header.svelte';
  import Footer from '$cmp/Footer.svelte';
</script>

<Header/>
<main>
  <Router {routes}/>
</main>
<Footer/>

<style>
  main {
    height: 100%;
    width: auto;
    overflow-y: auto;
  }
</style>