<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton';
  import TextInput from '$components/TextInput.svelte';
  import UserProfileSkeleton from '$components/User/UserProfileSkeleton.svelte';
  import { MapUserStatusToString } from '$lib/mappers/UserMapper';
  import { AccountStore, SessionTokenStore } from '$lib/stores';
  import { validateEmail, validateUsername } from '$lib/validators';

  $: account = $AccountStore?.account;
  if (!account && $SessionTokenStore) {
    AccountStore.fetchAccount();
  }

  function avatarClickHandler() {
    modalStore.trigger({ type: 'component', component: 'file' });
  }
  function bannerClickHandler() {
    modalStore.trigger({ type: 'component', component: 'file' });
  }

  let username = '';
  $: usernameValid = validateUsername(username);
  $: usernameChangeDisabled = !usernameValid.valid || username === account?.username;

  let email = '';
  $: emailValid = validateEmail(email);
  $: emailChangeDisabled = !emailValid.valid || email === account?.email;

  let initialized = false;
  $: if (account && !initialized) {
    username = account.username;
    initialized = true;
  }
</script>

<svelte:head>
  <title>ZapMe - Settings</title>
</svelte:head>

{#if account}
  <div class="responsive-card card">
    <UserProfileSkeleton user={account} {bannerClickHandler} {avatarClickHandler}>
      <div slot="header">
        <!-- Profile name -->
        {#if username}
          <h2 class="text-2xl font-bold">{username}</h2>
        {:else}
          <h2 class="text-2xl font-bold opacity-50">{account.username}</h2>
        {/if}

        <!-- Profile status (place at end center) -->
        <p class="text-sm">{MapUserStatusToString(account.status)}</p>
      </div>
    </UserProfileSkeleton>
    <hr />
    <div class="w-full px-4 py-4">
      <TextInput
        title="Username"
        placeholder="Username"
        bind:value={username}
        validationResult={usernameValid}
      >
        <button
          slot="button"
          class="btn-primary btn variant-filled-surface"
          disabled={usernameChangeDisabled}>Change</button
        >
      </TextInput>
      <TextInput title="Email" placeholder="Email" bind:value={email} validationResult={emailValid}>
        <button
          slot="button"
          class="btn-primary btn variant-filled-surface"
          disabled={emailChangeDisabled}>Change</button
        >
      </TextInput>
      <div class="mt-4 flex flex-col gap-2">
        <h5 class="text-red-500">Danger Zone</h5>
        <div class="flex flex-row gap-2">
          <button class="btn-primary btn variant-filled-surface flex-grow">Change Password</button>
          <button class="btn-primary btn flex-grow bg-red-500">Delete Account</button>
        </div>
      </div>
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}
