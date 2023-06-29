<script lang="ts">
  import { Avatar, toastStore } from '@skeletonlabs/skeleton';
  import StatusIndicator from '$components/StatusIndicator.svelte';
  import { UserFriendStatus, UserStatus, type UserDto } from '$lib/api';
  import { userApi } from '$lib/fetchSingleton';
  import { AccountStore } from '$lib/stores';
  import { GetUsernameInitials } from '$lib/utils/initials';

  export let user: UserDto;

  let onlineStatusText = 'Offline';

  $: switch (user.status) {
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

  $: initials = GetUsernameInitials(user.username);
</script>

<div class="card overflow-hidden">
  <!-- Profile banner -->
  <div class="group relative h-32 w-full select-none">
    <img
      class="h-32 w-full object-cover"
      src={user.bannerUrl ??
        'https://i.pinimg.com/originals/31/c3/e3/31c3e3f032a177d0b0c983b8262de8f9.gif'}
      alt="ProfileBanner"
    />
  </div>

  <div class="mb-4 flex h-16 place-items-start justify-start px-4 py-2">
    <!-- Profile picture -->
    <div
      class="relative -top-[60px] mr-2 h-[128px] w-[128px] select-none rounded-full border-4 bg-surface-100-800-token border-surface-100-800-token"
    >
      <div class="group relative h-[120px] w-[120px] rounded-full">
        <Avatar
          {initials}
          src={user.avatarUrl ??
            'https://i.pinimg.com/originals/49/07/13/4907130d5ddcd50beff46f78c9744a49.png'}
          rounded="rounded-full"
          width="w-[120px]"
        />
      </div>
      <StatusIndicator
        class="absolute bottom-0 right-0 rounded-full border-4 bg-surface-100-800-token border-surface-100-800-token"
        onlineStatus={user.status}
        scale="large"
      />
    </div>

    <div>
      <!-- Profile name -->
      <h2 class="text-2xl font-bold">
        {user.nickName ? `${user.nickName} (${user.username})` : user.username}
      </h2>

      <!-- Profile status (place at end center) -->
      <p class="text-sm">{onlineStatusText}</p>
    </div>

    {#if user.friendStatus !== UserFriendStatus.blocked && user.id !== $AccountStore.account?.id}
      <div class="flex-grow" />

      <button
        class="btn variant-filled-secondary mt-1"
        on:click={() => {
          if (user.friendStatus === UserFriendStatus.accepted) {
            // Nope, not implemented yet
          } else {
            userApi
              .createOrAcceptFriendRequest(user.id)
              .then(() => {
                toastStore.trigger({
                  message: `Friend request sent to: ${user.username}`,
                });
              })
              .catch(() => {
                toastStore.trigger({
                  message: `Failed to send friend request to: ${user.username}`,
                });
              });
          }
        }}
      >
        {user.friendStatus === UserFriendStatus.accepted ? 'Send Message' : 'Send Friend Request'}
      </button>
    {/if}
  </div>
  <div class="m-4 rounded-lg p-4 bg-surface-50-900-token">
    <h3 class="text-xl font-bold">About</h3>
    <p>Status: {user.statusText}</p>
    <p>Created: {new Date(user.createdAt).toLocaleString()}</p>
    <p>Relation: {user.friendStatus}</p>
    <p>Notes: {user.notes ?? ''}</p>
    <slot name="about" />
  </div>
  {#if $$slots.after}
    <hr />
    <div class="m-4">
      <slot name="after" />
    </div>
  {/if}
</div>
