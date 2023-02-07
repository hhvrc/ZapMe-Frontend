<svelte:head>
    <title>ZapMe - Forgot Password</title>
</svelte:head>

<div>
    Reset Password: {$params.token}
</div>

<script lang="ts">
    /*
    import { onMount } from 'svelte';
    import { goto } from '@roxi/routify';
    import { resetPassword } from '../stores/auth';
    */
    import { params } from '@roxi/routify';
/*
    onMount(async () => {
        const token = $params.token;
        const response = await resetPassword(token);
        if (response.status === 200) {
            goto('/login');
        }
    });
    */
</script>

<style>
</style>