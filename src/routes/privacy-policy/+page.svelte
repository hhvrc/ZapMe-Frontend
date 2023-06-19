<script lang="ts">
  import { ApiConfigStore } from '$lib/stores';
  import Markdown from '$components/Markdown.svelte';

  /* eslint-disable svelte/no-at-html-tags */

  $: markdown = $ApiConfigStore?.privacyPolicyMarkdown ?? '';
</script>

<svelte:head>
  <title>ZapMe - Privacy Policy</title>
</svelte:head>

<div class="p-2 lg:p-4">
  <!-- There is a risk of XSS here, but it is acceptable because the markdown can only be set by a system administrator -->
  <Markdown {markdown} acknowledgement="I am aware that this component is XSS vulnerable and I am not using it for any data the user can manipulate." />
</div>
