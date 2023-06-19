import showdown from 'showdown';

export function renderMarkdown(markdown: string) {
  const converter = new showdown.Converter({
    customizedHeaderId: true,
    requireSpaceBeforeHeadingText: true,
    strikethrough: true,
    openLinksInNewWindow: true,
    underline: true,
    metadata: true,
  });

  try {
    return converter.makeHtml(markdown);
  } catch {
    // Fallback to a simple rendering
    converter.setOption('noHeaderId', true);
    converter.setOption('customizedHeaderId', false);
    converter.setOption('strikethrough', false);
    converter.setOption('encodeEmails', false);
    converter.setOption('metadata', false);
  }

  try {
    return converter.makeHtml(markdown);
  } catch {
    return `<p>There was an error rendering the terms of service. Please contact the system administrator.</p>`;
  }
}
