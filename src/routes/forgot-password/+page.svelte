<script lang="ts">
  import { browser } from '$app/environment';
  import { enhance } from '$app/forms';
  import TextInput from '$components/TextInput.svelte';
  import Turnstile from '$components/Turnstile.svelte';
  import { focusTrap, toastStore } from '@skeletonlabs/skeleton';
  import type { Snapshot } from './$types';

  export const snapshot: Snapshot = {
    capture: () => email,
    restore: (data) => email = data,
  };

  let email = '';
  let turnstileToken: string | null = null;

  let disabled = true;

  export let form;

  $: if (browser && form?.error) {
    toastStore.trigger({
      message: form.message,
      autohide: true,
      timeout: 5000,
      background: 'variant-filled-error'
    });
  }
</script>

<svelte:head>
  <title>ZapMe - Reset Password</title>
</svelte:head>

<!-- Forgot Password Form -->
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
    <h2>Forgot Password</h2>

    <!-- Email -->
    <TextInput
      name="email"
      title="Email"
      placeholder="john@example.com"
      autocomplete="email"
      bind:value={email}
    />

    <!-- Turnstile -->
    <Turnstile action="forgot-password" bind:response={turnstileToken} />

    <!-- Submit -->
    <button
      type="submit"
      class="btn variant-filled w-1/2 self-center"
      {disabled}
    >
      <span class="hidden md:inline-block">🚀</span>
      <span>Request Password Reset</span>
    </button>
  </form>
</div>
