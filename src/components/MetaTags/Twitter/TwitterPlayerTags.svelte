<script lang="ts">
  export let site: string | undefined = undefined;
  export let siteId: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let title: string | undefined = undefined;
  export let image: { src: string; alt: string } | undefined = undefined;
  export let player:
    | { type: 'iframe' | 'stream', src: string; width: number; height: number }
    | undefined = undefined;
</script>

<svelte:head>
  <meta name="twitter:card" content="player" />
  {#if site}
    <meta name="twitter:site" content={site} />
  {/if}
  {#if siteId}
    <meta name="twitter:site:id" content={siteId} />
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
  {#if player}
    {#if player.type === 'iframe'}
      <meta name="twitter:player" content={player.src} />
    {/if}
    <meta name="twitter:player:width" content={player.width.toString()} />
    <meta name="twitter:player:height" content={player.height.toString()} />
    {#if player.type === 'stream'}
      <meta name="twitter:player" content={player.src} />
    {/if}
  {/if}
</svelte:head>
