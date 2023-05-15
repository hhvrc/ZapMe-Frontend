<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import StatusIndicator from '$components/StatusIndicator.svelte';
  import { UserStatus } from '$lib/api';
  import { AccountStore, SessionTokenStore } from '$lib/stores';
  import { GetUsernameInitials } from '$lib/utils/initials';
  import { BuildRedirectURL } from '$lib/utils/redirects';
  import { Avatar } from '@skeletonlabs/skeleton';

  if (browser && !$SessionTokenStore) {
    goto(BuildRedirectURL('/login', $page.url));
  }

  $: account = $AccountStore?.account;
  if (!account && $SessionTokenStore) {
    AccountStore.fetchAccount();
  }

  $: onlineStatus = account?.status ?? UserStatus.offline;
  let onlineStatusText = 'Offline';

  $: if (account) {
    const { status } = account;
    switch (status) {
      case UserStatus.doNotDisturb:
        onlineStatusText = 'Do Not Disturb';
        break;
      case UserStatus.inactive:
        onlineStatusText = 'Idle';
        break;
      case UserStatus.online:
        onlineStatusText = 'Online';
        break;
      case UserStatus.downBad:
        onlineStatusText = 'Down Bad';
        break;
      case UserStatus.offline:
      default:
        onlineStatusText = 'Offline';
        break;
    }
  }

  $: initials = GetUsernameInitials(account?.username ?? '');
  const bannerSrc =
    'https://i.pinimg.com/originals/31/c3/e3/31c3e3f032a177d0b0c983b8262de8f9.gif';
  const bannerAlt = 'ProfileBanner';
  const profileSrc =
    'https://i.pinimg.com/originals/49/07/13/4907130d5ddcd50beff46f78c9744a49.png';
  const profileFallback =
    'https://i.pinimg.com/originals/49/07/13/4907130d5ddcd50beff46f78c9744a49.png';
</script>

<svelte:head>
  <title>ZapMe - Profile</title>
</svelte:head>

{#if account}
  <div class="px-4 py-4">
    <div class="card overflow-hidden">
      <!-- Profile banner -->
      <img
        src={bannerSrc}
        alt={bannerAlt}
        class="h-32 w-full select-none object-cover"
      />

      <div class="mb-4 flex h-16 place-items-start justify-start px-4 py-2">
        <!-- Profile picture -->
        <div
          class="relative -top-[60px] mr-2 h-[128px] w-[128px] select-none rounded-full border-4 border-surface-100 bg-surface-100 dark:border-surface-800 dark:bg-surface-800"
        >
          <Avatar
            {initials}
            src={profileSrc}
            fallback={profileFallback}
            rounded="rounded-full"
            width="w-[120px]"
          />
          <div
            class="absolute bottom-0 right-0 rounded-full border-4 border-surface-100 bg-surface-100 dark:border-surface-800 dark:bg-surface-800"
          >
            <StatusIndicator {onlineStatus} scale="large" />
          </div>
        </div>

        <div>
          <!-- Profile name -->
          <h2 class="text-2xl font-bold">{account.username}</h2>

          <!-- Profile status (place at end center) -->
          <p class="text-sm">{onlineStatusText}</p>
        </div>
      </div>
      <div class="m-4 rounded-lg bg-surface-50 p-4 dark:bg-surface-900">
        <h3 class="text-xl font-bold">About</h3>
        <p>Status: {account.statusText}</p>
        <p>Created: {new Date(account.createdAt).toLocaleString()}</p>
      </div>
      <hr />
      <div class="p-4">
        <h5>Connected OAuth Accounts:</h5>
        {#each account.oauthConnections ?? [] as oauthConnection}
          <p>{oauthConnection}</p>
        {/each}
      </div>
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}
