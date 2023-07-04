<script lang="ts">
  import { toastStore } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import TextInput from '$components/TextInput.svelte';
  import { userApi } from '$lib/fetchSingleton';
  import { UsersStore } from '$lib/stores/UserRepository';

  $: users = $UsersStore;

  let search = '';
  let loading = false;
  $: disabled = loading || search.length === 0;

  function handleSubmit() {
    // Check if the user is already in the store
    const user = users.getByName(search);
    if (user) {
      goto(`/users/${user.id}`);
      return;
    }

    loading = true;
    userApi
      .getUserByName(search)
      .then((value) => {
        UsersStore.upsertUser(value);
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

<div class="responsive-card card p-4">
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
