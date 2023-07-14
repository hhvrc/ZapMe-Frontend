<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { authenticationApi } from '$lib/fetchSingleton';
  import { SessionTokenStore } from '$lib/stores';
  import { GetRedirectURL } from '$lib/utils/redirects';
  import { toastStore } from '@skeletonlabs/skeleton';

  const loggedIn = !!$SessionTokenStore;

  function AfterApiSignOut() {
    try {
      SessionTokenStore.set(null);
      if (loggedIn) {
        toastStore.trigger({
          message: 'Signed out',
          autohide: true,
          timeout: 3000,
          background: 'variant-filled-success'
        });
      }
    } finally {
      goto(GetRedirectURL($page.url, '/'));
    }
  }

  if (browser) {
    if (loggedIn) {
      authenticationApi.signOut().finally(AfterApiSignOut);
    } else {
      goto(GetRedirectURL($page.url, '/'));
    }
  }
</script>
