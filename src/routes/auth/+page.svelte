<script lang="ts">
	import PasswordInput from '$components/PasswordInput.svelte';
	import TextInput from '$components/TextInput.svelte';

    const oauthProviders = [
        { name: 'Discord', icon: 'fa-discord', href: '/oauth/discord' },
        { name: 'GitHub', icon: 'fa-github', href: '/oauth/github' },
        { name: 'Twitter', icon: 'fa-twitter', href: '/oauth/twitter' },
        { name: 'Google', icon: 'fa-google', href: '/oauth/google' }
    ];

    let username = '';
	let email = '';
	let password = '';
	let passwordShown = false;
    let confirmPassword = '';
    let confirmPasswordShown = false;

    export let form;
</script>

<svelte:head>
  <title>ZapMe - Register</title>
</svelte:head>

<!-- Login Form -->
<div class="card p-4 w-1/2 max-w-xl mx-auto my-8">
    <form class="flex flex-col space-y-4" method="post" action="?/login">
        <!-- Title -->
        <h2>Login</h2>

        <!-- Username -->
        <TextInput name="username" title="Username Or Email" placeholder="John Doe / john@example.com" autocomplete="on" bind:value={username} />

        <!-- Password -->
        <PasswordInput name="password" bind:value={password} bind:passwordShown />

        <!-- Submit -->
        <button type="submit" class="btn variant-filled w-1/2 self-center">
            <span class="hidden md:inline-block">🚀</span>
            <span>Login</span>
        </button>
        
        <!-- 1fr-auto-1fr with centered text -->
        <div class="grid grid-cols-[1fr_auto_1fr] gap-3 items-center text-gray-500">
            <hr/>Or Login With<hr/>
        </div>

        <div class="flex space-x-2">
            {#each oauthProviders as { name, icon, href }}
                <a class="btn variant-filled" {href}>
                    <span class={"fa-brands " + icon}></span>
                    <span class="hidden lg:inline-block">{name}</span>
                </a>
            {/each}
        </div>
    </form>
</div>

<!-- Register Form -->
<div class="card p-4 w-1/2 max-w-xl mx-auto my-8">
    <form class="flex flex-col space-y-4" method="post" action="/register">
        <!-- Title -->
        <h2>Register</h2>

        <!-- Username -->
        <TextInput name="username" title="Username" placeholder="John Doe" autocomplete="username" bind:value={username} />

        <!-- Email -->
        <TextInput name="email" title="Email" placeholder="john@example.com" autocomplete="email" bind:value={email} />

        <!-- Password -->
        <PasswordInput name="password" bind:value={password} title="Password" bind:passwordShown />

        <!-- Password -->
        <PasswordInput name="password" bind:value={confirmPassword} title="Confirm Password" bind:passwordShown={confirmPasswordShown} />

        <!-- Submit -->
        <button type="submit" class="btn variant-filled w-1/2 self-center">
            <span class="hidden md:inline-block">🚀</span>
            <span>Register</span>
        </button>
    </form>
</div>

<!-- Forgot Password Form -->
<div class="card p-4 w-1/2 max-w-xl mx-auto my-8">
    <form class="flex flex-col space-y-4" method="post" action="/forgot-password">
        <!-- Title -->
        <h2>Forgot Password</h2>

        <!-- Email -->
        <TextInput name="email" title="Email" placeholder="john@example.com" autocomplete="email" bind:value={email} />

        <!-- Submit -->
        <button type="submit" class="btn variant-filled w-1/2 self-center">
            <span class="hidden md:inline-block">🚀</span>
            <span>Send Email</span>
        </button>
    </form>
</div>