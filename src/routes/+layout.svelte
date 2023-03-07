<script lang="ts">
  import { onMount } from 'svelte';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import SideBar from '$components/SideBar.svelte';
</script>

<Header/>
<main>
  <slot/>
  <Footer/>
  <div class="scroll-cover"/>
</main>
<SideBar/>

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