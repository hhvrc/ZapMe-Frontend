<script lang="ts">
  import { IsMenuOpenStore } from '../stores';
</script>

<svelte:head>
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Montserrat:300,400,600,700&amp;lang=en" />
</svelte:head>

<header>
  <button class="menu-btn" on:click={() => IsMenuOpenStore.update(b => !b)}>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  </button>
  <a href="/" class="logo">
    <img src="/logo-128.png" alt="ZapMe Logo"/>
    <h1>ZapMe</h1>
  </a>
</header>

<style>
  header {
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 24px;
  }
  .menu-btn {
    width: 32px;
    height: 32px;
    margin: 0;
    padding: 0;

    border: none;
    outline: none;
    background: none;

    cursor: pointer;  
  }
  .menu-btn svg {
    stroke: #fff;
  }
  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    
    color: inherit;
    text-decoration: none;

    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
  .logo img {
     height: 32px;
     width: auto;
  }
</style>