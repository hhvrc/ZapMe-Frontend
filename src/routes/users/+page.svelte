<script lang="ts">
  import { toastStore } from '@skeletonlabs/skeleton';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import TextInput from '$components/TextInput.svelte';
  import { userApi } from '$lib/fetchSingleton';
  import { SessionTokenStore } from '$lib/stores';
  import { UsersStore } from '$lib/stores/usersStore';
  import { BuildRedirectURL } from '$lib/utils/redirects';

  if (browser && !$SessionTokenStore) {
    goto(BuildRedirectURL('/login', $page.url));
  }

  $: users = $UsersStore;

  let search = '';
  let loading = false;
  $: disabled = loading || search.length === 0;

  function handleSubmit() {
    // Check if the user is already in the store
    const user = users.find((user) => user.username === search);
    if (user) {
      goto(`/users/${user.id}`);
      return;
    }

    loading = true;
    userApi
      .getUserByName(search)
      .then((value) => {
        UsersStore.set([...$UsersStore, value]);
        goto(`/users/${value.id}`);
      })
      .catch(() => {
        toastStore.trigger({
          message: `User "${search}" not found`,
        });
      })
      .finally(() => {
        loading = false;
      });
  }
</script>

<svelte:head>
  <title>ZapMe - Users</title>
</svelte:head>

<div class="card mx-auto my-8 w-1/2 max-w-xl p-4">
  <form class="flex flex-col space-y-4" on:submit|preventDefault={handleSubmit}>
    <!-- Title -->
    <h2>User lookup</h2>

    <!-- Username -->
    <TextInput
      title="Username"
      placeholder="Username"
      autocomplete="username"
      bind:value={search}
    />

    <!-- Submit -->
    <button type="submit" class="btn variant-filled w-1/2 self-center" {disabled}>
      <span>Lookup</span>
    </button>
  </form>
</div>
