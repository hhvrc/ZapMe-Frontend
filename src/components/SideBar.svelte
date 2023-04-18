<script lang="ts">
  import { ApiConfigStore, SessionTokenStore } from '$lib/stores';
  import { selectedTheme } from '$lib/ThemeContext';
  import 'material-symbols';

  export let isOpen: boolean;

  type ListEntry = {
    name: string,
    href: string,
    icon: 
      { type: 'uri', darkUri: string, lightUri: string } |
      { type: 'emoji', dark: string, light: string } |
      { type: 'material', name: string }
  };

  let entries: ListEntry[] = [];
  $: if (!!$SessionTokenStore) {
    entries = [
      { name: 'Home', href: '/home', icon: { type: 'material', name: 'home' } },
      { name: 'Friends', href: '/friends', icon: { type: 'material', name: 'people' } },
      { name: 'Messages', href: '/messages', icon: { type: 'material', name: 'message' } },
      { name: 'Profile', href: '/profile', icon: { type: 'material', name: 'person' } },
      { name: 'Settings', href: '/settings', icon: { type: 'material', name: 'settings' } },
      { name: 'Sign Out', href: '/sign-out', icon: { type: 'material', name: 'logout' } }
    ];
  } else {
    entries = [
      { name: 'Sign In', href: '/sign-in', icon: { type: 'material', name: 'login' } },
      { name: 'Register', href: '/register', icon: { type: 'material', name: 'person_add' } },
      { name: 'Reset Password', href: '/reset-password', icon: { type: 'material', name: 'lock' } },
      { name: 'Privacy Policy', href: '/privacy', icon: { type: 'material', name: 'privacy_tip' } },
      { name: 'Terms of Service', href: '/tos', icon: { type: 'material', name: 'gavel' } },
      { name: 'Contact', href: '/contact', icon: { type: 'material', name: 'contact_support' } }
    ];
  }

  let socials: ListEntry[] = [];
  $: {
    socials = [];

    const config = $ApiConfigStore;

    if (!!config)
    {
      const { githubUri, twitterUri, redditUri, websiteUri } = config!.founderSocials!;

      if (githubUri) socials.push({ name: 'GitHub', href: githubUri, icon: { type: 'uri', darkUri: '/icons/logo_github_white.svg', lightUri: '/icons/logo_github_black.svg' } });

      socials.push({ name: 'Discord', href: config.contact!.discord!, icon: { type: 'uri', darkUri: '/icons/logo_discord_clyde_blurple.svg', lightUri: '/icons/logo_discord_clyde_blurple.svg' } });

      if (twitterUri) socials.push({ name: 'Twitter', href: twitterUri, icon: { type: 'uri', darkUri: '/icons/logo_twitter.svg', lightUri: '/icons/logo_twitter.svg' } });

      if (redditUri) socials.push({ name: 'Reddit', href: redditUri, icon: { type: 'uri', darkUri: '/icons/logo_reddit.svg', lightUri: '/icons/logo_reddit.svg' } });

      if (websiteUri) socials.push({ name: 'Website', href: websiteUri, icon: { type: 'material', name: 'link' } });
    }
  }

  $: IsLightMode = $selectedTheme === 'light';
</script>

{#if isOpen}
<aside>
  {#each entries as { name, icon: icon, href }}
    <a class="usn" {href}>
      {#if icon.type === 'uri'}
        <img src={IsLightMode ? icon.lightUri : icon.darkUri} alt={name} style="width: 24px; height: 24px;"/>
      {:else if icon.type === 'emoji'}
        <span style="font-size: 24px; line-height: 24px; width: 24px; height: 24px;">
          {IsLightMode ? icon.light : icon.dark}
        </span>
      {:else if icon.type === 'material'}
        <span class="material-symbols-outlined">
          {icon.name}
        </span>
      {:else}
        <span class="material-symbols-outlined">
          link
        </span>
      {/if}
      <h3 style="margin-left: 8px">
        {name}
      </h3>
    </a>
  {/each}
  <div style="flex: 1"/>
  {#each socials as { name, href, icon }}
    <a class="usn" {href}>
      {#if icon.type === 'uri'}
        <img src={IsLightMode ? icon.lightUri : icon.darkUri} alt={name} style="width: 24px; height: 24px;"/>
      {:else if icon.type === 'emoji'}
        <span style="font-size: 24px; line-height: 24px; width: 24px; height: 24px;">
          {IsLightMode ? icon.light : icon.dark}
        </span>
      {:else if icon.type === 'material'}
        <span class="material-symbols-outlined">
          {icon.name}
        </span>
      {:else}
        <span class="material-symbols-outlined">
          link
        </span>
      {/if}
      <h3 style="margin-left: 8px">
        {name}
      </h3>
    </a>
  {/each}
</aside>
{/if}

<style>
  aside {
    position: fixed;
    top: var(--header-height);
    left: 0;
    width: minmax(200px, 300px);
    padding: 24px;

    background-color: var(--thm-bg);
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    z-index: 1000;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 16px;
  }
  a {
    width: 100%;
    color: inherit;
    text-decoration: none;
  }
  a * {
    display: inline-block;
    vertical-align: middle;
  }
</style>