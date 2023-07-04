<script lang="ts">
  import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';

  const LeadingTiles: { title: string; icon: string; href: string }[] = [
    {
      title: 'Home',
      icon: 'fa-house',
      href: '/',
    },
    {
      title: 'Devices',
      icon: 'fa-microchip',
      href: '/devices',
    },
    {
      title: 'Friends',
      icon: 'fa-user-friends',
      href: '/friends',
    },
    {
      title: 'Users',
      icon: 'fa-user',
      href: '/users',
    },
  ];
  const TrailingTiles: { title: string; icon: string; href: string }[] = [
    {
      title: 'Profile',
      icon: 'fa-user',
      href: '/profile',
    },
    {
      title: 'Settings',
      icon: 'fa-cog',
      href: '/settings',
    },
    {
      title: 'Logout',
      icon: 'fa-sign-out',
      href: '/logout',
    },
  ];
</script>

<AppRail class="!bg-surface-50-900-token">
  <svelte:fragment slot="lead">
    {#each LeadingTiles as { icon, href } (href)}
      <AppRailAnchor {href} selected={$page.url.pathname == href}>
        <i class={`fa-solid ${icon} fa-xl`} />
      </AppRailAnchor>
    {/each}
  </svelte:fragment>
  <svelte:fragment slot="trail">
    {#each TrailingTiles as { icon, href } (href)}
      <AppRailAnchor {href} selected={$page.url.pathname == href}>
        <i class={`fa-solid ${icon} fa-xl`} />
      </AppRailAnchor>
    {/each}
  </svelte:fragment>
</AppRail>
