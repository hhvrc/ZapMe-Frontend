<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import UserAccountProfile from '$components/User/UserAccountProfile.svelte';
  import UserProfilePlaceholder from '$components/User/UserProfilePlaceholder.svelte';
  import { AccountStore, SessionTokenStore } from '$lib/stores';

  if (browser && !$SessionTokenStore) {
    goto('/login');
  }

  $: account = $AccountStore?.account;
  if (!account && $SessionTokenStore) {
    AccountStore.fetchAccount();
  }
</script>

<svelte:head>
  <title>ZapMe - Profile</title>
</svelte:head>

<div class="responsive-card card">
  {#if account}
    <UserAccountProfile {account} />
  {:else}
    <UserProfilePlaceholder />
  {/if}
</div>
