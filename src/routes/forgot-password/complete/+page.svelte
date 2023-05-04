<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import PasswordInput from '$components/PasswordInput.svelte';
  import { validatePassword, validatePasswordMatch } from '$lib/validators';
  import { focusTrap } from '@skeletonlabs/skeleton';

  const token = $page.url.searchParams.get('token');
  let password = '';
  let passwordShown = false;
  $: passwordError = validatePassword(password);

  let passwordMatch = '';
  let passwordMatchShown = false;
  $: passwordMatchError = validatePasswordMatch(password, passwordMatch);

  async function handleSubmit() {
    
  }

  let disabled = false;
</script>

<svelte:head>
  <title>ZapMe - Reset Password</title>
</svelte:head>

{#if !token}
  <h2>
    You have not been provided with a token.<br />
    Please check your email and try again.
  </h2>
{:else}
  <div class="card mx-auto my-8 w-1/2 max-w-xl p-4">
    <form class="flex flex-col space-y-4" on:submit|preventDefault={handleSubmit} use:focusTrap={true}>
      <!-- Title -->
      <h2>Reset Password</h2>
      
      <p>Please enter your new password below.</p>

      <!-- Password -->
      <PasswordInput
        name="password"
        title="Password"
        autocomplete="new-password"
        bind:value={password}
        bind:passwordShown
        validationResult={passwordError}
      />
      <PasswordInput
        name="password"
        title="Confirm Password"
        autocomplete="new-password"
        bind:value={passwordMatch}
        bind:passwordShown={passwordMatchShown}
        validationResult={passwordMatchError}
      />

      <!-- Submit -->
      <button
        type="submit"
        class="btn variant-filled w-1/2 self-center"
        {disabled}
      >
        <span class="hidden md:inline-block">🚀</span>
        <span>Reset Password</span>
      </button>
    </form>
  </div>
{/if}
