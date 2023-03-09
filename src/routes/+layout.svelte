<script lang="ts">
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import TwitterTags from '$components/MetaTags/TwitterTags.svelte';
  import OpenGraphTags from '$components/MetaTags/OpenGraphTags.svelte';
  import DefaultTags from '$components/MetaTags/DefaultTags.svelte';

  const WebsiteURL = "https://www.zapme.app";
  const WebsiteTitle = "ZapMe | Control collars remotely";
  const WebsiteDescription = "ZapMe allows you to control your Submissives shock collars from anywhere in the world with low latency, realtime networking.";
  const WebsiteLogo = "https://www.zapme.app/logo-512.png";
  const WebsiteLogoAlt = "ZapMe Logo";
</script>

<DefaultTags
  title={WebsiteTitle}
  description={WebsiteDescription}
/>
<TwitterTags
  card="summary_large_image"
  creatorHandle="@hhvrc"
  description={WebsiteDescription}
  image={{src: WebsiteLogo, alt: WebsiteLogoAlt}}
/>
<OpenGraphTags
  type="website"
  title={WebsiteTitle}
  description={WebsiteDescription}
  image={{src: WebsiteLogo, alt: WebsiteLogoAlt}}
  url={WebsiteURL}
/>

<Header/>
<main>
  <slot/>
  <Footer/>
  <div class="scroll-cover"/>
</main>

<style>
  main {
    height: 100%;
    width: auto;
    overflow-y: scroll;
    padding-left: var(--scrollbar-width);

    display: grid;
    grid-template-rows: 1fr auto;
  }
  .scroll-cover {
    position: absolute;
    background: var(--thm-bg);
    height: 100%;  
    top: 0;
    right: 0;
    width: var(--scrollbar-width);

    pointer-events: none;

    opacity: 1;
    transition: opacity .5s;
    transition-delay: 1s;
    -webkit-transition: opacity .5s;
    -webkit-transition-delay: 1s;
  }
  main:hover .scroll-cover {
    opacity: 0;
    transition: opacity .5s;
    -webkit-transition: opacity .5s;
  }
</style>