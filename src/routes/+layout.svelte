<script lang="ts">
  /* eslint-disable no-useless-escape, svelte/no-at-html-tags */

  import '@skeletonlabs/skeleton/styles/all.css';
  import '../app.postcss';
  import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
  import ThemeSwitch from '$components/ThemeSwitch.svelte';
  import '@fontsource/montserrat';
  import {
    AppBar,
    AppRail,
    AppRailAnchor,
    AppShell,
    autoModeWatcher,
    Modal,
    storePopup,
    Toast,
  } from '@skeletonlabs/skeleton';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import OpenGraphTags from '$components/MetaTags/OpenGraphTags.svelte';
  import TwitterSummaryTags from '$components/MetaTags/Twitter/TwitterSummaryTags.svelte';
  import { modalComponentRegistry } from '$components/modals';
  import { WebSocketClient } from '$lib/realtime/WebSocketClient';
  import { ApiConfigStore, SessionTokenStore, ThemeStore } from '$lib/stores';

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  const year = new Date().getFullYear();

  const LeadingTiles: { title: string; icon: string; href: string }[] = [
    {
      title: 'Home',
      icon: 'fa-house',
      href: '/',
    },
    {
      title: 'Devices',
      icon: 'fa-microchip',
      href: '/devices',
    },
    {
      title: 'Friends',
      icon: 'fa-user-friends',
      href: '/friends',
    },
    {
      title: 'Users',
      icon: 'fa-user',
      href: '/users',
    },
  ];
  const TrailingTiles: { title: string; icon: string; href: string }[] = [
    {
      title: 'Profile',
      icon: 'fa-user',
      href: '/profile',
    },
    {
      title: 'Settings',
      icon: 'fa-cog',
      href: '/settings',
    },
    {
      title: 'Logout',
      icon: 'fa-sign-out',
      href: '/logout',
    },
  ];

  // TDOO: Move the logic below to a better place
  // Connect/Disconnect WebSocketClient based on login state
  let loggedIn = false;
  $: if (browser && $SessionTokenStore) {
    loggedIn = true;
    WebSocketClient.Instance.Connect();
  } else {
    loggedIn = false;
    WebSocketClient.Instance.Disconnect();
  }
</script>

<svelte:head>
  {@html `\<style\>${$ThemeStore.css}\</style\>`}
  {@html `\<script\>${autoModeWatcher.toString()} autoModeWatcher();\</script\>`}
</svelte:head>

<TwitterSummaryTags
  type="summary"
  title="ZapMe"
  description="Take Control of Your Submissives from Anywhere in the World."
  image={{ src: 'https://zapme.app/logo-512.png', alt: 'ZapMe Logo' }}
  site="@zapme_app"
  creator="@hhvrc"
/>
<OpenGraphTags
  type="website"
  title="ZapMe"
  description="Take Control of Your Submissives from Anywhere in the World."
  image={{ src: 'https://zapme.app/logo-512.png', alt: 'ZapMe Logo' }}
  url="https://zapme.app/"
/>

{#if $ApiConfigStore}
  <Modal components={modalComponentRegistry} />
  <Toast position="bl" max={5} />
  <AppShell>
    <svelte:fragment slot="header">
      <AppBar>
        <svelte:fragment slot="lead">
          <div class="flex items-center space-x-4">
            <!-- Logo -->
            <a
              href="/"
              class="overflow-hidden lg:!ml-0 lg:w-auto"
              data-sveltekit-preload-data="hover"
            >
              <img class="inline-block h-10" src="/logo-128.png" alt="ZapMe Logo" />
              <strong
                class="hidden align-middle text-3xl uppercase tracking-widest sm:inline-block"
                style="font-family: Montserrat,sans-serif"
              >
                {$ApiConfigStore?.appName}
              </strong>
            </a>
          </div>
        </svelte:fragment>
        <svelte:fragment slot="trail">
          <ThemeSwitch />
          {#if !loggedIn}
            <a
              href="/login"
              class="btn btn-sm variant-ghost-surface"
              data-sveltekit-preload-data="hover"
            >
              Login
            </a>
            <a
              href="/register"
              class="btn btn-sm variant-ghost-surface"
              data-sveltekit-preload-data="hover"
            >
              Register
            </a>
          {/if}
        </svelte:fragment>
      </AppBar>
    </svelte:fragment>
    <slot />
    <svelte:fragment slot="sidebarLeft">
      {#if loggedIn}
        <AppRail>
          <!-- {selected}> -->
          <svelte:fragment slot="lead">
            {#each LeadingTiles as tile}
              <AppRailAnchor href={tile.href} selected={$page.url.pathname == tile.href}>
                <i class={`fa-solid ${tile.icon} fa-xl`} />
              </AppRailAnchor>
            {/each}
          </svelte:fragment>
          <svelte:fragment slot="trail">
            {#each TrailingTiles as tile}
              <AppRailAnchor href={tile.href} selected={$page.url.pathname == tile.href}>
                <i class={`fa-solid ${tile.icon} fa-xl`} />
              </AppRailAnchor>
            {/each}
          </svelte:fragment>
        </AppRail>
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="pageFooter">
      <div class="m-2 flex items-center justify-center sm:justify-between">
        <div>
          Made with
          <span style="color: #e25555;">&#9829;</span>
          by {$ApiConfigStore?.founderSocials?.discordUsername}
        </div>
        <div class="hidden lg:block">Copyright ©{year} | All Rights Reserved</div>
        <div class="hidden items-center space-x-2 sm:flex">
          <a href="/privacy-policy" class="select-none" data-sveltekit-preload-data="hover">
            Privacy Policy
          </a>
          <a href="/terms-of-service" class="select-none" data-sveltekit-preload-data="hover">
            Terms of Service
          </a>
        </div>
      </div>
    </svelte:fragment>
  </AppShell>
{:else}
  <AppShell>
    <div class="h-full w-full flex content-center">
      <h1 class="w-full m-auto text-center align-middle">
        Loading...
      </h1>
    </div>
  </AppShell>
{/if}