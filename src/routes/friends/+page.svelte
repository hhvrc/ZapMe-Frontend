<script lang="ts">
  import UserListEntryFetcher from '$components/User/UserListEntryFetcher.svelte';
  import { AccountStore } from '$lib/stores';

  let friendIds: string[] = [];
  $: friendIds = $AccountStore.account?.friendUserIds ?? [];
</script>

<svelte:head>
  <title>ZapMe - Friends</title>
</svelte:head>

<div class="responsive-card card p-4">
  <div class="flex flex-row items-center justify-between">
    <h1>Friends</h1>
    <button class="btn-primary btn variant-filled-surface">Add</button>
  </div>
  <hr class="my-2" />
  {#if friendIds.length > 0}
    <p>{friendIds.length} friends</p>
    <dl class="list-dl">
      {#each friendIds as userId (userId)}
        <UserListEntryFetcher {userId} />
      {/each}
    </dl>
  {:else}
    <p>You have no friends yet.</p>
  {/if}
</div>
