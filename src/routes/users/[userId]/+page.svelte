<script lang="ts">
  import { page } from '$app/stores';
  import UserProfileFetcher from '$components/User/UserProfileFetcher.svelte';

  const userId = $page.params.userId;
</script>

<div class="responsive-card card">
  <UserProfileFetcher {userId} />
</div>
