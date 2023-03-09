<script lang="ts">
  let token: string | null = null;

  export function load({ url }) {
    if (!url.searchParams.has('token')) {
      return {
        status: 404,
        error: new Error('Not found')
      };
    }

    token = url.searchParams.get('token');
  }
</script>

<svelte:head>
    <title>ZapMe - Forgot Password</title>
</svelte:head>

{#if !token}

<h2>Token Not Supplied</h2>

{:else}

<h2>Reset Password</h2>

{/if}

<style>
</style>