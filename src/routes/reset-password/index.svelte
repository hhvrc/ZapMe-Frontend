<script lang="ts">
    import { goto } from '@roxi/routify';
    import { requestPasswordReset } from '$api/account';

    let email = '';
    let recaptcha_response = '';

    async function submitForm() {
        requestPasswordReset(email, recaptcha_response)
        .finally(() => {
            $goto('/sign-in');
        });
    }
</script>

<svelte:head>
    <title>ZapMe - Forgot Password</title>
</svelte:head>

<div>
    Reset Password

    <form on:submit|preventDefault={submitForm}>
        <label for="email">Email</label>
        <input type="email" name="email" bind:value={email} />

        <button type="submit">Request password reset</button>
    </form>

    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>

<style>
</style>