<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { authenticationApi } from '$lib/fetchSingleton';
  import { SessionTokenStore } from '$lib/stores';
  import { GetRedirectURL } from '$lib/utils/redirects';
  import { onMount } from 'svelte';
  
  onMount(async () => {
    await authenticationApi.authSignOut({ headers: { 'Authorization': 'Bearer ' + $SessionTokenStore?.id } }).catch(() => {});
    SessionTokenStore.set(null);
    goto(GetRedirectURL($page.url, '/'));
  });
</script>