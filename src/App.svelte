<script lang="ts">
	import {Router} from '@roxi/routify';
	import routes from '../.routify/routes.default.js';
  import Header from '$cmp/Header.svelte';
  import Footer from '$cmp/Footer.svelte';
</script>

<Header/>
<main>
  <Router {routes}/>
  <div class="scroll-cover"/>
</main>
<Footer/>

<style>
  main {
    height: 100%;
    width: auto;
    overflow-y: auto;
    padding-left: var(--scrollbar-width);
  }
  .scroll-cover {
    position: absolute;
    background: var(--bg-col);
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