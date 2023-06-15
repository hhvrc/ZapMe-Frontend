<script lang="ts">
  import { page } from '$app/stores';
  import { ErrorWrapper } from '$components/ErrorComponents';
  import UserProfile from '$components/UserProfile.svelte';
  import { userApi } from '$lib/fetchSingleton';
  import { ProgressRadial } from '@skeletonlabs/skeleton';

  const response = userApi.getUser($page.params.userId);
</script>

{#await response}
  <ProgressRadial />
{:then user}
  <UserProfile user={user}>
    <div slot="after" class="flex flew-col gap-4">
      <button
        class="btn variant-filled w-1/2 self-center"
        on:click={() => {
          if (user) userApi.sendFriendRequest(user.id);
        }}
      >
        <span>Send friend request</span>
      </button>
      <button
        class="btn variant-filled w-1/2 self-center"
        on:click={() => {
          if (user) userApi.blockUser(user.id);
        }}
      >
        <span>Block</span>
      </button>
    </div>
  </UserProfile>
{:catch exception}
  <ErrorWrapper {exception} />
{/await}

<style>
</style>
