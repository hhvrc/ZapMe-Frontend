<script lang="ts">
  import { goto } from '@roxi/routify';
  import { registerAccount } from '$api/account';
  import type { ErrorDetails } from '$api/generated/api';
  import NamedInput from '$cmp/NamedInput.svelte';
  import ReCaptcha from '$cmp//ReCaptcha.svelte';

  let title = 'Register';
  let username = '';
  let usernameError: string | null = null;
  let email = '';
  let emailError: string | null = null;
  let password = '';
  let passwordError: string | null = null;
  let confirmedPassword = '';
  let confirmedPasswordError: string | null = null;
  let acceptedTosVersion = -1;
  let recaptchaResponse = '';

  async function handleSubmit() {
    const response = await registerAccount(username, password, email, acceptedTosVersion, recaptchaResponse);

    if (response.ok) {
      $goto('/home');
      return;
    }

    if (!response.error) {
      window.alert('An unknown error occurred.');
      return;
    }

    const error = response.error as ErrorDetails;

    if (error.notification) {
      window.alert(error.notification.title + ': ' + error.notification.message);
    }

    if (error.fields) {
      for (const [key, value] of Object.entries(error.fields)) {
        switch (key) {
          case 'username':
            usernameError = value[0];
            break;
          case 'email':
            emailError = value[0];
            break;
          case 'password':
            passwordError = value[0];
            break;
          case 'confirmedPassword':
            confirmedPasswordError = value[0];
            break;
          default:
            break;
        }
      }
    }
  }
  function validateForm(username:string, password:string, email:string, confirmedPassword:string) {
      return username.length > 0 && password.length > 0 && email.length > 0 && password === confirmedPassword;
  }
</script>

<svelte:head>
    <title>ZapMe - {title}</title>
</svelte:head>

<div>
  <form on:submit|preventDefault={handleSubmit}>
      <h3>Register</h3>

      <NamedInput type='text' displayname="Username" bind:value={username} error={usernameError} />
      <NamedInput type='email' displayname="Email" bind:value={email} error={emailError} />
      <NamedInput type='password' displayname="Password" bind:value={password} error={passwordError} />
      <NamedInput type='password' displayname="Confirm Password" placeholder="Password" bind:value={confirmedPassword} error={confirmedPasswordError} />

      <ReCaptcha bind:response={recaptchaResponse} />

      <button type="submit" disabled='{!validateForm(username, password, email, confirmedPassword)}'>Register</button>
  </form>
</div>

<style>
    *,
    *:before,
    *:after{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    form{
        height: fit-content;
        width: fit-content;
        min-width: 500px;
        background-color: rgba(255,255,255,0.13);
        position: absolute;
        transform: translate(-50%,-50%);
        top: 50%;
        left: 50%;
        border-radius: 10px;
        border: 2px solid rgba(255,255,255,0.1);
        box-shadow: 0 0 40px rgba(8,7,16,0.6);
        padding: 50px 35px;
    }
    form *{
        font-family: 'Poppins',sans-serif;
        color: #ffffff;
        letter-spacing: 0.5px;
        outline: none;
        border: none;
    }
    form h3{
        font-size: 42px;
        font-weight: 500;
        line-height: 42px;
        text-align: center;
    }
    form button{
        margin-top: 30px;
        width: 100%;
        background-color: #ffffff;
        color: #080710;
        padding: 15px 0;
        font-size: 18px;
        font-weight: 600;
        border-radius: 5px;
        cursor: pointer;
    }
</style>