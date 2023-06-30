<script lang="ts">
  import { focusTrap, LightSwitch, popup } from '@skeletonlabs/skeleton';
  import { ThemeStore } from '$lib/stores';
  import { DefaultThemes } from '$lib/themes';

  let isFocused = true;
</script>

<div class="select-none">
  <!-- trigger -->
  <button class="btn hover:variant-soft-primary" use:popup={{ event: 'click', target: 'theme' }}>
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
          {#each DefaultThemes as theme}
            <li>
              <button
                class="option"
                type="submit"
                name="theme"
                value={theme.name}
                class:bg-primary-active-token={$ThemeStore === theme.name}
                on:click={() => ThemeStore.set(theme.name)}
              >
                <span>{theme.icon}</span>
                <span>{theme.name}</span>
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
