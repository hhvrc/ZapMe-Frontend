<script lang="ts">
  import { selectedTheme } from "$lib/ThemeContext";
  import 'material-symbols';

  function toggleTheme() {
    selectedTheme.update((theme) => {
      if (theme === "dark") {
        return "light";
      } else {
        return "dark";
      }
    });
  }
</script>

<button on:click={toggleTheme}>
  {#if $selectedTheme === "light"}
    <span class="usn material-symbols-outlined">light_mode</span>
  {:else if $selectedTheme === "dark"}
    <span class="usn material-symbols-outlined">dark_mode</span>
  {:else}
    <span class="usn material-symbols-outlined">magic_button</span>
  {/if}
</button>

<style>
  button {
    padding: 0;
    background: none;
  }
  span {
    font-size: 1.75rem;
  }
</style>