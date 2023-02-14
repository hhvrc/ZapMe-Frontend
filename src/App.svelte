<script lang="ts">
  import { onMount } from 'svelte';
	import {Router} from '@roxi/routify';
	import routes from '../.routify/routes.default.js';
  import Header from '$cmp/Header.svelte';
  import Footer from '$cmp/Footer.svelte';
  import SideBar from '$cmp/SideBar.svelte';

  // TODO: this is probably not the proper way to detect when a page is done loading (also see global.css line 3)
  let isLoading = true;
  onMount(() => {
    isLoading = false;
  });
</script>

{#if isLoading}
  <!-- TODO: make a better loading screen -->
  <div class="loading" style="background-color: black;">Loading...</div>
{:else}
  <Header/>
  <main>
    <Router {routes}/>
    <Footer/>
    <div class="scroll-cover"/>
  </main>
  <SideBar/>
{/if}

<style>
  main {
    height: 100%;
    width: auto;
    overflow-y: scroll;
    padding-left: var(--scrollbar-width);

    display: grid;
    grid-template-rows: 1fr auto;
  }
  .scroll-cover {
    position: absolute;
    background: var(--thm-bg);
    height: 100%;  
    top: 0;
    right: 0;
    width: var(--scrollbar-width);

    pointer-events: none;

    opacity: 1;
    transition: opacity .5s;
    transition-delay: 1s;
    -webkit-transition: opacity .5s;
    -webkit-transition-delay: 1s;
  }
  main:hover .scroll-cover {
    opacity: 0;
    transition: opacity .5s;
    -webkit-transition: opacity .5s;
  }
</style>