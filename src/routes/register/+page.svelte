<script lang="ts">
  import Turnstile from '$components/Turnstile.svelte';
  import {
    validateEmail,
    validatePassword,
    validatePasswordMatch,
    validateUsername,
  } from '$lib/validators';
  import type { ActionData } from './$types';
  import { focusTrap } from '@skeletonlabs/skeleton';

  export let form: ActionData;

  let username = form?.username?.toString() ?? '';
  $: usernameError = validateUsername(username);

  let email = form?.email?.toString() ?? '';
  $: emailError = validateEmail(email);

  let password = '';
  $: passwordError = validatePassword(password);

  let passwordMatch = '';
  $: passwordMatchError = validatePasswordMatch(password, passwordMatch);

  let acceptedTerms = form?.acceptedTerms?.toString() === 'on';
  $: acceptedTermsError = acceptedTerms ? { valid: true, message: null } : { valid: false, message: 'You must accept the terms.' };

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

  const IconOk = 'fa-info-circle';
  const IconError = 'fa-circle-exclamation text-error-500';
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
          class={'fa-solid ' + (usernameError.valid ? IconOk : IconError)}
          title={usernameError.message ??
            'Username must be between 3 and 20 characters long, and can only contain letters, numbers, and underscores.'}
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
        <i
          class={'fa-solid ' + (emailError.valid ? IconOk : IconError)}
          title={emailError.message ?? 'Email must be a valid email address.'}
        />
      </div>
    </div>
  </label>

  <!-- Password -->
  <label class="label">
    <span>Password</span>
    <div class="input-group input-group-divider grid-cols-[1fr_auto]">
      <input
        class="input"
        type="password"
        name="password"
        title="Password"
        placeholder="password"
        autocomplete="new-password"
        bind:value={password}
      />
      <div>
        <i
          class={'fa-solid ' + (passwordError.valid ? IconOk : IconError)}
          title={passwordError.message ??
            'Password must be at least 8 characters long.'}
        />
      </div>
    </div>
  </label>

  <!-- Confirm Password, name removed to prevent submission -->
  <label class="label">
    <span>Confirm Password</span>
    <div class="input-group input-group-divider grid-cols-[1fr_auto]">
      <input
        class="input"
        type="password"
        title="Password"
        placeholder="password"
        autocomplete="new-password"
        bind:value={passwordMatch}
      />
      <div>
        <i
          class={'fa-solid ' + (passwordMatchError.valid ? IconOk : IconError)}
          title={passwordMatchError.message ?? 'Passwords must match.'}
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
