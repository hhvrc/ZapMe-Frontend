<script lang="ts">
  import { IsMenuOpenStore, IsAuthenticatedStore } from '../stores';
</script>

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
  <div style="flex: 1;"/>
  {#if $IsAuthenticatedStore}
    <a href="/sign-out">
      <h4>
        Sign Out
      </h4>
    </a>
  {:else}
    {#if window.location.pathname !== '/sign-in'}
    <a href="/sign-in">
      <h4>
        Sign In
      </h4>
    </a>
    {/if}
    {#if window.location.pathname !== '/register'}
    <a href="/register">
      <h4>
        Register
      </h4>
    </a>
    {/if}
  {/if}
</header>

<style>
  header {
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 24px;
  }
  a {
    color: inherit;
    text-decoration: none;
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
  h4 {
    color: #fff;

    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 18px;

    text-transform: uppercase;

    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
</style>