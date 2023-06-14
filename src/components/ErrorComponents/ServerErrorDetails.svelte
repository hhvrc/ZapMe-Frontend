<script lang="ts">
  import type { ApiErrorResponse } from '$types';
  import { getReasonPhrase } from 'http-status-codes';

  export let error: ApiErrorResponse;
  const { status, apiCode, details } = error;

  let showCat = false;

  $: code = details?.code ?? getReasonPhrase(status);
</script>

{#if details}
  <div>
    <h1>{details.code}</h1>
    {#if details.detail} <h2>{details.detail}</h2> {/if}
    {#if details.suggestion} <h4>{details.suggestion}</h4> {/if}
    {#if details.notification} <h5>{details.notification}</h5> {/if}
    {#if details.fields && Object.keys(details.fields).length > 0}
      <h6>Fields:</h6>
      <ul>
        {#each Array.from(Object.entries(details.fields)) as field}
          <li>{field[0]}: {field[1]}</li>
        {/each}
      </ul>
    {/if}
  </div>
{:else}
  <div class="http-status">
    {#if showCat}
      <img src="https://http.cat/{status}" alt="{status} {code}" />
    {:else}
      <h1>{status}</h1>
      <h4>{code}</h4>
      <h2>{apiCode}</h2>
    {/if}
    <button on:click={() => (showCat = !showCat)}>
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
