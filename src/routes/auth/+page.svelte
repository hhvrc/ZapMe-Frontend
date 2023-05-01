<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import PasswordInput from '$components/PasswordInput.svelte';
	import TextInput from '$components/TextInput.svelte';
  import Turnstile from '$components/Turnstile.svelte';
  import { focusTrap } from '@skeletonlabs/skeleton';

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

  let turnstileToken: string|null = null;

  let disabled = true;

  export let form;
</script>

<svelte:head>
  <title>ZapMe - Register</title>
</svelte:head>

<!-- Login Form -->
<!--
  <svelte:head>
    <title>ZapMe - Login</title>
  </svelte:head>
-->
<div class="card p-4 w-1/2 max-w-xl mx-auto my-8">
    <form
      class="flex flex-col space-y-4"
      method="post"
      action="?/login"
      use:focusTrap={true}
      use:enhance={(event) => {
        disabled = true;

        return async ({ update }) => {
          await update();
          disabled = false;
        }
      }}
    >
        <!-- Title -->
        <h2>Login</h2>

        <!-- Username -->
        <TextInput
          name="username"
          title="Username Or Email"
          placeholder="John Doe / john@example.com"
          autocomplete="on"
          bind:value={username}
        />

        <!-- Password -->
        <PasswordInput
          name="password"
          bind:value={password}
          bind:passwordShown
        />

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
<!--
  <svelte:head>
    <title>ZapMe - Register</title>
  </svelte:head>
-->
<div class="card p-4 w-1/2 max-w-xl mx-auto my-8">
    <form
      class="flex flex-col space-y-4"
      method="post"
      action="/register"
      use:focusTrap={true}
      use:enhance={(event) => {
        disabled = true;

        return async ({ update }) => {
          await update();
          disabled = false;
        }
      }}
    >
        <!-- Title -->
        <h2>Register</h2>

        <!-- Username -->
        <TextInput
          name="username"
          title="Username"
          placeholder="John Doe"
          autocomplete="username"
          bind:value={username}
          fieldIcon={usernameErrorIcon}
          fieldIconMessage={usernameError.message}
        />

        <!-- Email -->
        <TextInput
          name="email"
          title="Email"
          placeholder="john@example.com"
          autocomplete="email"
          bind:value={email}
          fieldIcon={emailErrorIcon}
          fieldIconMessage={emailError.message}
        />

        <!-- Password -->
        <PasswordInput
          name="password"
          title="Password"
          autocomplete="new-password"
          bind:value={password}
          bind:passwordShown
          fieldIcon={passwordErrorIcon}
          fieldIconMessage={passwordError.message}
        />

        <!-- Password -->
        <PasswordInput
          name="password"
          title="Confirm Password"
          autocomplete="new-password"
          bind:value={confirmPassword}
          bind:passwordShown={confirmPasswordShown}
          fieldIcon={passwordMatchErrorIcon}
          fieldIconMessage={passwordMatchError.message}
        />

        <!-- Terms of Service -->
        <label class="flex items-center space-x-2">
          <input
            class="checkbox"
            type="checkbox"
            name="acceptedTerms"
            title="Agree to terms of service"
            bind:checked={acceptedTerms}
          />
          <span>I agree to the <a href="/terms-of-service">Terms of Service</a></span>
        </label>

        <!-- Turnstile -->
        <Turnstile action="register" bind:response={turnstileToken} />

        <!-- Submit -->
        <button type="submit" class="btn variant-filled w-1/2 self-center" {disabled}>
            <span class="hidden md:inline-block">🚀</span>
            <span>Register</span>
        </button>
    </form>
</div>

<!-- Forgot Password Form -->
<!--
  <svelte:head>
    <title>ZapMe - Reset Password</title>
  </svelte:head>
-->
<div class="card p-4 w-1/2 max-w-xl mx-auto my-8">
    <form
      class="flex flex-col space-y-4"
      method="post"
      action="/forgot-password"
      use:focusTrap={true}
      use:enhance={(event) => {
        disabled = true;

        return async ({ update }) => {
          await update();
          disabled = false;
        }
      }}
    >
        <!-- Title -->
        <h2>Forgot Password</h2>

        <!-- Email -->
        <TextInput name="email" title="Email" placeholder="john@example.com" autocomplete="email" bind:value={email} />

        <!-- Turnstile -->
        <Turnstile action="register" bind:response={turnstileToken} />

        <!-- Submit -->
        <button type="submit" class="btn variant-filled w-1/2 self-center" {disabled}>
            <span class="hidden md:inline-block">🚀</span>
            <span>Request Password Reset</span>
        </button>
    </form>
</div>