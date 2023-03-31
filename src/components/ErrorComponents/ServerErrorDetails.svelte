<script lang="ts">
  import type { RespServerError } from "$lib/axiosSingleton";
  import { getReasonPhrase } from "http-status-codes";

  export let error: RespServerError;
  let { status, details } = error;

  let showCat = false;

  $: title = details?.title ?? getReasonPhrase(status);
</script>

{#if details}
  <div>
    <h1>{details.title}</h1>
    {#if details.detail} <h2>{details.detail}</h2> {/if}
    {#if details.traceId} <h3>{details.traceId}</h3> {/if}
    {#if details.suggestion} <h4>{details.suggestion}</h4> {/if}
    {#if details.notification} <h5>{details.notification}</h5> {/if}
    {#if details.fields}
      <h6>Fields:</h6>
      <ul>
        {#each Array.from(details.fields.entries, ([key, value]) => ({ key, value })) as field}
          <li>{field}</li>
        {/each}
      </ul>
    {/if}
  </div>
{:else}
  <div class="http-status">
    {#if showCat}
      <img src="https://http.cat/{status}" alt="{status} {title}" />
    {:else}
      <h1>{status}</h1>
      <h4>{title}</h4>
    {/if}
    <button on:click={() => showCat = !showCat}>
      {showCat ? 'Hide' : 'Show'} funny cat
    </button>
  </div>
{/if}

<style>
  .http-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .http-status button {
    font-size: 1em;
    padding: 0.5rem;
    cursor: pointer;
  }
</style>