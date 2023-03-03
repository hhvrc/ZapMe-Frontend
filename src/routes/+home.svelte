<script lang="ts">
  import { IsAuthenticated } from "../stores";

  export const load = ctx => {
    if (!IsAuthenticated())
    {
      return {
        redirect: '/login'
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