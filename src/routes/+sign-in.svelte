<script lang="ts">
  import { goto } from '@roxi/routify';
  import { authLogin } from '$api/authentication';
  import NamedInput from '$cmp/NamedInput.svelte';
  import NamedCheckBox from '$cmp/NamedCheckBox.svelte';
  import Form from '$cmp/Form.svelte';
  import FormButton from '$cmp/FormButton.svelte';

  let title = 'Login';
  let username = '';
  let usernameError: string | null = null;
  let password = '';
  let passwordError: string | null = null;
  let rememberMe = false;

  async function handleSubmit() {
    // TODO: set loading
    const error = await authLogin(username, password, rememberMe).finally(() => {
      // TODO: remove loading
    });

    if (!error) {
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

  let socials = [
    { name: 'Google', icon: '/icons/logo_google.svg', link: '/auth/google' },
    { name: 'Twitter', icon: '/icons/logo_twitter.svg', link: '/auth/twitter' },
  ];
</script>

<svelte:head>
  <title>ZapMe - {title}</title>
</svelte:head>

<Form on:submit={handleSubmit} title={title}>
  <NamedInput type="text" icon="badge" displayname="Username" bind:value={username} error={usernameError} />
  <NamedInput type="password" displayname="Password" bind:value={password} error={passwordError} />
  <NamedCheckBox displayname="Remember Me" bind:checked={rememberMe} />

  <FormButton disabled={!validateForm(username, password)}>Sign In</FormButton>

  <div style="display: flex; gap: 10px;">
    {#each socials as {name, icon}}
      <button class="default-btn-text">
        <img src={icon} alt="{name} Icon"/>
        {name}
      </button>
    {/each}
  </div>
</Form>

<style>
  div button {
    width: 150px;
    padding: 5px 10px 10px 5px;
    text-align: center;
  }
  div img {
    height: 25px;
    width: 25px;
    margin-right: 4px;
  }
</style>