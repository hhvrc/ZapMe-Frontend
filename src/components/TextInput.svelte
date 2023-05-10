<script lang="ts">
  import { ValidationResultIcon, type ValidationResult } from '$types';

  export let title: string;
  export let placeholder: string | undefined = undefined;
  export let autocomplete: string | undefined = undefined;
  export let value: string;
  export let validationResult: ValidationResult | undefined = undefined;

  let errorIcon = 'fa-circle-check text-success-500';
  $: if (validationResult) {
    errorIcon = ValidationResultIcon(validationResult);
  }
</script>

<label class="label">
  <span>{title}</span>
  <div class="input-group input-group-divider grid-cols-[1fr_auto]">
    <input
      class="input"
      type="text"
      {title}
      {placeholder}
      {autocomplete}
      bind:value
    />
    {#if validationResult}
      <div>
        <i class={'fa-solid ' + errorIcon} title={validationResult.message} />
      </div>
    {/if}
  </div>
</label>
