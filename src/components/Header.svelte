<script lang="ts">
  import { IsAuthenticatedStore } from '../stores';
</script>

<svelte:head>
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Montserrat:300,400,600,700&amp;lang=en" />
</svelte:head>

<header>
  <div class="l">
  </div>
  <div class="c">
    <a href="/">
      <h3>
        ZapMe
      </h3>
    </a>
  </div>
  <div class="r">
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
  </div>
</header>

<style>
  header {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
  }
  a {
    color: inherit;
    text-decoration: none;
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

  .l {
    padding: 24px;
  }
  .c {
    padding: 24px;
  }
  .r {
    padding: 8px 24px 16px 24px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
  }
  .r a {
    background-color: rgba(255,255,255,0.13);
    border-radius: 4px;
    padding: 8px 16px;
  }
</style>