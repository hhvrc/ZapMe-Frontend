<script lang="ts">
  import { IsAuthenticatedStore } from '../stores';
</script>

<svelte:head>
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Montserrat:300,400,600,700&amp;lang=en" />
</svelte:head>

<header>
  <a href="/" style="display: flex; align-items: center; gap: 8px;">
    <img src="/logo-128.png" alt="ZapMe Logo"/>
    <h3>
      ZapMe
    </h3>
  </a>
  <div style="flex-grow: 1;"/>
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
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 24px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  img {
     height: 32px;
     width: auto;
  }
  h3,h4 {
    margin: 0;
    padding: 0;
    color: #fff;

    font-family: 'Montserrat', sans-serif;
    text-align: center;
    text-transform: uppercase;

    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
  h3 {
    font-weight: 700;
    font-size: 24px;
    letter-spacing: 4px;
  }
  h4 {
    font-weight: 400;
    font-size: 18px;
  }
</style>