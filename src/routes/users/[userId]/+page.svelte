<script lang="ts">
  import { page } from "$app/stores";
  import { ErrorWrapper } from "$components/ErrorComponents";
  import { UserApi } from "$lib/api";
  import { RuntimeApiConfiguration } from "$lib/fetchSingleton";
  import { ProgressRadial } from "@skeletonlabs/skeleton";

  const userApi = new UserApi(RuntimeApiConfiguration);

  const response = userApi.getUser($page.params.userId);
</script>

{#await response}
  <ProgressRadial />
{:then user} 
  <div>
    <p>{user.id}</p>
    <p>{user.username}</p>
    <p>{user.profilePictureId}</p>
    <p>{user.status}</p>
    <p>{user.statusText}</p>
    <p>{user.createdAt}</p>
    <p>{user.lastSeenAt}</p>
  </div>
{:catch exception}
  <ErrorWrapper {exception} />
{/await}

<style>
</style>
