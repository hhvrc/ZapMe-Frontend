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
  import { AppShell, AppBar, AppRail } from '@skeletonlabs/skeleton';
  import { storePopup } from '@skeletonlabs/skeleton';

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  const year = new Date().getFullYear();
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <div class="flex items-center space-x-4">
          <!-- Logo -->
          <a class="w-[32px] overflow-hidden lg:!ml-0 lg:w-auto" href="/">
            <img
              class="inline-block h-10"
              src="/logo-128.png"
              alt="ZapMe Logo"
            />
            <strong
              class="hidden align-middle text-3xl uppercase tracking-widest md:inline-block"
              style="font-family: Montserrat,sans-serif">ZapMe</strong
            >
          </a>
        </div>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <ThemeSwitch />
        <a class="btn btn-sm variant-ghost-surface" href="/sign-in">Sign In</a>
        <a class="btn btn-sm variant-ghost-surface" href="/register">Register</a
        >
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <slot />
  <svelte:fragment slot="sidebarLeft">
    <AppRail />
  </svelte:fragment>
  <svelte:fragment slot="pageFooter">
    <div>
      Made with <span style="color: #e25555;">&#9829;</span> by HentaiHeaven#0001
    </div>
    <div>Copyright ©{year} | All Rights Reserved</div>
    <div class="r">
      <a class="usn" href="/privacy"> Privacy Policy </a>
      <a class="usn" href="/tos"> Terms of Service </a>
    </div>
  </svelte:fragment>
</AppShell>
