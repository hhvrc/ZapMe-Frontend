<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { accountApi } from '$lib/fetchSingleton';

  $: if (browser) {
    const token = $page.url.searchParams.get('token');

    if (!token) {
      window.alert('Missing verification token!');
      goto('/sign-in');
    }
    else
    {
      accountApi.verifyEmailAddress({ token })
      .then(() => {
        window.alert('Email verified!');
        goto('/sign-in');
      })
      .catch(() => {
        window.alert('Failed to verify email!');
        goto('/sign-in');
      });
    }
  }
</script>

<svelte:head>
  <title>ZapMe - Verify Email</title>
</svelte:head>

<style>
</style>