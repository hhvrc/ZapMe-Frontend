<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { AccountApi, type AccountDto } from '$lib/api';
  import { RuntimeApiConfiguration } from '$lib/fetchSingleton';
  import { SessionTokenStore } from '$lib/stores';
  import { BuildRedirectURL } from '$lib/utils/redirects';

  const accountApi = new AccountApi(RuntimeApiConfiguration);

  if (browser && !$SessionTokenStore) {
    goto(BuildRedirectURL('/login', $page.url));
  }

  let account: AccountDto;
  accountApi.getAccount().then(a => account = a).catch(() => null);
</script>

<svelte:head>
  <title>ZapMe - Profile</title>
</svelte:head>

<div>
  <h1>Profile</h1>
  {#if account}
    <p>Id: {account.id}</p>
    <p>Username: {account.username}</p>
    <p>Obfuscated Email: {account.obscuredEmail}</p>
    <p>Email Verified: {account.emailVerified}</p>
    <p>ProfilePictureId: {account.profilePictureUrl}</p>
    <p>Status: {account.status}</p>
    <p>StatusText: {account.statusText}</p>
    <p>CreatedAt: {account.createdAt}</p>
    <p>LastOnline: {account.lastOnline}</p>
    <p>Accepted TOS Version: {account.acceptedTermsOfServiceVersion}</p>
    <div>
      <h2>Friends:</h2>
      {#each account.friends ?? [] as friend}
        <p>{friend}</p>
      {/each}
    </div>
    <div>
      <h2>Connected OAuth Accounts:</h2>
      {#each account.oauthConnections ?? [] as oauthConnection}
        <p>{oauthConnection}</p>
      {/each}
    </div>
  {:else}
    <p>Not signed in.</p>
  {/if}
</div>

<style>
</style>
