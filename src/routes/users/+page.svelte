<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import TextInput from '$components/TextInput.svelte';
  import UserProfile from '$components/UserProfile.svelte';
  import { type UserDto } from '$lib/api';
  import { userApi } from '$lib/fetchSingleton';
  import { SessionTokenStore } from '$lib/stores';
  import { BuildRedirectURL } from '$lib/utils/redirects';

  if (browser && !$SessionTokenStore) {
    goto(BuildRedirectURL('/login', $page.url));
  }

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
    <div class="mt-4">
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
    </div>
  {/if}
</div>
