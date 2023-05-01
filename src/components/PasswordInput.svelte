<script lang="ts">
  export let name: string|undefined = undefined;
  export let title = 'Password';
  export let placeholder = 'Password';
  export let autocomplete: 'new-password' | 'current-password' = 'current-password';
	export let passwordShown = false;
	export let value: string;
  export let fieldIcon: string|undefined = undefined;
  export let fieldIconMessage: string|undefined = undefined;
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
                class={'w-[20px] h-[20px] !p-0 !m-0 fa-solid cursor-pointer ' +
                    (passwordShown ? 'fa-eye-slash' : 'fa-eye')}
                type="button"
                on:click={() => (passwordShown = !passwordShown)}
            />
        </div>
        <i
          class={'fa-solid p-1 ' + fieldIcon}
          title={fieldIconMessage}
        />
	</div>
</label>