<script lang="ts">
    import { goto } from '@roxi/routify';
    import { AuthenticationApi } from '$api/index';

    const accountApi = new AuthenticationApi();

    let title = 'Login';
    let username = '';
    let password = '';

    async function submitForm() {
        accountApi.authSignIn({username, password})
        .then((response) => {
            console.log(response);
            $goto('/home');
        })
        .catch((error) => {
            console.log(error);
        });
    }
</script>

<svelte:head>
    <title>ZapMe - {title}</title>
</svelte:head>

<div>
    Sign In

    <form on:submit|preventDefault={submitForm}>
        <label for="username">Username</label>
        <input type="username" name="username" bind:value={username} />

        <label for="password">Password</label>
        <input type="password" name="password" bind:value={password} />

        <a href="/reset-password">Forgot Password?</a>

        <button type="submit">Login</button>
    </form>

    <a href="/register">Register</a>
</div>

<style>
</style>