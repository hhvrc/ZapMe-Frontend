<script lang="ts">
  import {
    validatePassword,
    validateUsernameOrEmail,
  } from '$lib/validators';
  import type { ActionData } from './$types';
  import { focusTrap } from '@skeletonlabs/skeleton';

  export let form: ActionData;

  let usernameOrEmail = form?.usernameOrEmail?.toString() ?? '';

  let password = '';
  let passwordHidden = true;

  $: disabled = !(usernameOrEmail.length > 0 && password.length > 0);

  let isFocused = true;
</script>

<svelte:head>
  <title>ZapMe - Register</title>
</svelte:head>

<form method="POST" use:focusTrap={isFocused}>
  {#if !(form?.success ?? true)}
    <p class="text-black text-error-50">
      {JSON.stringify(form)}
    </p>
  {/if}
  <!-- Username -->
  <label class="label">
    <span>Username Or Email</span>
      <input
        class="input"
        type="text"
        name="usernameOrEmail"
        title="Username Or Email"
        placeholder="username / email"
        autocomplete="username"
        bind:value={usernameOrEmail}
      />
  </label>

  <!-- Password -->
  <label class="label">
    <span>Password</span>
    <div class="input-group input-group-divider grid-cols-[1fr_auto]">
      {#if passwordHidden}
        <input
          class="input"
          type="password"
          name="password"
          title="Password"
          placeholder="password"
          autocomplete="new-password"
          bind:value={password}
        />
      {:else}
        <input
          class="input"
          type="text"
          name="password"
          title="Password"
          placeholder="password"
          autocomplete="new-password"
          bind:value={password}
        />
      {/if}
      <div>
        <i
          class={'fa-solid cursor-pointer p-1 ' +
            (passwordHidden ? 'fa-eye' : 'fa-eye-slash')}
          title={passwordHidden ? 'Show' : 'Hide'}
          on:click={() => (passwordHidden = !passwordHidden)}
        />
      </div>
    </div>
  </label>

  <!-- Submit -->
  <button type="submit" class="btn variant-filled" {disabled}>
    <span>🚀</span>
    <span>Sign In</span>
  </button>
</form>
