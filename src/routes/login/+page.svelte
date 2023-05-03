<script lang="ts">
  import { enhance } from '$app/forms';
  import PasswordInput from '$components/PasswordInput.svelte';
  import TextInput from '$components/TextInput.svelte';
  import { focusTrap } from '@skeletonlabs/skeleton';

  const oauthProviders = [
    { name: 'Discord', icon: 'fa-discord', href: '/oauth/discord' },
    { name: 'GitHub', icon: 'fa-github', href: '/oauth/github' },
    { name: 'Twitter', icon: 'fa-twitter', href: '/oauth/twitter' },
    { name: 'Google', icon: 'fa-google', href: '/oauth/google' },
  ];

  let username = '';
  let password = '';
  let passwordShown = false;

  let disabled = true;

  export let form;
</script>

<svelte:head>
  <title>ZapMe - Login</title>
</svelte:head>

<!-- Login Form -->
<div class="card mx-auto my-8 w-1/2 max-w-xl p-4">
  <form
    class="flex flex-col space-y-4"
    method="post"
    use:focusTrap={true}
    use:enhance={() => {
      disabled = true;

      return async ({ update }) => {
        await update();
        disabled = false;
      };
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
    <PasswordInput name="password" bind:value={password} bind:passwordShown />

    <!-- Submit -->
    <button
      type="submit"
      class="btn variant-filled w-1/2 self-center"
      {disabled}
    >
      <span class="hidden md:inline-block">🚀</span>
      <span>Login</span>
    </button>

    <a href="/register" class="text-center">
      Don't have an account? Register here.
    </a>

    <a href="/forgot-password" class="text-center"> Forgot your password? </a>

    <!-- 1fr-auto-1fr with centered text -->
    <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-gray-500">
      <hr />
      Or Login With
      <hr />
    </div>

    <div class="flex space-x-2">
      {#each oauthProviders as { name, icon, href }}
        <a class="btn variant-filled" {href}>
          <span class={'fa-brands ' + icon} />
          <span class="hidden lg:inline-block">{name}</span>
        </a>
      {/each}
    </div>
  </form>
</div>
