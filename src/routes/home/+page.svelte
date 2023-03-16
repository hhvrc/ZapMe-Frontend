<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { IsAuthenticated } from "$lib/stores";

  $: if (browser && !IsAuthenticated())
  {
    goto('/sign-in');
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