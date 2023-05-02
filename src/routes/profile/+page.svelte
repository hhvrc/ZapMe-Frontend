<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { AccountStore, SessionTokenStore } from '$lib/stores';
  import { BuildRedirectURL } from '$lib/utils/redirects';

  if (browser && !$SessionTokenStore) {
    goto(BuildRedirectURL('/login', $page.url));
  }
</script>

<svelte:head>
  <title>ZapMe - Profile</title>
</svelte:head>

<div>
  <h1>Profile</h1>
  {#if $AccountStore}
    <p>Id: {$AccountStore.id}</p>
    <p>Username: {$AccountStore.username}</p>
    <p>Obfuscated Email: {$AccountStore.obscuredEmail}</p>
    <p>Email Verified: {$AccountStore.emailVerified}</p>
    <p>ProfilePictureId: {$AccountStore.profilePictureUrl}</p>
    <p>Status: {$AccountStore.status}</p>
    <p>StatusText: {$AccountStore.statusText}</p>
    <p>CreatedAt: {$AccountStore.createdAt}</p>
    <p>LastOnline: {$AccountStore.lastOnline}</p>
    <p>Accepted TOS Version: {$AccountStore.acceptedTosVersion}</p>
    <div>
      <h2>Friends:</h2>
      {#each $AccountStore.friends ?? [] as friend}
        <p>{friend}</p>
      {/each}
    </div>
    <div>
      <h2>Connected OAuth Accounts:</h2>
      {#each $AccountStore.oauthConnections ?? [] as account}
        <p>{account}</p>
      {/each}
    </div>
  {:else}
    <p>Not signed in.</p>
  {/if}
</div>

<style>
</style>
