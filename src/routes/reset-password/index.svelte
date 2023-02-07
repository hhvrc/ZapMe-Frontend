<svelte:head>
    <title>ZapMe - Reset Password</title>
</svelte:head>

<div>
    Reset Password

    <form on:submit|preventDefault={signIn}>
        <label for="email">Email</label>
        <input type="email" name="email" bind:value={email} />

        <button type="submit">Request password reset</button>
    </form>

    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>

<script lang="ts">
    let email = '';

    async function signIn() {
        const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
            }),
        });

        if (response.status === 200) {
            window.location.href = '/login';
        }
    }
</script>

<style>
</style>