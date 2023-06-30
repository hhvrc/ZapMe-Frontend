<script lang="ts">
  import UserListEntry from './UserListEntry.svelte';
  import { ProgressRadial } from '@skeletonlabs/skeleton';
  import { ErrorWrapper } from '$components/ErrorComponents';
  import { userApi } from '$lib/fetchSingleton';
  import { UsersStore } from '$lib/stores/UserRepository';

  export let userId: string;

  async function GetUserFromApi(userId: string) {
    const user = await userApi.getUserById(userId);
    UsersStore.upsertUser(user);
    return user;
  }

  $: user = $UsersStore.getById(userId);
  $: request = user ? Promise.resolve(user) : GetUserFromApi(userId);
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
