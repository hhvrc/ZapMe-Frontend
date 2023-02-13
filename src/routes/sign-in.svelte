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
    <h2 class="usn">Sign In</h2>

    <NamedInput type="text" icon="badge" displayname="Username" bind:value={username} error={usernameError} />
    <NamedInput type="password" displayname="Password" bind:value={password} error={passwordError} />
    <NamedCheckBox displayname="Remember Me" bind:checked={rememberMe} />

    <button type="submit" class="usn submit-btn" disabled='{!validateForm(username, password)}'>Sign In</button>

    <div class="social">
      <button><img src="/icons/logo_google.svg" alt="Google Icon" />Google</button>
      <button><img src="/icons/logo_twitter.svg" alt="Google Icon" />Twitter</button>
    </div>
  </form>
</div>

<style>
  form{
    position: absolute;
    top: 50%;
    left: 50%;

    box-sizing: border-box;
    min-width: 500px;
    transform: translate(-50%,-50%);

    padding: 50px 35px;
    border: 2px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    box-shadow: 0 0 40px rgba(8,7,16,0.6);

    background-color: var(--thm-paper);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
  h2{
    margin-bottom: 10px;
  }
  button {
    width: 100%;
    border-radius: 5px;

    outline: none;
    border: none;
    
    font-family: 'Poppins',sans-serif;
    font-size: 18px;
    font-weight: 600;
  }
  .submit-btn {
    padding: 15px 0;
  }
  .social{
    display: flex;
    gap: 10px;
  }
  .social button{
    width: 150px;
    padding: 5px 10px 10px 5px;
    text-align: center;
  }
  .social img{
    height: 25px;
    width: 25px;
    margin-right: 4px;
  }
</style>