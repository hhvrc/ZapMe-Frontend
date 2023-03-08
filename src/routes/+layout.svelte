<script lang="ts">
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import SideBar from '$components/SideBar.svelte';
</script>

<svelte:head>
  <!-- OpenGraph -->
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="https://www.zapme.app"/>
  <meta property="og:title" content="ZapMe | Control collars remotely"/>
  <meta property="og:description" content="ZapMe allows you to control your Submissives shock collars from anywhere in the world with low latency, realtime networking."/>
  <meta property="og:image" content="https://www.zapme.app/logo-512.png"/>

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image"/>
  <meta property="twitter:creator" content="@hhvrc"/>
  <meta property="twitter:description" content="ZapMe allows you to control your Submissives shock collars from anywhere in the world with low latency, realtime networking."/>
  <meta property="twitter:image" content="https://www.zapme.app/logo-512.png"/>
  <meta property="twitter:image:alt" content="ZapMe Logo"/>
</svelte:head>

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