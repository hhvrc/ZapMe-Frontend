<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { SessionTokenStore } from '$lib/stores';
  import { BuildRedirectURL } from '$lib/utils/redirects';

  if (browser && !$SessionTokenStore) {
    goto(BuildRedirectURL('/sign-in', $page.url));
  }
</script>

<svelte:head>
  <title>ZapMe - Home</title>
</svelte:head>

<div>Home</div>

<style>
</style>
