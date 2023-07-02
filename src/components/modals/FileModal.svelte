<script lang="ts">
  import { FileDropzone, modalStore } from '@skeletonlabs/skeleton';
  import GiphySearch from '$components/GiphySearch.svelte';

  let mode: 'file' | 'giphy' | 'tenor' = 'file';
  let search = '';
</script>

<div
  class="modal w-modal block h-auto space-y-4 p-4 shadow-xl bg-surface-100-800-token rounded-container-token"
>
  <header class="modal-header grid grid-cols-[1fr_1fr_auto] text-2xl font-bold">
    {#if mode === 'file'}
      Select an Image
      <div />
      <button type="button" class="btn variant-ghost-surface" on:click={() => modalStore.close()}
        >Cancel</button
      >
    {:else}
      Select a GIF
      <div />
      <button type="button" class="btn variant-ghost-surface" on:click={() => (mode = 'file')}
        >Back</button
      >
    {/if}
  </header>

  {#if mode === 'file'}
    <!-- Upload file, giphy, or tenor -->
    <FileDropzone name="files">
      <svelte:fragment slot="lead"><i class="fa-solid fa-file-upload fa-xl" /></svelte:fragment>
      <svelte:fragment slot="message"><b>Upload a image</b> or drag an drop</svelte:fragment>
      <svelte:fragment slot="meta">PNG, JPG, and GIF allowed.</svelte:fragment>
    </FileDropzone>
    <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-gray-500">
      <hr />
      title Or choose a GIF from
      <hr />
    </div>
    <div class="grid grid-cols-[1fr_1fr] items-center gap-3 text-gray-500">
      <button type="button" class="btn variant-filled-surface" on:click={() => (mode = 'giphy')}
        >GIPHY</button
      >
      <button type="button" class="btn variant-filled-surface" on:click={() => (mode = 'tenor')}
        >TENOR</button
      >
    </div>
  {:else}
    <input class="input" title="Search" type="text" placeholder="Search term" bind:value={search} />
    {#if search !== ''}
      <GiphySearch {search} clickImage={(img) => console.log(img.title)} />
    {:else}
      <p>Search for a GIF</p>
    {/if}
  {/if}
</div>
