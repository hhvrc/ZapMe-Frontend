<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import TextInput from '$components/TextInput.svelte';
  import UserProfilePlaceholder from '$components/User/UserProfilePlaceholder.svelte';
  import UserProfileSkeleton from '$components/User/UserProfileSkeleton.svelte';
  import { MapUserStatusToString } from '$lib/mappers/UserMapper';
  import { AccountStore, SessionTokenStore } from '$lib/stores';

  if (browser && !$SessionTokenStore) {
    goto('/login');
  }

  $: account = $AccountStore?.account;
  if (!account && $SessionTokenStore) {
    AccountStore.fetchAccount();
  }

  let status = '';
</script>

<svelte:head>
  <title>ZapMe - Profile</title>
</svelte:head>

<div class="responsive-card card">
  {#if account}
    <UserProfileSkeleton user={account}>
      <div slot="header">
        <!-- Profile name -->
        <h2 class="text-2xl font-bold">{account.username}</h2>

        <!-- Profile status (place at end center) -->
        <p class="text-sm">{MapUserStatusToString(account.status)}</p>
      </div>
      <p>Id: {account.id}</p>
      <p>Created: {new Date(account.createdAt).toLocaleString()}</p>
      <p>Updated: {new Date(account.updatedAt).toLocaleString()}</p>
      <p>Last Online: {new Date(account.lastOnline).toLocaleString()}</p>
    </UserProfileSkeleton>
    <hr />
    <div class="w-full px-4 py-4">
      <TextInput
        title="Status"
        placeholder={MapUserStatusToString(account.status)}
        bind:value={status}
      >
        <button slot="button" class="btn-primary btn variant-filled-surface"> Change </button>
      </TextInput>
    </div>
  {:else}
    <UserProfilePlaceholder />
  {/if}
</div>
