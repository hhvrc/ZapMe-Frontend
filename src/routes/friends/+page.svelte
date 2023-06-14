<script lang="ts">
  import StatusIndicator from '$components/StatusIndicator.svelte';
  import { UserStatus } from '$lib/api';
  import { GetUsernameInitials } from '$lib/utils/initials';
  import { Avatar } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';

  let users: {
    id: string;
    name: string;
    presence: UserStatus;
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

<div class="bg-surface-100 dark:bg-surface-800">
  <dl class="list-dl">
    {#each users as { id, name, presence: status, statusText, pfp } (id)}
      <div
        class="h-12 cursor-pointer border-surface-100 bg-surface-100 hover:border-surface-50 hover:bg-surface-50 dark:border-surface-800 dark:bg-surface-800 dark:hover:border-surface-700 dark:hover:bg-surface-700"
      >
        <span
          class="relative -left-1 inline-block rounded-full border-inherit bg-inherit"
        >
          <Avatar
            initials={GetUsernameInitials(name)}
            src={pfp}
            rounded="rounded-full"
            width="w-[42px]"
          />
          <span
            class="absolute bottom-0 right-0 rounded-full border-2 border-inherit bg-inherit"
          >
            <StatusIndicator onlineStatus={status} scale="small" />
          </span>
        </span>
        <span class="flex-auto">
          <dt class="font-bold">{name}</dt>
          <dd class="text-sm opacity-50">{statusText}</dd>
        </span>
      </div>
    {/each}
  </dl>
</div>
