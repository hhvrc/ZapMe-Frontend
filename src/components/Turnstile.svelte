<script lang="ts">
  import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
  import type { TurnstileInstance } from '$types/TurnstileInstance';
  import { modeCurrent } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';

  export let action: string;
  export let cData: string | undefined = undefined;
  export let response: string | null = null;

  let element: HTMLDivElement;
  function resetResponse() {
    response = null;
    // Reset the widget after 1 second to prevent the user from spamming the button
    setTimeout(() => turnstile?.reset(element), 1000);
  }

  // If turstile doesnt load, then the index.html is proabably missing the script tag (https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#explicitly-render-the-turnstile-widget)
  let turnstile: TurnstileInstance | undefined;
  onMount(() => (turnstile = window.turnstile));

  let isLoaded = false;
  $: if (turnstile && !isLoaded) turnstile.ready(() => (isLoaded = true));

  $: if (turnstile && isLoaded) {
    turnstile.render(element, {
      sitekey: PUBLIC_TURNSTILE_SITE_KEY,
      action,
      cData,
      theme: $modeCurrent ? 'light' : 'dark',
      callback: (token) => (response = token),
      'expired-callback': resetResponse,
      'timeout-callback': resetResponse,
      'error-callback': resetResponse,
    });
  }
</script>

<!-- see: https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#widget-size -->
<div class="h-[65px] w-[300px]" bind:this={element}>
  {#if !isLoaded}
    <p>Loading...</p>
  {/if}
</div>
