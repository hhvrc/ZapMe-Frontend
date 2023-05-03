<script lang="ts">
  import { ValidationResultIcon, type ValidationResult } from "$types";

  export let name: string | undefined = undefined;
  export let title = 'Password';
  export let placeholder = 'Password';
  export let autocomplete: 'new-password' | 'current-password' =
    'current-password';
  export let passwordShown = false;
  export let value: string;
  export let validationResult: ValidationResult | undefined = undefined;

  let errorIcon = 'fa-circle-check text-success-500';
  let errorMessage: string | undefined = undefined;
  $: if (validationResult) {
    errorIcon = ValidationResultIcon(validationResult);
  }
</script>

<label class="label">
  <span>{title}</span>
  <div class="input-group input-group-divider grid-cols-[1fr_auto]">
    <input
      class="input"
      type={passwordShown ? 'text' : 'password'}
      {name}
      {title}
      {placeholder}
      {autocomplete}
      {value}
      on:input={(e) => {
        passwordShown = false;
        value = e.currentTarget.value;
      }}
    />
    <div>
      <button
        class={'fa-solid !m-0 h-[20px] w-[20px] cursor-pointer !p-0 ' +
          (passwordShown ? 'fa-eye-slash' : 'fa-eye')}
        type="button"
        on:click={() => (passwordShown = !passwordShown)}
      />
      {#if validationResult}
      <i class={'fa-solid p-1 ' + errorIcon} title={errorMessage} />
      {/if}
    </div>
  </div>
</label>
