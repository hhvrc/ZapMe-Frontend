<script lang="ts">
  import Showdown from "showdown";

  /* eslint-disable svelte/no-at-html-tags */

  export let markdown = '';
  export let acknowledgement: 'I am aware that this component is XSS vulnerable and I am not using it for any data the user can manipulate.';
  if (!acknowledgement) {
    throw new Error('You must acknowledge that this component is XSS vulnerable.');
  }

  let rendered = '';
  $: {
    const converter = new Showdown.Converter({
      customizedHeaderId: true,
      requireSpaceBeforeHeadingText: true,
      strikethrough: true,
      openLinksInNewWindow: true,
      underline: true,
      metadata: true,
    });

    try {
      rendered = converter.makeHtml(markdown);
    } catch {
      // Fallback to a simple rendering
      converter.setOption('noHeaderId', true);
      converter.setOption('customizedHeaderId', false);
      converter.setOption('strikethrough', false);
      converter.setOption('encodeEmails', false);
      converter.setOption('metadata', false);

      try {
        rendered = converter.makeHtml(markdown);
      } catch {
        rendered = `<p>There was an error rendering the terms of service. Please contact the system administrator.</p>`;
      }
    }
  }
</script>

<div class="markdown unstyled">
  {@html rendered}
</div>

<style>
  :global(.markdown h1, .markdown h2, .markdown h3, .markdown h4, .markdown h5, .markdown h6) {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }
  :global(.markdown ol) {
    list-style-type: decimal;
    margin-left: 1.2rem;
  }
  :global(.markdown ul) {
    list-style-type: disc;
    margin-left: 1.2rem;
  }
</style>