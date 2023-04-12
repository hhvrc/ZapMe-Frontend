<script lang="ts">
  import { GeneratePseudoRandomString } from "$lib/utils/random";

  export let id: string = GeneratePseudoRandomString(9);
  export let checked: boolean;
  export let disabled: boolean = false;
</script>

<div class="usn">
  <label for={id}>
    <input type="checkbox" id={id} name={id} style="display:none" bind:checked={checked} {disabled}>
    <span>
      <svg viewBox="0 0 12 11">
        <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
      </svg>
    </span>
  </label>
  <p><slot/></p>
</div>

<style>
  div {
    width: 100%;
  }
  label {
    display: inline-block;
    cursor: pointer;
    margin: 0;
  }
  p {
    display: inline-block;
    margin: 0;
    font-size: 16px;
    font-weight: 400;
  }
  label * {
    display: inline-block;
    vertical-align: middle;
  }
  span {
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 4px;

    background-color: var(--thm-chkBox);
    background-image: linear-gradient(var(--thm-chkBoxTo), var(--thm-chkBox));
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.15);
    transition: all 0.15s ease;
  }

  svg {
    position: absolute;
    width: 12px;
    height: 11px;
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
  input:checked + span {
    background-color: var(--thm-chkBox);
    background-image: linear-gradient(var(--thm-chkBoxSelTo), var(--thm-chkBoxSel));
  }
  input:checked + span svg {
    stroke-dashoffset: 0;
    transition: all 0.15s ease;
  }
</style>