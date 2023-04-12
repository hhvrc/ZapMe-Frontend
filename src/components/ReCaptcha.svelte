<script lang="ts">
  import { onMount } from 'svelte';

  const SiteKey: string = import.meta.env.VITE_RECAPTCHA_SITEKEY;
  export let response: string | null = null;
  export let theme = 'light';

  function onSuccess(token: string) {
    response = token;
  }

  function resetResponse() {
    response = null;
  }

  let show = false;
  onMount(() => {
    window.grecaptchaSuccessCallback = onSuccess;
    window.grecaptchaExpiredCallback = resetResponse;
    window.grecaptchaErrorCallback = resetResponse;
    
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
    data-callback="grecaptchaSuccessCallback"
    data-expired-callback="grecaptchaExpiredCallback"
    data-error-callback="grecaptchaErrorCallback"
  />
{:else}
  <div>
    <p>Loading...</p>
  </div>
{/if}