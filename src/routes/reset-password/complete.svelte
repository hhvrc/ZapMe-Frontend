<script lang="ts">
    import { params } from '@roxi/routify';
</script>

<svelte:head>
    <title>ZapMe - Forgot Password</title>
</svelte:head>

{#if !$params.token}

<h1>Token Not Supplied</h1>

{:else}

<h1>Reset Password</h1>

{/if}

<style>
</style>