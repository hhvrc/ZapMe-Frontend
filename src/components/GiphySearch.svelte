<script lang="ts">
  import Gallery from './Gallery.svelte';
  import { PUBLIC_GIPHY_API_KEY } from '$env/static/public';
  import type { GalleryImage } from '$types/GalleryImage';

  const PageSize = 25;

  export let search = '';
  export let limit = 200;
  export let rating: 'g' | 'pg' | 'pg-13' | 'r' = 'r';
  export let lang: 'en' | 'es' | 'pt' = 'en';
  export let clickImage: ((image: GalleryImage) => void | Promise<void>) | undefined = undefined;

  type EntryImg = {
    height: string;
    width: string;
    size: string;
    url: string;
  };
  type EntryWebp = {
    height: string;
    width: string;
    webp_size: string;
    webp: string;
  };
  type EntryMp4 = {
    height: string;
    width: string;
    mp4_size: string;
    mp4: string;
  };

  type GiphyEntry = {
    id: string;
    title: string;
    images: {
      original: EntryImg & EntryWebp & EntryMp4 & { frames: string; hash: string };
      downsized: EntryImg;
      downsized_large: EntryImg;
      downsized_medium: EntryImg;
      downsized_small: EntryMp4;
      downsized_still: EntryImg;
      fixed_height: EntryImg & EntryWebp & EntryMp4;
      fixed_height_downsampled: EntryImg & EntryWebp;
      fixed_height_small: EntryImg & EntryWebp & EntryMp4;
      fixed_height_small_still: EntryImg;
      fixed_height_still: EntryImg;
      fixed_width: EntryImg & EntryWebp & EntryMp4;
      fixed_width_downsampled: EntryImg & EntryWebp;
      fixed_width_small: EntryImg & EntryWebp & EntryMp4;
      fixed_width_small_still: EntryImg;
      fixed_width_still: EntryImg;
      looping: { mp4_size: string; mp4: string };
      original_still: EntryImg;
      original_mp4: EntryMp4;
      preview: EntryMp4;
      preview_gif: EntryImg;
      preview_webp: EntryImg;
      '480w_still': EntryImg;
    };
  };

  let lastSearch = '';
  let images: GalleryImage[] = [];
  async function fetchImages() {
    if (search.length < 3 || limit < 1) {
      images = [];
      return;
    }

    if (search !== lastSearch) {
      lastSearch = search;
      images = [];
    }

    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${PUBLIC_GIPHY_API_KEY}&q=${search}&limit=${PageSize}&offset=${images.length}&rating=${rating}&lang=${lang}`
    );
    const json = (await res.json()) as { data: GiphyEntry[] };
    const newEntries = json.data.map((entry) => {
      const {
        id,
        title,
        images: { original, downsized, preview_webp },
      } = entry;
      return {
        id,
        title,
        original: {
          url: original.url,
          height: parseInt(original.height),
          width: parseInt(original.width),
        },
        preview: {
          url: downsized.url,
          height: parseInt(downsized.height),
          width: parseInt(downsized.width),
        },
        thumbnail: {
          url: preview_webp.url,
          height: parseInt(preview_webp.height),
          width: parseInt(preview_webp.width),
        },
      };
    }) as GalleryImage[];

    images = [...images, ...newEntries].filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );
  }

  let timer: ReturnType<typeof setTimeout>;
  $: if (search.length >= 3) {
    clearTimeout(timer);
    timer = setTimeout(() => fetchImages(), 750);
  }
</script>

{#if search.length < 3}
  <p>Search for a GIF</p>
{:else}
  <Gallery {images} columns={2} requestPage={() => fetchImages()} {clickImage} />
{/if}
