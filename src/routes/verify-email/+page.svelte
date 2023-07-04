<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { accountApi } from '$lib/fetchSingleton';
  import { ProgressBar } from '@skeletonlabs/skeleton';

  const token = $page.url.searchParams.get('token');
</script>

<svelte:head>
  <title>ZapMe - Verify Email Address</title>
</svelte:head>

<div class="card responsive-card p-8 flex flex-col gap-8 items-center">
  {#if token}
    {#await accountApi.completeAccountEmailVerification(token)}
      <h2>Verifying your email address...</h2>
      <ProgressBar />
    {:then} 
      <h2>Email Verified</h2>
      <h4>You can now login to your account.</h4>
      <button class="btn btn-primary variant-filled" on:click={() => goto('/login')}>Go to Login</button>
    {:catch}
      <h2>Email Verification Failed</h2>
      <p>Please check the link in your email and try again.</p>
    {/await}
  {:else}
    <h2>Email Verification Failed</h2>
    <p>This link is broken, please check your email and try again.</p>
  {/if}
</div>