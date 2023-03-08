<script lang="ts">
  import { IsAuthenticated } from "$lib/stores";

  export const load = ctx => {
    if (!IsAuthenticated())
    {
      return {
        redirect: '/sign-in'
      }
    }
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