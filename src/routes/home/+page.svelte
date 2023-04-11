<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { IsAuthenticated } from "$lib/stores";
  import { BuildRedirectURL } from '$lib/utils/redirects';

  if (browser && !IsAuthenticated())
  {
    goto(BuildRedirectURL('/sign-in', '/home'));
  }
</script>

<svelte:head>
    <title>ZapMe - Home</title>
</svelte:head>

<div>
    Home
</div>

<style>
</style>