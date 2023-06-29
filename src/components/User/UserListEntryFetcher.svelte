<script lang="ts">
  import UserListEntry from './UserListEntry.svelte';
  import { ProgressRadial } from '@skeletonlabs/skeleton';
  import { ErrorWrapper } from '$components/ErrorComponents';
  import type { UserDto } from '$lib/api';
  import { userApi } from '$lib/fetchSingleton';
  import { UsersStore } from '$lib/stores/usersStore';

  export let userId: string;

  let request: Promise<UserDto>;

  const user = $UsersStore.find((user) => user.id === userId);
  if (user) {
    request = Promise.resolve(user);
  } else {
    request = userApi.getUserById(userId);
  }
</script>

{#if request}
  {#await request}
    <ProgressRadial />
  {:then user}
    <UserListEntry {user} />
  {:catch exception}
    <ErrorWrapper {exception} />
  {/await}
{:else}
  <ProgressRadial />
{/if}