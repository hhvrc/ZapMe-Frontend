<script lang="ts">
  import UserListEntryFetcher from '$components/UserListEntryFetcher.svelte';
  import { AccountStore } from '$lib/stores';

  let friendIds: string[] = [];
  $: friendIds = $AccountStore.account?.friendUserIds ?? [];
</script>

<svelte:head>
  <title>ZapMe - Friends</title>
</svelte:head>

<div class="bg-surface-100-800-token">
  <dl class="list-dl">
    {#each friendIds as userId (userId)}
      <UserListEntryFetcher {userId} />
    {/each}
  </dl>
</div>
