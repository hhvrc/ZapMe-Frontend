<script lang="ts">
  import { ApiConfigStore } from '$lib/stores';
  import Markdown from '$components/Markdown.svelte';
  
  $: markdown = $ApiConfigStore?.termsOfServiceMarkdown ?? '';
</script>

<svelte:head>
  <title>ZapMe - Terms Of Service</title>
</svelte:head>

<div class="p-2 lg:p-4">
  <!-- There is a risk of XSS here, but it is acceptable because the markdown can only be set by a system administrator -->
  <Markdown {markdown} />
</div>