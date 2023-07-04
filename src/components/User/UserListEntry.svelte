<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton';
  import StatusIndicator from '$components/StatusIndicator.svelte';
  import type { UserDto } from '$lib/api';
  import { MapUserStatusToString } from '$lib/mappers/UserMapper';
  import { GetUsernameInitials } from '$lib/utils/initials';

  export let user: UserDto;

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
    <dd class="text-sm opacity-50">{user.statusText ?? MapUserStatusToString(user.status)}</dd>
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
