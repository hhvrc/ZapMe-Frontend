<script lang="ts">
  import { GeneratePseudoRandomString } from "../utils/random";

  export let id: string = GeneratePseudoRandomString(9);
  export let displayname: string;
  export let checked: boolean;
  export let error: string | null = null;
</script>

<div style="width: 100%;"> 
  <label for={id}>
    <input type="checkbox" id={id} name={id} bind:checked={checked}>
    <span class="cbx">
      <svg width="12px" height="11px" viewBox="0 0 12 11">
        <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
      </svg>
    </span>
    <p class="usn">{displayname}</p>
  </label>
</div>
{#if !!error}
  <p class="error usn">{error}</p>
{/if}

<style>
  *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  span {
    position: relative;
    display: block;
    float: left;
    width: 18px;
    height: 18px;
    margin-left: 6px;
    margin-top: 3px;
    border-radius: 4px;

    background-color: var(--thm-chkBox);
    background-image: linear-gradient(var(--thm-chkBoxTo), var(--thm-chkBox));
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.15);
    transition: all 0.15s ease;
    
    cursor: pointer;
  }
  svg {
    position: absolute;
    top: 3px;
    left: 3px;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: var(--thm-chkBoxStroke);
    stroke-width: 2;
    stroke-dasharray: 17;
    stroke-dashoffset: 17;
    transform: translate3d(0, 0, 0);
  }
  label {
    display: inline-block;
    cursor: pointer;
  }
  input {
    display: none;
    visibility: hidden;
  }
  input:checked + span {
    background-color: var(--thm-chkBox);
    background-image: linear-gradient(var(--thm-chkBoxSelTo), var(--thm-chkBoxSel));
  }
  input:checked + span svg {
    stroke-dashoffset: 0;
    transition: all 0.15s ease;
  }
  p {
    display: inline-block;
    margin-left: 6px;
    font-size: 16px;
    font-weight: 400;
  }

  .error{
    margin-top: 4px;
    color: red;
  }
</style>