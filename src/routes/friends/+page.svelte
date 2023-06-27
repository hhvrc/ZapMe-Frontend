<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton';
  import StatusIndicator from '$components/StatusIndicator.svelte';
  import { UserStatus } from '$lib/api';
  import { GetUsernameInitials } from '$lib/utils/initials';
  import { onMount } from 'svelte';

  let users: {
    id: string;
    name: string;
    status: UserStatus;
    statusText: string;
    pfp: string;
  }[] = [];

  function randomStatus(): UserStatus {
    const statuses = [
      UserStatus.doNotDisturb,
      UserStatus.inactive,
      UserStatus.online,
      UserStatus.offline,
    ];

    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  onMount(() => {
    fetch('https://dummyjson.com/users')
      .then((res) => res.json())
      .then((res) => res.users)
      .then((res) =>
        res.map((user: any) => ({
          id: user.id,
          name: user.username,
          status: randomStatus(),
          statusText: user.company.title,
          pfp: user.image,
        }))
      )
      .then((res) => (users = res))
      .catch((err) => console.error(err)) as unknown as {
      id: string;
      name: string;
      status: UserStatus;
      statusText: string;
      pfp: string;
    }[];
  });
</script>

<svelte:head>
  <title>ZapMe - Friends</title>
</svelte:head>

<div class="bg-surface-100-800-token">
  <dl class="list-dl">
    {#each users as { id, name, status, statusText, pfp } (id)}
      <div class="user-container">
        <span class="relative -left-1 inline-block rounded-full border-inherit bg-inherit">
          <Avatar
            initials={GetUsernameInitials(name)}
            src={pfp}
            rounded="rounded-full"
            width="w-[42px]"
          />
          <StatusIndicator
            class="absolute bottom-0 right-0 rounded-full border-2 border-inherit bg-inherit"
            onlineStatus={status}
            scale="small"
          />
        </span>
        <span class="flex-auto">
          <dt class="font-bold">{name}</dt>
          <dd class="text-sm opacity-50">{statusText}</dd>
        </span>
      </div>
    {/each}
  </dl>
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
