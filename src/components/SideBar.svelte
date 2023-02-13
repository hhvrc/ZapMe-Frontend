<script lang="ts">
  import { IsAuthenticatedStore, IsMenuOpenStore } from '../stores.js';

  let entries: { name: string, icon?: string, href: string }[] = [];

  if ($IsAuthenticatedStore) {
    entries.push({name: 'Home', icon: 'home', href: '/home'});
    entries.push({name: 'Friends', icon: 'people', href: '/friends'});
    entries.push({name: 'Messages', icon: 'message', href: '/messages'});
    entries.push({name: 'Profile', icon: 'person', href: '/profile'});
    entries.push({name: 'Settings', icon: 'settings', href: '/settings'});
    entries.push({name: 'Sign Out', icon: 'logout', href: '/sign-out'});
  } else {
    entries.push({name: 'Sign In', icon: 'login', href: '/sign-in'});
    entries.push({name: 'Register', icon: 'person_add', href: '/register'});
    entries.push({name: 'Reset Password', icon: 'lock', href: '/reset-password'});
    entries.push({name: 'Privacy Policy', icon: 'privacy_tip', href: '/privacy-policy'});
    entries.push({name: 'Terms of Service', icon: 'gavel', href: '/terms-of-service'});
    entries.push({name: 'Contact', icon: 'contact_support', href: '/contact'});
  }
</script>

{#if $IsMenuOpenStore}
<div class="menu">
  {#each entries as { name, icon, href }}
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
</div>
{/if}

<style>
  .menu {
    position: absolute;
    top: 80px;
    left: 0;
    bottom: 0;
    width: auto;
    min-width: 200px;
    padding: 24px;

    background-color: var(--bg-col);
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    z-index: 1000;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 16px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  a * {
    display: inline-block;
    vertical-align: middle;
  }
  a h3 {
    margin: 0;
    padding: 0;
  }
</style>