<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { AuthApi } from '$lib/api';
  import { RuntimeApiConfiguration } from '$lib/fetchSingleton';
  import { SessionTokenStore } from '$lib/stores';
  import { GetRedirectURL } from '$lib/utils/redirects';
  import { onMount } from 'svelte';

  const authApi = new AuthApi(RuntimeApiConfiguration);

  onMount(async () => {
    await authApi.authSignOut().catch();
    SessionTokenStore.set(null);
    goto(GetRedirectURL($page.url, '/'));
  });
</script>
