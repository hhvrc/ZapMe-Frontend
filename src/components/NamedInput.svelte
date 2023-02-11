<script lang="ts">
  import { GeneratePseudoRandomString } from "../utils/random";

  export let id: string = GeneratePseudoRandomString(9);
  export let type: string;
  export let displayname: string;
  export let placeholder: string | null = null;
  export let value: string;
  export let error: string | null = null;
</script>

<label for={id}>{displayname}</label>

{#if type === 'password'}
  <input type="password" id={id} name={id} placeholder={placeholder ?? displayname} bind:value={value}>
{:else if type === 'email'}
  <input type="email" id={id} name={id} placeholder={placeholder ?? displayname} bind:value={value}>
{:else}
  <input type="text" id={id} name={id} placeholder={placeholder ?? displayname} bind:value={value}>
{/if}

{#if !!error}
  <p class="error">{error}</p>
{/if}

<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    font-family: 'Poppins',sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }
  label{
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
  }
  input{
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
  }
  ::placeholder{
    color: #e5e5e5;
  }
  .error{
    margin-top: 4px;
    color: red;
  }
</style>