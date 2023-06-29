<script lang="ts">
  import { Avatar, modalStore } from '@skeletonlabs/skeleton';
  import StatusIndicator from '$components/StatusIndicator.svelte';
  import { UserStatus } from '$lib/api';
  import { AccountStore, SessionTokenStore } from '$lib/stores';
  import { GetUsernameInitials } from '$lib/utils/initials';

  $: account = $AccountStore?.account;
  if (!account && $SessionTokenStore) {
    AccountStore.fetchAccount();
  }

  $: onlineStatus = account?.status ?? UserStatus.offline;
  let onlineStatusText = 'Offline';

  $: switch (onlineStatus) {
    case UserStatus.doNotDisturb:
      onlineStatusText = 'Do Not Disturb';
      break;
    case UserStatus.inactive:
      onlineStatusText = 'Idle';
      break;
    case UserStatus.online:
      onlineStatusText = 'Online';
      break;
    case UserStatus.offline:
    default:
      onlineStatusText = 'Offline';
      break;
  }

  $: initials = GetUsernameInitials(account?.username ?? '');
  const bannerSrc = 'https://i.pinimg.com/originals/31/c3/e3/31c3e3f032a177d0b0c983b8262de8f9.gif';
  const bannerAlt = 'ProfileBanner';
  const profileSrc = 'https://i.pinimg.com/originals/49/07/13/4907130d5ddcd50beff46f78c9744a49.png';
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
      <div
        tabindex="-1"
        role="button"
        class="group relative h-32 w-full cursor-pointer select-none"
        on:mousedown={() => modalStore.trigger({ type: 'component', component: 'file' })}
      >
        <img
          class="transition-brightness h-32 w-full object-cover group-hover:brightness-50"
          src={bannerSrc}
          alt={bannerAlt}
        />
        <p
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-center text-xl font-medium uppercase text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          Change banner
        </p>
      </div>

      <div class="mb-4 flex h-16 place-items-start justify-start px-4 py-2">
        <!-- Profile picture -->
        <div
          class="relative -top-[60px] mr-2 h-[128px] w-[128px] select-none rounded-full border-4 bg-surface-100-800-token border-surface-100-800-token"
        >
          <div
            tabindex="-1"
            role="button"
            class="group relative h-[120px] w-[120px] cursor-pointer rounded-full"
            on:mousedown={() => modalStore.trigger({ type: 'component', component: 'file' })}
          >
            <Avatar
              {initials}
              src={profileSrc}
              fallback={profileFallback}
              rounded="rounded-full"
              width="w-[120px]"
              class="transition-brightness group-hover:brightness-50"
            />
            <p
              class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-center text-xl font-medium uppercase text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              Change avatar
            </p>
          </div>
          <StatusIndicator
            class="absolute bottom-0 right-0 rounded-full border-4 bg-surface-100-800-token border-surface-100-800-token"
            {onlineStatus}
            scale="large"
          />
        </div>

        <div>
          <!-- Profile name -->
          <h2 class="text-2xl font-bold">{account.username}</h2>

          <!-- Profile status (place at end center) -->
          <p class="text-sm">{onlineStatusText}</p>
        </div>
      </div>
      <div class="m-4 rounded-lg p-4 bg-surface-50-900-token">
        <h3 class="text-xl font-bold">About</h3>
        <p>Status: {account.statusText}</p>
        <p>Created: {new Date(account.createdAt).toLocaleString()}</p>
      </div>
      <hr />
      <div class="p-4">
        <h5>Connected OAuth Accounts:</h5>
        {#each account.ssoConnections ?? [] as oauthConnection}
          <p>{oauthConnection}</p>
        {/each}
      </div>
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}
