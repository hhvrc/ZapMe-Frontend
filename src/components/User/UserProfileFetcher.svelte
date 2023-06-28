<script lang="ts">
  import { ProgressRadial } from '@skeletonlabs/skeleton';
  import { ErrorWrapper } from '$components/ErrorComponents';
  import UserProfile from './UserProfile.svelte';
  import type { UserDto } from '$lib/api';
  import { userApi } from '$lib/fetchSingleton';
  import { UsersStore } from '$lib/stores/usersStore';

  export let userId: string;

  const user = $UsersStore.find((user) => user.id === userId);

  let request: Promise<UserDto>;
  if (user) {
    request = Promise.resolve(user);
  } else {
    request = userApi.getUserById(userId);
  }
</script>

{#await request}
  <ProgressRadial />
{:then user}
  <UserProfile {user} />
{:catch exception}
  <ErrorWrapper {exception} />
{/await}
