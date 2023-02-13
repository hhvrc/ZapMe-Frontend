<script lang="ts">
  import { SetThemeByName } from "../ThemeContext";

  let enabled = false;
  function setEnabled() {
    SetThemeByName(enabled ? "light": "dark");
  }
</script>

<div class="chechbox">
  {#if enabled}
    <span class="usn material-symbols-outlined">dark_mode</span>
  {:else}
    <span class="usn material-symbols-outlined">light_mode</span>
  {/if}
  <label class="usn">
    <input type="checkbox" bind:checked={enabled} on:change={setEnabled}>
    <span/>
  </label>
</div>

<style>
  .chechbox {
    height: 100%;
    width: auto;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 6px
  }
  label {
    display: block;
    position: relative;
    padding-left: 64px;
    margin-bottom: 32px;
    cursor: pointer;
  }
  label input {
    left: 0;
    position: absolute;
    visibility: hidden;
    cursor: pointer;
  }
  label span {
    position: absolute;
    top: 0;
    left: 0;
    height: 32px;
    width: 64px;
    border-radius: 25px;
    background-color: var(--thm-swiBg);
    transition: background-color 0.15s ease-in;
  }
  label span:after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 22px;
    height: 22px;
    border-radius: 11px;
    background: var(--thm-swiBtn);
    transition: left 0.15s ease-in;
  }
  label input:checked ~ span {
    background-color: var(--thm-swiBgSel);
  }
  label input:checked ~ span:after {
    left: 37px;
  }
</style>