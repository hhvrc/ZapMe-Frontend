<script lang="ts">
  import { renderMarkdown } from '$lib/utils/renderMarkdown';
  import { ApiConfigStore } from '$lib/stores';

  /* eslint-disable svelte/no-at-html-tags */

  $: markdown = $ApiConfigStore?.privacyPolicyMarkdown ?? '';
  $: rendered = renderMarkdown(markdown);
</script>

<svelte:head>
  <title>ZapMe - Privacy Policy</title>
</svelte:head>

<div class="p-2 lg:p-4">
  <!-- There is a risk of XSS here, but it is acceptable because the markdown can only be set by a system administrator -->
  {@html rendered}
</div>
