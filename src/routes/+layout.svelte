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
  import { AppShell, AppBar, AppRail, Toast } from '@skeletonlabs/skeleton';
  import { storePopup } from '@skeletonlabs/skeleton';
  import { ApiConfigStore } from '$lib/stores';
  import type { Config } from '$lib/api';

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  const year = new Date().getFullYear();

  let config: Config;
  export let data;
  $: {
    config = data.config;
    ApiConfigStore.set(data.config);
  }
</script>

<Toast position="bl" max={5}/>
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
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <slot />
  <svelte:fragment slot="sidebarLeft">
    <AppRail />
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
