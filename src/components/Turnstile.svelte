<script lang="ts">
  import { selectedTheme } from '$lib/ThemeContext';
  import { onMount } from 'svelte';

  const sitekey: string = import.meta.env.VITE_TURNSTILE_SITEKEY;
  export let action: string;
  export let cData: string | undefined = undefined;
  export let response: string | null = null;

  let element: HTMLDivElement | null = null;

  function callback(token: string) {
    response = token;
  }

  function resetResponse() {
    response = null;
  }

  let isLoaded = false;
  onMount(() => {
    const { turnstile } = window;

    if (!turnstile) throw new Error('CloudFlare Turnstile is not loaded, did you forget to include the script tag?');

    turnstile.ready(() => isLoaded = true);
  });

  let theme: 'light' | 'dark' | 'auto' = 'auto';
  $: {
    switch ($selectedTheme) {
      case 'light':
        theme = 'light';
        break;
      case 'dark':
        theme = 'dark';
        break;
      default:
        theme = 'auto';
        break;
    }

    if (element) {
      window?.turnstile?.render(element, {
        sitekey,
        action,
        cData,
        theme,
        callback,
        'expired-callback': resetResponse,
        'timeout-callback': resetResponse,
        'error-callback': resetResponse,
      });
    }
  }
</script>

<!-- see: https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#widget-size -->
<div bind:this={element} style="width: 300px; height: 65px;">
  {#if !isLoaded}
    <p>Loading...</p>
  {/if}
</div>