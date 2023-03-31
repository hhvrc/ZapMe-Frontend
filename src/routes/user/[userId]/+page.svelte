<script lang="ts">
  import { ErrorWrapper } from "$components/ErrorComponents";
  import type { UserDto } from "$lib/api";

  export let data;
  let userData: UserDto|null = null;
</script>

<svelte:head>
  {#if userData}
    <title>{userData.username} on ZapMe</title>
  {/if}
</svelte:head>

<ErrorWrapper request={data.userRequestFunc} data={userData}>
  <div>
    {#if userData}
      <h1>{userData.id}</h1>
      <h2>{userData.username}</h2>
    {/if}
  </div>
  <div slot="notFound">
    <h1>User not found</h1>
  </div>
</ErrorWrapper>

<style>
</style>