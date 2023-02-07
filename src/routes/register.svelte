<script lang="ts">
    import { goto } from '@roxi/routify';
    import { AccountApi } from '$api/index';

    const accountApi = new AccountApi();

    let title = 'Register';
    let username = '';
    let email = '';
    let password = '';

    async function register() {
        accountApi.createAccount({username, email, password})
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

    <form on:submit|preventDefault={register}>
        <label for="username">Username</label>
        <input type="username" name="username" bind:value={username} />

        <label for="email">Email</label>
        <input type="email" name="email" bind:value={email} />

        <label for="password">Password</label>
        <input type="password" name="password" bind:value={password} />

        <label for="password">Confirm Password</label>
        <input type="password" name="password" bind:value={password} />

        <button type="submit">Register</button>
    </form>

    <a href="/login">Login</a>
</div>

<style>
</style>