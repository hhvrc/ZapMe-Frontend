<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton';
  import UserProfileSkeleton from '$components/User/UserProfileSkeleton.svelte';
  import { type AccountDto } from '$lib/api';
  import { MapUserStatusToString } from '$lib/mappers/UserMapper';

  export let account: AccountDto;

  function avatarClickHandler() {
    modalStore.trigger({ type: 'component', component: 'file' });
  }
  function bannerClickHandler() {
    modalStore.trigger({ type: 'component', component: 'file' });
  }
</script>

<UserProfileSkeleton user={account} {bannerClickHandler} {avatarClickHandler}>
  <div slot="header">
    <!-- Profile name -->
    <h2 class="text-2xl font-bold">{account.username}</h2>

    <!-- Profile status (place at end center) -->
    <p class="text-sm">{MapUserStatusToString(account.status)}</p>
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
