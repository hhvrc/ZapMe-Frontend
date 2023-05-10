<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { AuthenticationApi } from '$lib/api';
  import { RuntimeApiConfiguration } from '$lib/fetchSingleton';
  import { SessionTokenStore } from '$lib/stores';
  import { GetRedirectURL } from '$lib/utils/redirects';
  import { onMount } from 'svelte';

  const authenticationApi = new AuthenticationApi(RuntimeApiConfiguration);

  onMount(async () => {
    await authenticationApi.authSignOut().catch();
    SessionTokenStore.set(null);
    goto(GetRedirectURL($page.url, '/'));
  });
</script>
