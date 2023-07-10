<script lang="ts">
  import type { Snapshot } from './$types';
  import { focusTrap, modalStore } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import TextInput from '$components/TextInput.svelte';
  import Turnstile from '$components/Turnstile.svelte';
  import { accountApi } from '$lib/fetchSingleton';
  import { handleFetchError } from '$lib/helpers';
  import { validateEmail } from '$lib/validators';

  export const snapshot: Snapshot = {
    capture: () => email,
    restore: (data) => (email = data),
  };

  let email = '';
  let turnstileResponse: string | null = null;
  let submitting = false;

  async function handleSubmit() {
    if (!turnstileResponse) return;

    submitting = true;
    try {
      await accountApi.requestAccountPasswordReset({
        email,
        turnstileResponse,
      });

      modalStore.trigger({
        type: 'alert',
        title: 'Password Reset Requested',
        body: 'If an account with that email exists, a email has been sent to it with instructions on how to reset your password.',
        response: () => {
          goto('/login');
        },
        buttonTextCancel: 'OK',
      });
    } catch (error) {
      const response = await handleFetchError(error);
      if (!response) return;

      const fields = response.apiFields;
      if (fields) {
        if (fields.email) {
          emailError = { valid: false, message: fields.username[0] };
        }
      }
    } finally {
      submitting = false;
    }
  }

  $: emailError = validateEmail(email);

  $: disabled = !emailError.valid || !turnstileResponse || submitting;
</script>

<svelte:head>
  <title>ZapMe - Reset Password</title>
</svelte:head>

<!-- Forgot Password Form -->
<div class="card mx-auto my-8 w-1/2 max-w-xl p-4">
  <form
    class="flex flex-col space-y-4"
    on:submit|preventDefault={handleSubmit}
    use:focusTrap={true}
  >
    <!-- Title -->
    <h2>Forgot Password</h2>

    <!-- Email -->
    <TextInput
      title="Email"
      placeholder="john@example.com"
      autocomplete="email"
      bind:value={email}
    />

    <!-- Turnstile -->
    <Turnstile action="forgot-password" bind:response={turnstileResponse} />

    <!-- Submit -->
    <button type="submit" class="btn variant-filled w-1/2 self-center" {disabled}>
      Request Password Reset
    </button>
  </form>
</div>
