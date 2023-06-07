<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { AccountApi } from '$lib/api';
  import { RuntimeApiConfiguration } from '$lib/fetchSingleton';
  import { handleFetchError } from '$lib/helpers/errorDetailsHelpers';

  const accountApi = new AccountApi(RuntimeApiConfiguration);

  let loading = true;
  let error: string | null = null;
  if (browser) {
    const token = $page.url.searchParams.get('token');
    if (token) {
      accountApi
        .verifyEmailAddress(token)
        .catch(async (error) => {
          const result = await handleFetchError(error);
          error = result?.apiCode ?? 'An unknown error occurred.';
        })
        .finally(() => {
          loading = false;
        });
    } else {
      error = 'Looks like the link is broken. Please try again.';
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>ZapMe - Verify Email Address</title>
</svelte:head>

{#if loading}
  <div>
    <h1>Verifying...</h1>
  </div>
{:else if error}
  <div class="error">
    <h1>Oops!</h1>
    <p>{error}</p>
  </div>
{:else}
  <div class="success">
    <h1>Success!</h1>
    <p>Your email address has been verified.</p>
    <p>Now you can <a href="/login">login</a> to your account.</p>
  </div>
{/if}
