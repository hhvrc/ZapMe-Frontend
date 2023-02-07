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

<script lang="ts">
    import {
        RadioGroup,
        RadioGroupLabel,
        RadioGroupOption,
        RadioGroupDescription,
    } from "@rgossiaux/svelte-headlessui";

    let title = 'Register';
    let username = '';
    let email = '';
    let password = '';

    async function register() {
        const response = await fetch('/api/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (response.status === 200) {
            const { token } = await response.json();
            localStorage.setItem('token', token);
            window.location.href = '/';
        }
    }
</script>

<style>
</style>