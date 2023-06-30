<script lang="ts">
  import { modalStore, ProgressRadial } from '@skeletonlabs/skeleton';
  import UserProfileSkeleton from '$components/User/UserProfileSkeleton.svelte';
  import { UserStatus } from '$lib/api';
  import { AccountStore, SessionTokenStore } from '$lib/stores';

  $: account = $AccountStore?.account;
  if (!account && $SessionTokenStore) {
    AccountStore.fetchAccount();
  }

  $: onlineStatus = account?.status ?? UserStatus.offline;
  let onlineStatusText = 'Offline';

  $: switch (onlineStatus) {
    case UserStatus.doNotDisturb:
      onlineStatusText = 'Do Not Disturb';
      break;
    case UserStatus.inactive:
      onlineStatusText = 'Idle';
      break;
    case UserStatus.online:
      onlineStatusText = 'Online';
      break;
    case UserStatus.offline:
    default:
      onlineStatusText = 'Offline';
      break;
  }

  function avatarClickHandler() {
    modalStore.trigger({ type: 'component', component: 'file' });
  }
  function bannerClickHandler() {
    modalStore.trigger({ type: 'component', component: 'file' });
  }
</script>

<svelte:head>
  <title>ZapMe - Profile</title>
</svelte:head>

{#if account}
  <div class="px-4 py-4">
    <div class="card overflow-hidden">
      <UserProfileSkeleton user={account} {bannerClickHandler} {avatarClickHandler}>
        <div slot="header">
          <!-- Profile name -->
          <h2 class="text-2xl font-bold">{account.username}</h2>

          <!-- Profile status (place at end center) -->
          <p class="text-sm">{onlineStatusText}</p>
        </div>
        <h3 class="text-xl font-bold">About</h3>
        <p>Status: {account.statusText}</p>
        <p>Created: {new Date(account.createdAt).toLocaleString()}</p>
      </UserProfileSkeleton>
      <hr />
      <div class="p-4">
        <h5>Connected OAuth Accounts:</h5>
        {#each account.ssoConnections ?? [] as oauthConnection}
          <p>{oauthConnection}</p>
        {/each}
      </div>
    </div>
  </div>
{:else}
  <ProgressRadial />
{/if}
