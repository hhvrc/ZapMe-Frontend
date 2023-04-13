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

  let materialSymbol: string = "magic_button";
  $: {
    switch ($selectedTheme) {
      case "light":
        materialSymbol = "light_mode";
        break;
      case "dark":
        materialSymbol = "dark_mode";
        break;
      default:
        materialSymbol = "magic_button";
        break;
    }
  }
</script>

<button on:click={toggleTheme}>
  <span class="usn material-symbols-outlined">{materialSymbol}</span>
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