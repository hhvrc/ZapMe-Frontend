<script lang="ts">
  /* eslint-disable svelte/no-at-html-tags */

  import { ApiConfigStore } from '$lib/stores';
  import showdown from 'showdown';

  const converter = new showdown.Converter({
    customizedHeaderId: true,
    requireSpaceBeforeHeadingText: true,
    openLinksInNewWindow: true,
    underline: true,
    metadata: true,
  });
</script>

<svelte:head>
  <title>ZapMe - Terms Of Service</title>
</svelte:head>

<div class="p-2 lg:p-4">
  <!-- There is no risk of XSS here, as the markdown can only be set by a system administrator -->
  {@html converter.makeHtml($ApiConfigStore?.termsOfServiceMarkdown ?? '')}
</div>
