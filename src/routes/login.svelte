<script lang="ts">
    import { goto } from '@roxi/routify';
    import { AuthenticationApi } from '$api/index';
    import CenteredRect from '$cmp/CenteredRect.svelte';

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
    function validateForm(username:string, password:string) {
        return username.length > 0 && password.length > 0;
    }
</script>

<svelte:head>
    <title>ZapMe - {title}</title>
</svelte:head>

<CenteredRect>
    Sign In

    <form on:submit|preventDefault={submitForm}>
        <label for="username">Username</label>
        <input type="username" name="username" bind:value={username} />

        <label for="password">Password</label>
        <input type="password" name="password" bind:value={password} />
        <br>
        <a href="/reset-password">Forgot Password?</a>
        <br>
        <br>
        <button type="submit" disabled='{!validateForm(username, password)}'>Login</button>
    </form>

    <a href="/register">Register</a>
</CenteredRect>

<style>
</style>