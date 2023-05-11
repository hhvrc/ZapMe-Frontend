<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import ProfilePicture from '$components/ProfilePicture.svelte';
  import { UserStatus } from '$lib/api';
  import { AccountStore, SessionTokenStore } from '$lib/stores';
  import { GetUsernameInitials } from '$lib/utils/initials';
  import { BuildRedirectURL } from '$lib/utils/redirects';

  if (browser && !$SessionTokenStore) {
    goto(BuildRedirectURL('/login', $page.url));
  }

  $: account = $AccountStore?.account;
  if (!account && $SessionTokenStore) {
    AccountStore.fetchAccount();
  }

  let onlineStatusColor = 'bg-gray-500';
  let onlineStatusText = 'Offline';
  
  $: if (account) {
    const { status } = account;
    switch (status) {
      case UserStatus.doNotDisturb:
        onlineStatusColor = 'bg-red-500';
        onlineStatusText = 'Do Not Disturb';
        break;
      case UserStatus.inactive:
        onlineStatusColor = 'bg-yellow-500';
        onlineStatusText = 'Idle';
        break;
      case UserStatus.online:
        onlineStatusColor = 'bg-green-500';
        onlineStatusText = 'Online';
        break;
      case UserStatus.downBad:
        onlineStatusColor = 'bg-purple-500';
        onlineStatusText = 'Down Bad';
        break;
      case UserStatus.offline:
      default:
        onlineStatusColor = 'bg-gray-500';
        onlineStatusText = 'Offline';
        break;
    }
  }
</script>

<svelte:head>
  <title>ZapMe - Profile</title>
</svelte:head>

{#if account}
  <div class="float-left w-1/2 h-full py-4 pl-4 pr-2">
    <div class="card overflow-hidden">
      <!-- Profile banner -->
      <img src="https://i.pinimg.com/originals/31/c3/e3/31c3e3f032a177d0b0c983b8262de8f9.gif" alt="ProfileBanner" class="w-full h-32 object-cover select-none"/>
      
      <div class="flex justify-start place-items-start px-4 py-2 h-16 mb-4">
        <!-- Profile picture -->
        <div class="relative w-[120px] h-[120px] -top-[60px] rounded-full ring-4 bg-surface-800 ring-surface-800 select-none mr-2">
          <ProfilePicture
            src="https://i.pinimg.com/originals/49/07/13/4907130d5ddcd50beff46f78c9744a49.png"
            initials={GetUsernameInitials(account.username)}
            onlineStatus={account?.status ?? UserStatus.offline}
            scale="large"
          />
        </div>

        <!-- Profile name -->
        <h2 class="text-2xl font-bold">{account.username}</h2>
        
        <!-- Profile status (place at end center) -->
        <div class="flex items-center ml-auto text-sm">
          <div class={`w-3 h-3 rounded-full ${onlineStatusColor} mr-2`}></div>
          <p class="text-sm">{onlineStatusText}</p>
        </div>
      </div>
      <div class="bg-surface-900 m-4 p-4 rounded-lg">
        <h3 class="text-xl font-bold">About</h3>
        <p>Status: {account.statusText}</p>
        <p>Created: {new Date(account.createdAt).toLocaleString()}</p>
      </div>
      <hr>
      <div class="p-4">
        <h5>Connected OAuth Accounts:</h5>
        {#each account.oauthConnections ?? [] as oauthConnection}
          <p>{oauthConnection}</p>
        {/each}
      </div>
    </div>
  </div>
  <div class="float-right w-1/2 h-full py-4 pl-2 pr-4">
    <div class="card p-3">
      <h1>Settings</h1>
      <p>Coming soon...</p>
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}