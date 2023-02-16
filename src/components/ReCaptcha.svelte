<script lang="ts">
  const SiteKey: string = import.meta.env.VITE_RECAPTCHA_SITEKEY;
  export let response: string | null = null;
  export let theme = 'light';

  // @svelte js/element 
  function onSuccess(resp: string) {
    response = resp;
    console.log('Recaptcha success: ' + response);
  }

  function onExpire() {
    console.log('Recaptcha expired');
  }

  function onError() {
    console.log('Recaptcha error');
  }
</script>

<svelte:head>
  <script src="https://www.google.com/recaptcha/api.js" async defer/>
</svelte:head>

<div class="g-recaptcha" data-sitekey={SiteKey} data-theme={theme} data-callback={onSuccess.name} data-expired-callback={onExpire.name} data-error-callback={onError.name}/>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>