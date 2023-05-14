<script lang="ts">
  import TextInput from "$components/TextInput.svelte";
import { AccountStore, SessionTokenStore } from "$lib/stores";

  $: account = $AccountStore?.account;
  if (!account && $SessionTokenStore) {
    AccountStore.fetchAccount();
  }

  let username = '';
</script>


<svelte:head>
  <title>ZapMe - Settings</title>
</svelte:head>

{#if account}
  <div class="py-4 px-4">
    <div class="card p-4 overflow-hidden">
      <span class="text-2xl font-bold">Settings</span>
      <div class="flex">
        <input type="text" class="input w-full" placeholder="Username" bind:value={username} />
        <button type="button" class="btn variant-filled w-1/2 self-center">
          <span>Edit</span>
        </button>
      </div>
      <div class="flex">
        <input type="text" class="input w-full" placeholder="Email" bind:value={username} />
        <button type="button" class="btn variant-filled w-1/2 self-center">
          <span>Edit</span>
        </button>
      </div>
      <div class="flex">
        <input type="text" class="input w-full" placeholder="Password" bind:value={username} />
        <button type="button" class="btn variant-filled w-1/2 self-center">
          <span>Edit</span>
        </button>
      </div>
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}