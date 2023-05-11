<script lang="ts">
  import UserEntry from "$components/UserEntry.svelte";
  import { UserStatus } from "$lib/api";
  import { onMount } from "svelte";

  let users: { id: string, name: string, status: UserStatus, statusText: string, pfp: string }[] = [];

  function randomStatus(): UserStatus {
    const statuses = [
      UserStatus.doNotDisturb,
      UserStatus.inactive,
      UserStatus.online,
      UserStatus.downBad,
      UserStatus.offline
    ];

    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  onMount(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(res => res.users)
      .then(res => res.map((user: any) => ({
        id: user.id,
        name: user.username,
        status: randomStatus(),
        statusText: user.company.title,
        pfp: user.image
      })))
      .then(res => users = res)
      .catch(err => console.error(err)) as unknown as { id: string, name: string, status: UserStatus, statusText: string, pfp: string }[];
  });

</script>

<svelte:head>
  <title>ZapMe - Friends</title>
</svelte:head>

<div class="bg-slate-800">
  <ul>
    {#each users as { id, name, status, statusText, pfp } (id)}
      <UserEntry {name} imageUrl={pfp} imageAlt={name} onlineStatus={status} onlineStatusText={statusText}/>
    {/each}
  </ul>
</div>