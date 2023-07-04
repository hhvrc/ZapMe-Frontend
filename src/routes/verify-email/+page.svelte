<script lang="ts">
  import { ProgressBar } from '@skeletonlabs/skeleton';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { accountApi } from '$lib/fetchSingleton';
  import { SessionTokenStore } from '$lib/stores';

  const token = browser ? $page.url.searchParams.get('token') : null;
</script>

<svelte:head>
  <title>ZapMe - Verify Email Address</title>
</svelte:head>

<div class="responsive-card card flex flex-col items-center gap-8 p-8">
  {#if browser}
    {#if token}
      {#await accountApi.completeAccountEmailVerification(token)}
        <h2>Verifying your email address...</h2>
        <ProgressBar />
      {:then}
        <h2>Email Verified</h2>
        {#if $SessionTokenStore}
          <h4>Your email address has been verified.</h4>
          <button class="btn-primary btn variant-filled" on:click={() => goto('/')}
            >Go to Home</button
          >
        {:else}
          <h4>You can now login to your account.</h4>
          <button class="btn-primary btn variant-filled" on:click={() => goto('/login')}
            >Go to Login</button
          >
        {/if}
      {:catch}
        <h2>Email Verification Failed</h2>
        <p>Please check the link in your email and try again.</p>
      {/await}
    {:else}
      <h2>Invalid Link</h2>
      <p>Please check the link in your email and try again.</p>
    {/if}
  {:else}
    <ProgressBar />
  {/if}
</div>
