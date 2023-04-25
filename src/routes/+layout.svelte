<script lang="ts">
  import '../app.postcss';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import TwitterTags from '$components/MetaTags/TwitterTags.svelte';
  import OpenGraphTags from '$components/MetaTags/OpenGraphTags.svelte';
  import DefaultTags from '$components/MetaTags/DefaultTags.svelte';
  import SideBar from '$components/SideBar.svelte';

  const WebsiteURL = 'https://www.zapme.app';
  const WebsiteTitle = 'ZapMe | Control collars remotely';
  const WebsiteDescription =
    'ZapMe allows you to control your Submissives shock collars from anywhere in the world with low latency, realtime networking.';
  const WebsiteLogo = 'https://www.zapme.app/logo-512.png';
  const WebsiteLogoAlt = 'ZapMe Logo';

  let sidebarOpen = false;
</script>

<DefaultTags title={WebsiteTitle} description={WebsiteDescription} />
<TwitterTags
  card="summary_large_image"
  creatorhandle="@hhvrc"
  description={WebsiteDescription}
  image={{ src: WebsiteLogo, alt: WebsiteLogoAlt }}
/>
<OpenGraphTags
  type="website"
  title={WebsiteTitle}
  description={WebsiteDescription}
  image={{ src: WebsiteLogo, alt: WebsiteLogoAlt }}
  url={WebsiteURL}
/>

<Header bind:sidebarOpen />
<SideBar isopen={sidebarOpen} />
<main>
  <slot />
  <div class="scroll-cover" />
  <Footer />
</main>

<style>
  main {
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    margin: 0;
    height: calc(100vh - var(--header-height));
    padding-left: var(--scrollbar-width);
    overflow-y: scroll;
    overflow-x: hidden;

    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
  }
  .scroll-cover {
    position: fixed;
    top: var(--header-height);
    right: 0;
    width: var(--scrollbar-width);
    height: calc(100vh - var(--header-height));
    background: var(--thm-bg);

    pointer-events: none;

    opacity: 1;
    transition: opacity 0.5s;
    transition-delay: 1s;
    -webkit-transition: opacity 0.5s;
    -webkit-transition-delay: 1s;
  }
  main:hover .scroll-cover {
    opacity: 0;
    transition: opacity 0.5s;
    -webkit-transition: opacity 0.5s;
  }
</style>
