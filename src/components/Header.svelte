<script lang="ts">
  import { SessionTokenStore } from '$lib/stores';
  import ThemeSwitch from './ThemeSwitch.svelte';
  import SideBar from './SideBar.svelte';
  import "@fontsource/montserrat";
  import { beforeNavigate } from '$app/navigation';

  interface $$Slots {
    default: { sidebarOpen: boolean };
  }
  export let sidebarOpen = false;

  beforeNavigate(() => {
    sidebarOpen = false;
  });

  let entries: { name: string, href: string }[];
  $: if (!!$SessionTokenStore) {
    entries = [
      {name: 'Home', href: '/home'},
      {name: 'Profile', href: '/profile'},
      {name: 'Settings', href: '/settings'},
      {name: 'Sign Out', href: '/sign-out'}
    ];
  } else {
    entries = [
      {name: 'Sign In', href: '/sign-in'},
      {name: 'Register', href: '/register'}
    ];
  }
</script>

<header>
  <button class="menu-btn" on:click={() => sidebarOpen = !sidebarOpen}>
    <svg viewBox="0 0 16 16" width="24" height="24" class={sidebarOpen ? 'svg-open' : 'svg-closed'}><path d={sidebarOpen ? 'm2 2 12 12m0-12L2 14' : 'M14 3.5H2v1h12v-1m0 4H2v1h12v-1m0 4H2v1h12v-1'}/></svg>
  </button>
  <a href="/" class="logo usn">
    <img src="/logo-128.png" alt="ZapMe Logo"/>
  </a>
  <div style="flex: 1;"/>
  {#each entries as { name, href } (name)}
    <a class="link usn" href={href}>{name}</a>
  {/each}
  <ThemeSwitch/>
  <div style="width: 0px;"/>
</header>
<SideBar isOpen={sidebarOpen}/>

<style>
  header {
    position: fixed;
    top: 0;
    width: 100%;
    height: var(--header-height);
    display: flex;
    align-items: center;
    vertical-align: middle;
    justify-content: space-between;
    gap: 0.5rem;
  }
  .menu-btn {
    border-right: 1px;
    padding: 0 0.5rem;
    background: none;

    cursor: pointer;

    vertical-align: middle;
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
    white-space: nowrap;
  }
  .logo img {
    height: 2rem;
    width: auto;
    vertical-align: middle;
  }
  .logo::after {
    margin-left: 8px;
    vertical-align: middle;

    color: inherit;
    content: 'ZapMe';

    font-size: 1.5rem;
    font-weight: 700;
    font-family: 'Montserrat', sans-serif;
    
    letter-spacing: 4px;
    text-transform: uppercase;
    text-decoration: none;
    text-overflow: hidden;
  }
  .link {
    font-size: 1rem;
    font-weight: 500;
    font-family: 'Montserrat', sans-serif;
  }
</style>