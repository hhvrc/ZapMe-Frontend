<script lang="ts">
  import { page } from '$app/stores';
  import { ErrorWrapper } from '$components/ErrorComponents';
  import UserProfile from '$components/User/UserProfile.svelte';
  import UserProfilePlaceholder from '$components/User/UserProfilePlaceholder.svelte';
  import { GetById } from '$lib/Actions/UserActions';
  import { UsersStore } from '$lib/stores/UserRepository';

  $: userId = $page.params.userId;
  $: user = $UsersStore.getById(userId);
  $: request = user ? Promise.resolve(user) : GetById(userId);
</script>

<div class="responsive-card card">
  {#await request}
    <UserProfilePlaceholder />
  {:then user}
    <UserProfile {user} />
  {:catch exception}
    <ErrorWrapper {exception} />
  {/await}
</div>
