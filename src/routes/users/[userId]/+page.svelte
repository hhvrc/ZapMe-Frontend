<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import ResponsiveCard from '$components/ResponsiveCard.svelte';
  import UserProfileFetcher from '$components/User/UserProfileFetcher.svelte';
  import { SessionTokenStore } from '$lib/stores';
  import { BuildRedirectURL } from '$lib/utils/redirects';

  if (browser && !$SessionTokenStore) {
    goto(BuildRedirectURL('/login', $page.url));
  }

  const userId = $page.params.userId;
</script>

<ResponsiveCard>
  <UserProfileFetcher {userId} />
</ResponsiveCard>
