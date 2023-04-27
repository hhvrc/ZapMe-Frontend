<script lang="ts">
  import Turnstile from '$components/Turnstile.svelte';
  import {
    validateEmail,
    validatePassword,
    validatePasswordMatch,
    validateUsername,
  } from '$lib/validators';
  import { ValidationResultIcon } from '$types';
  import type { ActionData } from './$types';
  import { focusTrap } from '@skeletonlabs/skeleton';

  export let form: ActionData;

  let username = form?.username?.toString() ?? '';
  $: usernameError = validateUsername(username);
  $: usernameErrorIcon = ValidationResultIcon(usernameError);

  let email = form?.email?.toString() ?? '';
  $: emailError = validateEmail(email);
  $: emailErrorIcon = ValidationResultIcon(emailError);

  let password = '';
  $: passwordError = validatePassword(password);
  $: passwordErrorIcon = ValidationResultIcon(passwordError);
  let passwordHidden = true;

  let passwordMatch = '';
  $: passwordMatchError = validatePasswordMatch(password, passwordMatch);
  $: passwordMatchErrorIcon = ValidationResultIcon(passwordMatchError);
  let passwordMatchHidden = true;

  let acceptedTerms = form?.acceptedTerms?.toString() === 'on';
  $: acceptedTermsError = acceptedTerms
    ? { valid: true, message: null }
    : { valid: false, message: 'You must accept the terms.' };

  let turnstileToken = '';

  $: disabled = !(
    usernameError.valid &&
    emailError.valid &&
    passwordError.valid &&
    passwordMatchError.valid &&
    acceptedTermsError.valid &&
    !!turnstileToken
  );

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
    <span>Username</span>
    <div class="input-group input-group-divider grid-cols-[1fr_auto]">
      <input
        class="input"
        type="text"
        name="username"
        title="Username"
        placeholder="username"
        autocomplete="username"
        bind:value={username}
      />
      <div>
        <i
          class={'fa-solid ' + usernameErrorIcon}
          title={usernameError.message}
        />
      </div>
    </div>
  </label>

  <!-- Email -->
  <label class="label">
    <span>Email</span>
    <div class="input-group input-group-divider grid-cols-[1fr_auto]">
      <input
        class="input"
        type="email"
        name="email"
        title="Email"
        placeholder="john@example.com"
        autocomplete="email"
        bind:value={email}
      />
      <div>
        <i class={'fa-solid ' + emailErrorIcon} title={emailError.message} />
      </div>
    </div>
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
      <div class="p-0">
        <i
          class={'fa-solid cursor-pointer p-1 ' +
            (passwordHidden ? 'fa-eye' : 'fa-eye-slash')}
          title={passwordHidden ? 'Show' : 'Hide'}
          on:click={() => (passwordHidden = !passwordHidden)}
        />
        <i
          class={'fa-solid p-1 ' + passwordErrorIcon}
          title={passwordError.message}
        />
      </div>
    </div>
  </label>

  <!-- Confirm Password, name removed to prevent submission -->
  <label class="label">
    <span>Confirm Password</span>
    <div class="input-group input-group-divider grid-cols-[1fr_auto]">
      {#if passwordMatchHidden}
        <input
          class="input"
          type="password"
          title="Password"
          placeholder="password"
          autocomplete="new-password"
          bind:value={passwordMatch}
        />
      {:else}
        <input
          class="input"
          type="text"
          title="Password"
          placeholder="password"
          autocomplete="new-password"
          bind:value={passwordMatch}
        />
      {/if}
      <div class="p-0">
        <i
          class={'fa-solid cursor-pointer p-1 ' +
            (passwordMatchHidden ? 'fa-eye' : 'fa-eye-slash')}
          title={passwordMatchHidden ? 'Show' : 'Hide'}
          on:click={() => (passwordMatchHidden = !passwordMatchHidden)}
        />
        <i
          class={'fa-solid p-1 ' + passwordMatchErrorIcon}
          title={passwordMatchError.message}
        />
      </div>
    </div>
  </label>

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
  <button type="submit" class="btn variant-filled" {disabled}>
    <span>🚀</span>
    <span>Register</span>
  </button>
</form>
