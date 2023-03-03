<script lang="ts">
    import { params } from '@roxi/routify';
</script>

<svelte:head>
    <title>ZapMe - Forgot Password</title>
</svelte:head>

{#if !$params.token}

<h2>Token Not Supplied</h2>

{:else}

<h2>Reset Password</h2>

{/if}

<style>
</style>