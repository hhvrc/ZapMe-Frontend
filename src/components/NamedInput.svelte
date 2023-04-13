<script lang="ts">
  import { GeneratePseudoRandomString } from "$lib/utils/random";
  import 'material-symbols';

  export let id: string = GeneratePseudoRandomString(9);
  export let type: string;
  export let icon: string | null = null;
  export let displayname: string;
  export let placeholder: string | null = null;
  export let value: string;
  export let error: string | null = null;
  export let autocomplete: string | null = null;
  export let disabled: boolean = false;

  let divClass: string | null = null;
  let activeIcon: string | null = null;
  $: {
    if (error) {
      divClass = 'error';
      activeIcon = 'error';
    } else {
      divClass = null;
      if (!!icon) {
        activeIcon = icon;
      } else if (type === 'password') {
        activeIcon = 'lock';
      } else if (type === 'email') {
        activeIcon = 'email';
      } else {
        activeIcon = null;
      }
    }
  }
</script>

<div class={divClass} style="width: 100%;">
  <label for={id} class="usn">{displayname}</label>

  <div style="position: relative;">
    {#if type === 'password'}
      <input type="password" {id} name={id} {autocomplete} placeholder={placeholder ?? displayname} bind:value={value} {disabled}>
    {:else if type === 'email'}
      <input type="email" {id} name={id} {autocomplete} placeholder={placeholder ?? displayname} bind:value={value} {disabled}>
    {:else}
      <input type="text" {id} name={id} {autocomplete} placeholder={placeholder ?? displayname} bind:value={value} {disabled}>
    {/if}

    {#if !!activeIcon}
      <span class="icon usn material-symbols-outlined">{activeIcon}</span>
    {/if}
  </div>
  {#if !!error}
    <p class="usn">{error}</p>
  {/if}
</div>

<style>
  * {
    display: block;

    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    box-sizing: border-box;

    letter-spacing: 0.5px;
  }
  .error input {
    border: 1px solid red;
  }
  .error span {
    color: red;
    font-weight: 1000;
  }
  label, input, p {
    font-family: 'Poppins',sans-serif;
  }
  label, p {
    font-size: 14px;
    font-weight: 500;
  }
  input{
    height: 38px;
    width: 100%;
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 4px;
  }
  p {
    margin-top: 3px;
    color: red;
  }
  .icon{
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 18px;
    
    pointer-events: none;
  }
</style>