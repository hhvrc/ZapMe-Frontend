<script lang="ts">
  import { ProgressRadial } from '@skeletonlabs/skeleton';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import ResponsiveCard from '$components/ResponsiveCard.svelte';
  import UserProfileFetcher from '$components/User/UserProfileFetcher.svelte';

  const userId = $page.params.userId;
</script>

{#if browser}
  <ResponsiveCard>
    <UserProfileFetcher {userId} />
  </ResponsiveCard>
{:else}
  <ProgressRadial />
{/if}
