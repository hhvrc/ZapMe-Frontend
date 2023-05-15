<script lang="ts">
  import { SessionTokenStore } from '$lib/stores';

  $: loggedIn = !!$SessionTokenStore;
  $: title = loggedIn ? 'ZapMe - Home' : 'ZapMe';
  let description =
    'ZapMe allows you to control your Submissives shock collars from anywhere in the world with low latency, realtime networking.';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

{#if loggedIn}
  <div>
    <h1>Home</h1>
  </div>
{:else}
  <div class="m-6">
    <h1 class="text-center">
      <span class="font-normal">
        Take Control of Your Submissives from Anywhere in the World.
      </span>
    </h1>
    <br />
    <h2 class="text-center !font-normal">
      {description}
    </h2>
  </div>
{/if}
