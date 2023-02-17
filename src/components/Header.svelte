<script lang="ts">
  import { IsAuthenticated, IsSidebarOpenStore } from '../stores';
  import ThemeSwitch from '$cmp/ThemeSwitch.svelte'

  let entries: { name: string, href: string }[] = [];

  if (IsAuthenticated()) {;
    entries.push({name: 'Sign Out', href: '/sign-out'});
  } else {
    entries.push({name: 'Sign In', href: '/sign-in'});
    entries.push({name: 'Register', href: '/register'});
  }
</script>

<header>
  <button class="menu-btn" on:click={() => IsSidebarOpenStore.update(b => !b)}>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  </button>
  <a href="/" class="logo usn">
    <img src="/logo-128.png" alt="ZapMe Logo"/>
    <h1>ZapMe</h1>
  </a>
  <div style="flex: 1;"/>
  {#each entries as { name, href }}
    <a class="usn" href={href}>
      <h4 class="usn">
        {name}
      </h4>
    </a>
  {/each}
  <ThemeSwitch/>
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
    stroke: var(--thm-txtPri);
  }
  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    
    color: inherit;
    text-decoration: none;
  }
  .logo img {
     height: 32px;
     width: auto;
  }
  h4 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 18px;

    text-transform: uppercase;
  }
</style>