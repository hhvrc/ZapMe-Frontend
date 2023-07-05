<script lang="ts">
  /* eslint-disable no-useless-escape, svelte/no-at-html-tags */

  import '@skeletonlabs/skeleton/styles/all.css';
  import '../app.postcss';
  import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
  import '@fontsource/montserrat';
  import {
    AppShell,
    autoModeWatcher,
    Modal,
    ProgressRadial,
    storePopup,
    Toast,
  } from '@skeletonlabs/skeleton';
  import { browser } from '$app/environment';
  import Fidget from '$components/Fidget.svelte';
  import Footer from '$components/Layout/Footer.svelte';
  import Header from '$components/Layout/Header.svelte';
  import SideBarLeft from '$components/Layout/SideBarLeft.svelte';
  import OpenGraphTags from '$components/MetaTags/OpenGraphTags.svelte';
  import TwitterSummaryTags from '$components/MetaTags/Twitter/TwitterSummaryTags.svelte';
  import { modalComponentRegistry } from '$components/modals';
  import { configurationApi } from '$lib/fetchSingleton';
  import { WebSocketClient } from '$lib/realtime/WebSocketClient';
  import { ApiConfigStore, SessionTokenStore, ThemeStore } from '$lib/stores';
  import { DefaultThemes } from '$lib/themes';

  // Data from, +layout.server.ts
  export let data;

  // Initialize ApiConfigStore
  if (data.config) {
    ApiConfigStore.set(data.config);
  } else if (browser) {
    configurationApi.getApiConfig().then((config) => ApiConfigStore.set(config));
  }
  $: config = $ApiConfigStore;

  // Connect/Disconnect WebSocketClient based on login state
  $: if (browser && $SessionTokenStore) {
    WebSocketClient.Instance.Connect();
  } else {
    WebSocketClient.Instance.Disconnect();
  }

  // Configure popups
  if (browser) {
    storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
  }

  $: selectedTheme = DefaultThemes.find((t) => t.name === $ThemeStore) ?? DefaultThemes[0];
</script>

<svelte:head>
  {@html `\<style\>${selectedTheme.css}\</style\>`}
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

{#if browser}
  <Modal components={modalComponentRegistry} />
  <Toast position="bl" max={5} />
{/if}

{#if config}
  {#if $SessionTokenStore}
    <AppShell>
      <Header slot="header" />
      <SideBarLeft slot="sidebarLeft" />
      <slot />
      <Footer slot="pageFooter" />
    </AppShell>
  {:else}
    <AppShell>
      <Header slot="header" />
      <slot />
      <Footer slot="pageFooter" />
    </AppShell>
  {/if}
{:else}
  <AppShell>
    <div class="flex h-full w-full flex-col items-center justify-center gap-8">
      <h1>Loading...</h1>
      <ProgressRadial width={'w-60'} />
      <div class="absolute h-full w-full">
        <Fidget />
      </div>
    </div>
  </AppShell>
{/if}
