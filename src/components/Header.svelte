<script lang="ts">
  import { IsAuthenticated } from '$lib/stores';
  import ThemeSwitch from './ThemeSwitch.svelte';
  import SideBar from './SideBar.svelte';
  import "@fontsource/montserrat";
  import { beforeNavigate } from '$app/navigation';

  let entries: { name: string, href: string }[] = [];
  let sidebarOpen = false;

  beforeNavigate(() => {
    sidebarOpen = false;
  });

  if (IsAuthenticated()) {;
    entries.push({name: 'Sign Out', href: '/sign-out'});
  } else {
    entries.push({name: 'Sign In', href: '/sign-in'});
    entries.push({name: 'Register', href: '/register'});
  }
</script>

<header>
  <button class="menu-btn" on:click={() => sidebarOpen = !sidebarOpen}>
    <svg viewBox="0 0 16 16" width="24" height="24" class={sidebarOpen ? 'svg-open' : 'svg-closed'}><path d={sidebarOpen ? 'm2 2 12 12m0-12L2 14' : 'M14 3.5H2v1h12v-1m0 4H2v1h12v-1m0 4H2v1h12v-1'}/></svg>
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
<SideBar isOpen={sidebarOpen}/>

<style>
  header {
    height: 64;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  button {
    width: 64px;
    height: 64px;
    border-right: 1px;
    padding: auto;
    background: none;

    cursor: pointer;
  }
  .svg-open {
    stroke: var(--thm-txtPri);
    stroke-width: 1.5;
  }
  .svg-closed {
    font-size: 16px;
    fill: var(--thm-txtPri);
    color: var(--thm-txtPri);
    shape-rendering: crispEdges;
  }
  a {
    color: inherit;
    text-decoration: none;
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
  h1, h4 {
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
  }
  h1 {
    font-weight: 700;
    font-size: 24px;
    letter-spacing: 4px;
  }
  h4 {
    font-weight: 500;
    font-size: 18px;
  }
</style>