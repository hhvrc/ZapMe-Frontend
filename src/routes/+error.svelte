<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import BasicTags from '$components/MetaTags/BasicTags.svelte';
  import OpenGraphTags from '$components/MetaTags/OpenGraphTags.svelte';
  import TwitterSummaryTags from '$components/MetaTags/Twitter/TwitterSummaryTags.svelte';

  let previousPage: string = base;

  afterNavigate(({ from }) => {
    previousPage = from?.url.pathname || previousPage;
  });

  $: meta = {
    title: 'Service Unavailable',
    description: 'ZapMe is currently unavailable',
    image: {
      src: '/logo-512.png',
      alt: 'ZapMe Logo',
    },
  };
</script>

<BasicTags {...meta} />
<TwitterSummaryTags type="summary" {...meta} site="@zapme_dev" creator="@hhvrc" />
<OpenGraphTags
  type="website"
  {...meta}
  url="https://zapme.dev"
  siteName="ZapMe"
  determiner="auto"
  metaLocale="en_US"
/>

<div class="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] text-center">
  <div class="text-9xl">{$page.status}</div>
  <div class="big">
    {$page.error?.message ?? 'Something went wrong.'}
    <br />
    <a href={previousPage}>Go back</a>
  </div>
</div>
