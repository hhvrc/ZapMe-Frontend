<script lang="ts">
  import type { ValidationResult } from '$types';

  export let title = 'Password';
  export let placeholder = 'Password';
  export let autocomplete: 'new-password' | 'current-password';
  export let password: string;
  export let passwordShown = false;
  export let validationResult: ValidationResult | undefined = undefined;
</script>

<label class="label">
  <span>{title}</span>
  <div class="input-group input-group-divider grid-cols-[1fr_auto]">
    <input
      class="input"
      type={passwordShown ? 'text' : 'password'}
      {title}
      {placeholder}
      {autocomplete}
      value={password}
      on:input={(e) => {
        passwordShown = false;
        password = e.currentTarget.value;
      }}
    />
    <div>
      <button
        class={'fa-solid !m-0 h-[20px] w-[20px] cursor-pointer !p-0 ' +
          (passwordShown ? 'fa-eye-slash' : 'fa-eye')}
        type="button"
        on:click={() => (passwordShown = !passwordShown)}
      />
    </div>
  </div>
  {#if validationResult}
    <p class="text-sm text-red-500">{validationResult.message}</p>
  {/if}
</label>
