<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>ZapMe - Verify Email Address</title>
</svelte:head>

{#if data.error}
  <div class="error">
    <h1>Oops!</h1>
    <p>{data.error}</p>
  </div>
{:else}
  <div class="success">
    <h1>Success!</h1>
    <p>Your email address has been confirmed.</p>
    <p>Now you can <a href="/login">login</a> to your account.</p>
  </div>
{/if}

<style>
</style>
