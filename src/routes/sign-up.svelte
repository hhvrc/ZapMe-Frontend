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

        <a href="/forgot-password">Forgot Password?</a>

        <button type="submit">Sign Up</button>
    </form>

    <a href="/sign-in">Sign In</a>
</div>

<script lang="ts">
    let title = 'Sign Up';
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