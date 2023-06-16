<script lang="ts">
  import { focusTrap, LightSwitch, popup } from '@skeletonlabs/skeleton';
  import { ThemeStore } from '$lib/stores';

  const themes = [
    { type: 'skeleton', name: 'Skeleton', icon: '💀' },
    { type: 'modern', name: 'Modern', icon: '🤖' },
    { type: 'rocket', name: 'Rocket', icon: '🚀' },
    { type: 'seafoam', name: 'Seafoam', icon: '🧜‍♀️' },
    { type: 'vintage', name: 'Vintage', icon: '📺' },
    { type: 'sahara', name: 'Sahara', icon: '🏜️' },
    { type: 'hamlindigo', name: 'Hamlindigo', icon: '👔' },
    { type: 'gold-nouveau', name: 'Gold Nouveau', icon: '💫' },
    { type: 'crimson', name: 'Crimson', icon: '⭕' },
  ];

  let isFocused = true;
</script>

<div class="select-none">
  <!-- trigger -->
  <button
    class="hover:variant-soft-primary btn"
    use:popup={{ event: 'click', target: 'theme' }}
  >
    <i class="fa-solid fa-palette text-lg" />
    <span class="hidden md:inline-block">Theme</span>
    <i class="fa-solid fa-caret-down opacity-50" />
  </button>
  <!-- popup -->
  <div class="card w-60 p-4 shadow-xl" data-popup="theme">
    <div class="space-y-4" use:focusTrap={isFocused}>
      <section class="flex items-center justify-between">
        <h6>Mode</h6>
        <LightSwitch />
      </section>
      <nav class="list-nav -m-4 max-h-64 overflow-y-auto p-4 lg:max-h-[500px]">
        <ul>
          {#each themes as { icon, name, type }}
            <li>
              <button
                class="option"
                type="submit"
                name="theme"
                value={type}
                class:bg-primary-active-token={$ThemeStore === type}
                on:click={() => ThemeStore.set(type)}
              >
                <span>{icon}</span>
                <span>{name}</span>
              </button>
            </li>
          {/each}
        </ul>
      </nav>
    </div>
    <!-- Arrow -->
    <div class="arrow bg-surface-100-800-token" />
  </div>
</div>

<style lang="postcss">
  .option {
    @apply flex h-full w-full content-between items-center rounded-lg transition-colors;
  }
</style>
