<script lang="ts">
  export let card: "summary" | "summary_large_image" | "player" | "app";
  export let title: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let siteHandle: string | undefined = undefined;
  export let creatorHandle: string | undefined = undefined;
  export let image: { src: string, alt: string } | undefined = undefined;
  export let player: { src: string, width: number, height: number } | undefined = undefined;
</script>

<svelte:head>
  <meta name="twitter:card" content={card} />
  {#if siteHandle}
    <meta name="twitter:site" content={siteHandle} />
  {/if}
  {#if title}
    <meta name="twitter:title" content={title} />
  {/if}
  {#if description}
    <meta name="twitter:description" content={description} />
  {/if}
  {#if creatorHandle}
    <meta name="twitter:creator" content={creatorHandle} />
  {/if}
  {#if image}
    <meta name="twitter:image" content={image.src} />
    <meta name="twitter:image:alt" content={image.alt} />
  {/if}
  {#if player}
    <meta name="twitter:player" content={player.src} />
    {#if player.width}
      <meta name="twitter:player:width" content={player.width.toString()} />
    {/if}
    {#if player.height}
      <meta name="twitter:player:height" content={player.height.toString()} />
    {/if}
  {/if}
</svelte:head>