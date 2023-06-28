<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton';
  import StatusIndicator from '$components/StatusIndicator.svelte';
  import { UserStatus, type UserDto } from '$lib/api';
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

<div class="user-container">
  <span class="relative -left-1 inline-block rounded-full border-inherit bg-inherit">
    <Avatar {initials} src={user.avatarUrl || undefined} rounded="rounded-full" width="w-[42px]" />
    <StatusIndicator
      class="absolute bottom-0 right-0 rounded-full border-2 border-inherit bg-inherit"
      onlineStatus={user.status}
      scale="small"
    />
  </span>
  <span class="flex-auto">
    <dt class="font-bold">{user.username}</dt>
    <dd class="text-sm opacity-50">{user.statusText ?? onlineStatusText}</dd>
  </span>
</div>

<style lang="postcss">
  .user-container {
    @apply h-12 cursor-pointer;
    background-color: rgb(var(--color-surface-100));
    border-color: rgb(var(--color-surface-100));
  }
  :global(.dark) .user-container {
    background-color: rgb(var(--color-surface-800));
    border-color: rgb(var(--color-surface-800));
  }
  .user-container:hover {
    background-color: rgb(var(--color-surface-50));
    border-color: rgb(var(--color-surface-50));
  }
  :global(.dark) .user-container:hover {
    background-color: rgb(var(--color-surface-700));
    border-color: rgb(var(--color-surface-700));
  }
</style>
