<script lang="ts">
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
  import '@skeletonlabs/skeleton/styles/all.css';
  import '../app.postcss';
  import ThemeSwitch from '$components/ThemeSwitch.svelte';
  import {
    computePosition,
    autoUpdate,
    flip,
    shift,
    offset,
    arrow,
  } from '@floating-ui/dom';
  import '@fontsource/montserrat';
  import type { Config } from '$lib/api';
  import { ApiConfigStore, SessionTokenStore } from '$lib/stores';
  import { AppShell, AppBar, AppRail, Toast, autoModeWatcher, AppRailTile } from '@skeletonlabs/skeleton';
  import { storePopup } from '@skeletonlabs/skeleton';
  import { derived } from 'svelte/store';
  import { page } from '$app/stores';

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  const year = new Date().getFullYear();
  const selected = derived(page, $page => $page.url.pathname);

  let config: Config;
  export let data;
  $: {
    config = data.config;
    ApiConfigStore.set(data.config);
  }

  $: loggedIn = !!$SessionTokenStore;
</script>

<svelte:head>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head>

<Toast position="bl" max={5} />
<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <div class="flex items-center space-x-4">
          <!-- Logo -->
          <a
            href="/"
            class="w-[32px] overflow-hidden lg:!ml-0 lg:w-auto"
            data-sveltekit-preload-data="hover"
          >
            <img
              class="inline-block h-10"
              src="/logo-128.png"
              alt="ZapMe Logo"
            />
            <strong
              class="hidden align-middle text-3xl uppercase tracking-widest md:inline-block"
              style="font-family: Montserrat,sans-serif"
            >
              {config.appName}
            </strong>
          </a>
        </div>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <ThemeSwitch />
        {#if loggedIn}
          <a
            href="/profile"
            class="btn btn-sm variant-ghost-surface"
            data-sveltekit-preload-data="hover">Profile</a
          >
          <a
            href="logout"
            class="btn btn-sm variant-ghost-surface"
            data-sveltekit-preload-data="hover">Logout</a
          >
        {:else}
          <a
            href="/login"
            class="btn btn-sm variant-ghost-surface"
            data-sveltekit-preload-data="hover">Login</a
          >
          <a
            href="/register"
            class="btn btn-sm variant-ghost-surface"
            data-sveltekit-preload-data="hover">Register</a
          >
        {/if}
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <slot />
  <svelte:fragment slot="sidebarLeft">
    {#if loggedIn}
      <AppRail> <!-- {selected}> -->
        <svelte:fragment slot="lead">
          <AppRailTile label="Home" tag="a" href="/"><i class="fa-solid fa-house fa-xl"/></AppRailTile>
          <AppRailTile label="Devices" tag="a" href="/devices"><i class="fa-solid fa-microchip fa-xl"/></AppRailTile>
          <AppRailTile label="Messages" tag="a" href="/messages"><i class="fa-solid fa-envelope fa-xl"/></AppRailTile>
          <AppRailTile label="Friends" tag="a" href="/friends"><i class="fa-solid fa-user-friends fa-xl"/></AppRailTile>
        </svelte:fragment>
        <svelte:fragment slot="trail">
          <AppRailTile label="Profile" tag="a" href="/profile"><i class="fa-solid fa-user fa-xl"/></AppRailTile>
          <AppRailTile label="Settings" tag="a" href="/settings"><i class="fa-solid fa-cog fa-xl"/></AppRailTile>
          <AppRailTile label="Logout" tag="a" href="/logout"><i class="fa-solid fa-sign-out fa-xl"/></AppRailTile>
        </svelte:fragment>
      </AppRail>
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="pageFooter">
    <div class="m-2 flex items-center justify-center sm:justify-between">
      <div>
        Made with <span style="color: #e25555;">&#9829;</span> by {config.founderSocials.discordUsername}
      </div>
      <div class="hidden lg:block">Copyright ©{year} | All Rights Reserved</div>
      <div class="hidden items-center space-x-2 sm:flex">
        <a
          href="/privacy"
          class="select-none"
          data-sveltekit-preload-data="hover"
        >
          Privacy Policy
        </a>
        <a
          href="/terms-of-service"
          class="select-none"
          data-sveltekit-preload-data="hover"
        >
          Terms of Service
        </a>
      </div>
    </div>
  </svelte:fragment>
</AppShell>
