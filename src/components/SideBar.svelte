<script lang="ts">
  import { IsAuthenticated } from '$lib/stores';
  import { selectedTheme } from '$lib/ThemeContext';
  import 'material-symbols';

  export let isOpen: boolean;

  type ListEntry = {
    name: string,
    iconDark?: string,
    iconLight?: string,
    href: string
  };

  const entries: ListEntry[] = [];
  const socials: ListEntry[] = [];

  if (IsAuthenticated()) {
    entries.push({name: 'Home', iconDark: 'home', href: '/home'});
    entries.push({name: 'Friends', iconDark: 'people', href: '/friends'});
    entries.push({name: 'Messages', iconDark: 'message', href: '/messages'});
    entries.push({name: 'Profile', iconDark: 'person', href: '/profile'});
    entries.push({name: 'Settings', iconDark: 'settings', href: '/settings'});
    entries.push({name: 'Sign Out', iconDark: 'logout', href: '/sign-out'});
  } else {
    entries.push({name: 'Sign In', iconDark: 'login', href: '/sign-in'});
    entries.push({name: 'Register', iconDark: 'person_add', href: '/register'});
    entries.push({name: 'Reset Password', iconDark: 'lock', href: '/reset-password'});
    entries.push({name: 'Privacy Policy', iconDark: 'privacy_tip', href: '/privacy'});
    entries.push({name: 'Terms of Service', iconDark: 'gavel', href: '/tos'});
    entries.push({name: 'Contact', iconDark: 'contact_support', href: '/contact'});
  }

  socials.push({name: 'GitHub', iconDark: '/icons/logo_github_white.svg', iconLight: '/icons/logo_github_black.svg', href: 'https://github.com/hhvrc'});
  socials.push({name: 'Twitter', iconDark: '/icons/logo_twitter.svg', href: 'https://twitter.com/hhvrc'});
  socials.push({name: 'Discord', iconDark: '/icons/logo_discord_clyde_blurple.svg', href: 'https://discord.gg/ez6HE5vxe8'});
</script>

{#if isOpen}
<aside>
  {#each entries as { name, iconDark: icon, href }}
    <a class="usn" href={href}>
      {#if !!icon}
        <span class="material-symbols-outlined">
          {icon}
        </span>
      {/if}
      <h3 style="margin-left: 8px">
        {name}
      </h3>
    </a>
  {/each}
  <div style="flex: 1"/>
  {#each socials as { name, iconDark: icon, iconLight, href }}
    <a class="usn" href={href}>
      {#if !icon && !iconLight}
        <span class="material-symbols-outlined">
          link
        </span>
      {:else}
        <img src={$selectedTheme === 'light' ? iconLight ?? icon : icon} alt={name} style="width: 24px; height: 24px;"/>
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