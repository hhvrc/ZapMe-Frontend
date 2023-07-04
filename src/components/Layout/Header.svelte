<script lang="ts">
  import { AppBar } from '@skeletonlabs/skeleton';
  import ThemeSwitch from '$components/ThemeSwitch.svelte';
  import { ApiConfigStore, SessionTokenStore } from '$lib/stores';

  $: config = $ApiConfigStore;
  $: loggedIn = !!$SessionTokenStore;
</script>

<AppBar slot="header">
  <div slot="lead" class="flex items-center space-x-4">
    <!-- Logo -->
    <a href="/" class="overflow-hidden lg:!ml-0 lg:w-auto" data-sveltekit-preload-data="hover">
      <img class="inline-block h-10" src="/logo-128.png" alt="ZapMe Logo" />
      <strong
        class="hidden align-middle text-3xl uppercase tracking-widest sm:inline-block"
        style="font-family: Montserrat,sans-serif"
      >
        {config?.appName}
      </strong>
    </a>
  </div>
  <svelte:fragment slot="trail">
    <ThemeSwitch />
    {#if !loggedIn}
      <a href="/login" class="btn btn-sm variant-ghost-surface" data-sveltekit-preload-data="hover">
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
