<script lang="ts">
  import { goto } from '@roxi/routify';
  import { authLogin } from '$api/authentication';
  import { SessionStore } from '../stores';
  import NamedInput from '$cmp/NamedInput.svelte';
  import NamedCheckBox from '$cmp/NamedCheckBox.svelte';

  let title = 'Login';
  let username = '';
  let usernameError: string | null = null;
  let password = '';
  let passwordError: string | null = null;
  let rememberMe = false;

  async function handleSubmit() {
    // TODO: set loading
    const { sessionInfo, error } = await authLogin(username, password, rememberMe).finally(() => {
      // TODO: remove loading
    });

    if (sessionInfo) {
      console.log(sessionInfo);
      SessionStore.set(sessionInfo);
      $goto('/home');
      return;
    }

    if (error?.fields) {
      for (const [key, value] of Object.entries(error.fields)) {
        switch (key) {
          case 'username':
            usernameError = value[0];
            break;
          case 'password':
            passwordError = value[0];
            break;
          default:
            break;
        }
      }
    }

    if (error?.notification) {
      window.alert(error.notification.title + ': ' + error.notification.message);
    }
  }
  function validateForm(username:string, password:string) {
    return username.length > 0 && password.length > 0;
  }
</script>

<svelte:head>
  <title>ZapMe - {title}</title>
</svelte:head>

<div>
  <form on:submit|preventDefault={handleSubmit}>
    <h3>Sign In</h3>

    <NamedInput type='text' displayname="Username" bind:value={username} error={usernameError} />
    <NamedInput type='password' displayname="Password" bind:value={password} error={passwordError} />
    <NamedCheckBox displayname="Remember Me" bind:checked={rememberMe} />

    <button type="submit" disabled='{!validateForm(username, password)}'>Sign In</button>

    <div class="social">
      <button><img src="/icons/logo_google.svg" alt="Google Icon" />Google</button>
      <button><img src="/icons/logo_twitter.svg" alt="Google Icon" />Twitter</button>
    </div>
  </form>
</div>

<style>
  *,
  *:before,
  *:after{
    margin: 0;
    padding: 0;
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
  h3{
    font-size: 42px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
  }

  ::placeholder{
    color: #e5e5e5;
  }
  form div {
    margin-top: 30px;
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

  .social{
    display: flex;
    gap: 10px;
  }
  .social button{
    margin-top: 20px;
    background: red;
    width: 150px;
    border-radius: 3px;
    padding: 5px 10px 10px 5px;
    background-color: rgba(255,255,255,0.27);
    color: #eaf0fb;
    text-align: center;
  }
  .social button:hover{
    background-color: rgba(255,255,255,0.47);
  }
  .social img{
    height: 25px;
    width: 25px;
    margin-right: 4px;
  }
</style>