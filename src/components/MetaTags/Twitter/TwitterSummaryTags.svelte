<script lang="ts">
  export let type: 'summary' | 'summary_large_image';
  export let site: string | undefined = undefined;
  export let siteId: string | undefined = undefined;
  export let creator: { id: string; handle: string } | undefined = undefined;
  export let description: string | undefined = undefined;
  export let title: string | undefined = undefined;
  export let image: { src: string; alt: string } | undefined = undefined;
</script>

<svelte:head>
  <meta name="twitter:card" content={type} />
  {#if site}
    <meta name="twitter:site" content={site} />
  {/if}
  {#if siteId}
    <meta name="twitter:site:id" content={siteId} />
  {/if}
  {#if creator}
    <meta name="twitter:creator:id" content={creator.id} />
    <meta name="twitter:creator" content={creator.handle} />
  {/if}
  {#if description}
    <meta name="twitter:description" content={description} />
  {/if}
  {#if title}
    <meta name="twitter:title" content={title} />
  {/if}
  {#if image}
    <meta name="twitter:image" content={image.src} />
    <meta name="twitter:image:alt" content={image.alt} />
  {/if}
</svelte:head>
