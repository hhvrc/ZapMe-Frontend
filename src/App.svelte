<script lang="ts">
	import {Router} from '@roxi/routify';
	import routes from '../.routify/routes.default.js';
  import Header from '$cmp/Header.svelte';
  import Footer from '$cmp/Footer.svelte';

  let mainClass: string|null = null;
</script>

<Header/>
<main class={mainClass} on:mouseenter={() => mainClass = "scrollable"} on:mouseleave={() => mainClass = null}>
  <Router {routes}/>
</main>
<Footer/>

<style>
  main {
    height: 100%;
    width: auto;
    overflow-y: hidden;
  }
  .scrollable {
    overflow-y: auto;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 14px;
  }
  ::-webkit-scrollbar-track {
    visibility: hidden;
  }
  ::-webkit-scrollbar-thumb {
    background: #88888888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #bbbbbbbb;
  }
</style>