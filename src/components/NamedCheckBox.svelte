<script lang="ts">
  import { GeneratePseudoRandomString } from "../utils/random";

  export let id: string = GeneratePseudoRandomString(9);
  export let displayname: string;
  export let checked: boolean;
  export let error: string | null = null;
</script>

<div> 
  <label for={id}>
    <input type="checkbox" id={id} name={id} bind:checked={checked}>
    <span class="cbx">
      <svg width="12px" height="11px" viewBox="0 0 12 11">
        <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
      </svg>
    </span>
    <p>{displayname}</p>
  </label>
</div>
{#if !!error}
  <p class="error">{error}</p>
{/if}

<style>
  *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  div {
    margin-top: 30px;
    
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
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

    background-color: #606062;
    background-image: linear-gradient(#474749, #606062);
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
    stroke: #fff;
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
    background-color: #606062;
    background-image: linear-gradient(#255cd2, #1d52c1);
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