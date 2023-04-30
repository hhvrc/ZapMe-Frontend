<script lang="ts">
	export let name: string;
	export let title: string;
	export let placeholder: string|undefined;
	export let autocomplete: string|undefined;
	export let value: string;
  export let fieldIcon: string|undefined;
  export let fieldIconMessage: string|undefined;
</script>

<label class="label">
	<span>{title}</span>
	<input
		class="input"
		type="text"
		{name}
		{title}
		{placeholder}
		{autocomplete}
		bind:value
	/>
  {#if fieldIcon}
    <div>
      <i
        class={'fa-solid ' + fieldIcon}
        title={fieldIconMessage}
      />
    </div>
  {/if}
</label>
