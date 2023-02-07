<script lang="ts">
    import { goto } from '@roxi/routify';
    import { AccountApi } from '$api/index';

    const accountApi = new AccountApi();

    let email = '';
    let recaptcha_response = '';

    async function submitForm() {
        accountApi.accountRecoveryRequest({email, recaptcha_response})
        .then((response) => {
            console.log(response);
            $goto('/sign-in');
        })
        .catch((error) => {
            console.log(error);
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