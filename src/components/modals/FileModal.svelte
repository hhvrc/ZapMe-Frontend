<script lang="ts">
  import { FileDropzone, modalStore } from "@skeletonlabs/skeleton";
</script>

<div class="modal block bg-surface-100-800-token w-modal h-auto p-4 space-y-4 rounded-container-token shadow-xl">
  <header class="modal-header text-2xl font-bold grid grid-cols-[1fr_1fr_auto]">
    Select an Image
    <div/>
    <button type="button" class="btn variant-ghost-surface">Cancel</button>
  </header>
  <!-- Upload file, giphy, or tenor -->
  <FileDropzone name="files">
    <svelte:fragment slot="lead"><i class="fa-solid fa-file-upload fa-xl"/></svelte:fragment>
    <svelte:fragment slot="message"><b>Upload a image</b> or drag an drop</svelte:fragment>
    <svelte:fragment slot="meta">PNG, JPG, and GIF allowed.</svelte:fragment>
  </FileDropzone>
  <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-gray-500">
    <hr />
    Or choose a GIF from
    <hr />
  </div>
  <div class="grid grid-cols-[1fr_1fr] items-center gap-3 text-gray-500">
    <button type="button" class="btn variant-filled-surface" on:click={() => modalStore.trigger({ type: 'component', component: 'giphy' })}>GIPHY</button>
    <button type="button" class="btn variant-filled-surface" on:click={() => modalStore.trigger({ type: 'component', component: 'tenor' })}>TENOR</button>
  </div>
</div>