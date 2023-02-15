<script lang="ts">
  import { GeneratePseudoRandomString } from "../Utils/random";

  export let id: string = GeneratePseudoRandomString(9);
  export let type: string;
  export let icon: string | null = null;
  export let displayname: string;
  export let placeholder: string | null = null;
  export let value: string;
  export let error: string | null = null;

  if (!icon) {
    if (type === 'password') icon = 'lock';
    else if (type === 'email') icon = 'email';
  }
</script>

<div style="width: 100%;">
  <label for={id} class="usn">{displayname}</label>

  <div style="position: relative;">
    {#if type === 'password'}
      <input type="password" id={id} name={id} placeholder={placeholder ?? displayname} bind:value={value}>
    {:else if type === 'email'}
      <input type="email" id={id} name={id} placeholder={placeholder ?? displayname} bind:value={value}>
    {:else}
      <input type="text" id={id} name={id} placeholder={placeholder ?? displayname} bind:value={value}>
    {/if}

    {#if !!icon}
      <span class="icon usn material-symbols-outlined">{icon}</span>
    {/if}
  </div>

  {#if !!error}
    <p class="error usn">{error}</p>
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
  label, input, p {
    font-family: 'Poppins',sans-serif;
  }
  label, p {
    font-size: 16px;
    font-weight: 500;
  }
  input, p {
    font-size: 14px;
  }
  label {
    font-size: 16px;
    font-weight: 500;
  }
  input{
    height: 50px;
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