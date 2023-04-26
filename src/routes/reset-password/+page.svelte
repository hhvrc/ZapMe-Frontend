<script lang="ts">
  import Turnstile from '$components/Turnstile.svelte';

  let turnstileResponse = '';
</script>

<svelte:head>
  <title>ZapMe - Reset Password</title>
</svelte:head>

<form>
  <label class="label">
    <span>Email</span>
    <input
      class="input"
      title="Email"
      type="email"
      placeholder="john@example.com"
      autocomplete="email"
    />
  </label>
  <Turnstile action="reset-password" bind:response={turnstileResponse} />
  <button type="submit" class="btn variant-filled">
    <span>🚀</span>
    <span>Request Password Reset</span>
  </button>
</form>
