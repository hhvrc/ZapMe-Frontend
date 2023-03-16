<script lang="ts">
  import { onMount } from 'svelte';

  const SiteKey: string = import.meta.env.VITE_RECAPTCHA_SITEKEY;
  export let response: string | null = null;
  export let theme = 'light';

  function onSuccess(resp: string) {
    response = resp;
    console.log('Recaptcha success: ' + response);
  }

  function onExpired() {
    console.log('Recaptcha expired');
    window.grecaptcha.reset();
  }

  function onError() {
    console.log('Recaptcha error');
  }

  let show = false;
  onMount(() => {
    // TODO: Fix type on window
    (window as any).successCallback = onSuccess;
    (window as any).expiredCallback = onExpired;
    (window as any).errorCallback = onError;
    show = true;
  });
</script>

<svelte:head>
  <script src="https://www.google.com/recaptcha/api.js" async defer/>
</svelte:head>

{#if show}
  <div
    class="g-recaptcha"
    data-sitekey={SiteKey}
    data-theme={theme}
    data-callback="successCallback"
    data-expired-callback="expiredCallback"
    data-error-callback="errorCallback"
  />
{:else}
  <div>
    <p>Loading...</p>
  </div>
{/if}

<style>
  @media (max-width: 1100px) {
    .g-recaptcha {
      transform: scale(0.9);
      -webkit-transform: scale(0.9);
    }
  }
</style>