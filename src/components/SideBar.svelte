<script lang="ts">
  import { IsAuthenticatedStore, IsMenuOpenStore } from '../stores.js';

  let entries: { name: string, href: string }[] = [];

  if ($IsAuthenticatedStore) {
    entries.push({name: 'Sign Out', href: '/sign-out'});
  } else {
    entries.push({name: 'Sign In', href: '/sign-in'});
    entries.push({name: 'Register', href: '/register'});
  }
</script>

{#if $IsMenuOpenStore}
<div class="menu" dis>
  {#each entries as { name, href }}
    <a href={href}>
      <h3>
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
    gap: 24px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
</style>