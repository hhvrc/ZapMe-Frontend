<script lang="ts">
  import Turnstile from '$components/Turnstile.svelte';
  import { focusTrap } from '@skeletonlabs/skeleton';

  let disabled = false;
  let isFocused = true;
</script>

<svelte:head>
  <title>ZapMe - Register</title>
</svelte:head>

<form method="POST" use:focusTrap={isFocused}>
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
      />
      <div>
        <i
          class="fa-solid fa-info-circle"
          title="Username must be between 3 and 20 characters long, and can only contain letters, numbers, and underscores."
        />
      </div>
    </div>
  </label>

  <!-- Email -->
  <label class="label">
    <span>Email</span>
    <input
      class="input"
      type="email"
      name="email"
      title="Email"
      placeholder="john@example.com"
      autocomplete="email"
    />
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
      />
      <div>
        <i
          class="fa-solid fa-info-circle"
          title="Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, and one number."
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
      />
      <div>
        <i class="fa-solid fa-info-circle" title="Passwords must match." />
      </div>
    </div>
  </label>

  <!-- Terms of Service -->
  <label class="flex items-center space-x-2">
    <input class="checkbox" type="checkbox" name="accepted-terms" title="Agree to terms of service" />
    <span>I agree to the <a href="/terms-of-service">Terms of Service</a></span>
  </label>

  <!-- Turnstile -->
  <Turnstile action="register" />

  <!-- Submit -->
  <button type="submit" class="btn variant-filled" {disabled}>
    <span>🚀</span>
    <span>Register</span>
  </button>
</form>
