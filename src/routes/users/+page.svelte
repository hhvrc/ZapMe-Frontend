<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import TextInput from '$components/TextInput.svelte';
  import { UserApi, type UserDto } from '$lib/api';
  import { RuntimeApiConfiguration } from '$lib/fetchSingleton';
  import { SessionTokenStore } from '$lib/stores';
  import { BuildRedirectURL } from '$lib/utils/redirects';

  if (browser && !$SessionTokenStore) {
    goto(BuildRedirectURL('/login', $page.url));
  }

  const userApi = new UserApi(RuntimeApiConfiguration);

  let search = '';
  let user: UserDto | null = null;
  let loading = false;
  $: disabled = loading || search.length === 0;

  function handleSubmit() {
    loading = true;
    userApi
      .lookUpUser(search)
      .then((value) => {
        user = value;
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

    <!-- Email -->
    <TextInput
      title="Username"
      placeholder="Username"
      autocomplete="username"
      bind:value={search}
    />

    <!-- Submit -->
    <button
      type="submit"
      class="btn variant-filled w-1/2 self-center"
      {disabled}
    >
      <span>Lookup</span>
    </button>
  </form>

  {#if !loading && user}
    <div>
      <p>{user.id}</p>
      <p>{user.username}</p>
      <p>{user.profilePictureId}</p>
      <p>{user.status}</p>
      <p>{user.statusText}</p>
      <p>{user.createdAt}</p>
      <p>{user.lastSeenAt}</p>

      <p>{JSON.stringify(user)}</p>

      <div>
        <button
          class="btn variant-filled w-1/2 self-center"
          on:click={() => {
            if (user) userApi.sendFriendRequest(user.id);
          }}
        >
          <span>Send friend request</span>
        </button>
      </div>
    </div>
  {/if}
</div>
