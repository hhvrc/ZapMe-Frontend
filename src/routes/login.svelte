<svelte:head>
    <title>ZapMe - {title}</title>
</svelte:head>

<div>
    Sign In

    <form on:submit|preventDefault={signIn}>
        <label for="username">Username</label>
        <input type="username" name="username" bind:value={username} />

        <label for="password">Password</label>
        <input type="password" name="password" bind:value={password} />

        <a href="/reset-password">Forgot Password?</a>

        <button type="submit">Login</button>
    </form>

    <a href="/register">Register</a>
</div>

<script lang="ts">
    let title = 'Login';
    let username = '';
    let password = '';

    async function signIn() {
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