<script lang="ts">
  import type { ValidationResult } from '$types';

  export let title: string;
  export let placeholder: string | undefined = undefined;
  export let autocomplete: string | undefined = undefined;
  export let value: string;
  export let validationResult: ValidationResult | undefined = undefined;
</script>

<label class="w-full label">
  <span>{title}</span>
  <div class="flex flex-row items-center gap-2">
    <div class="flex-grow input-group input-group-divider grid-cols-[1fr_auto]">
      <input class="input" type="text" {title} {placeholder} {autocomplete} bind:value />
    </div>
    <slot name="button" />
  </div>
  {#if validationResult}
    <p class="text-red-500 text-sm">{validationResult.message}</p>
  {/if}
</label>
