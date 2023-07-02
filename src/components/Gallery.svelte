<script lang="ts">
  import type { GalleryImage } from '$types/GalleryImage';

  export let images: GalleryImage[];
  export let columns: 2 | 3 | 4 | 5 | 6;
  export let requestPage: () => void;
  export let clickImage: ((image: GalleryImage) => void | Promise<void>) | undefined = undefined;

  type GalleryColumn = {
    images: GalleryImage[];
    height: number;
  };

  function buildCols(images: GalleryImage[], columns: number): GalleryColumn[] {
    let cols: GalleryColumn[] = Array(columns);
    for (let i = 0; i < columns; i++) {
      cols[i] = {
        images: [],
        height: 0,
      };
    }

    images.forEach((image) => {
      const shortest = cols.reduce((prev, curr) => (prev.height <= curr.height ? prev : curr));
      shortest.images.push(image);
      shortest.height += image.preview.height;
    });

    return cols;
  }
  $: cols = buildCols(images, columns);

  let section: HTMLElement;
  $: scrollPos = section ? section.scrollTop + section.clientHeight : 0;
  $: scrollHeight = section ? section.scrollHeight : 0;

  let timer: ReturnType<typeof setTimeout>;
  $: if (scrollPos >= scrollHeight - 200) {
    clearTimeout(timer);
    timer = setTimeout(() => requestPage(), 750);
  }
</script>

<section
  id="gallery-{columns}"
  bind:this={section}
  on:resize={() => (section = section)}
  on:scroll={() => (section = section)}
>
  {#each cols as { images }}
    <div>
      {#if clickImage}
        {#each images as image}
          <img
            class="cursor-pointer"
            src={image.preview.url}
            alt={image.title}
            on:mousedown={() => clickImage && clickImage(image)}
          />
        {/each}
      {:else}
        {#each images as image}
          <img src={image.preview.url} alt={image.title} />
        {/each}
      {/if}
    </div>
  {/each}
</section>

<style lang="postcss">
  section {
    @apply grid h-[75vh] gap-[8px] overflow-y-scroll !p-[8px];
  }
  section#gallery-2 {
    @apply grid-cols-2;
  }
  section#gallery-3 {
    @apply grid-cols-3;
  }
  section#gallery-4 {
    @apply grid-cols-4;
  }
  section#gallery-5 {
    @apply grid-cols-5;
  }
  section#gallery-6 {
    @apply grid-cols-6;
  }
  section div {
    @apply flex flex-col gap-[8px];
  }
  section div img {
    @apply h-auto w-full rounded-lg;
  }
</style>
