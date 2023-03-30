<script lang="ts">
  import type { ErrorDetails } from "$lib/api";

  export let error: ErrorDetails;
</script>


<div>
  <h1>{error.title}</h1>
  {#if error.detail} <h2>{error.detail}</h2> {/if}
  {#if error.traceId} <h3>{error.traceId}</h3> {/if}
  {#if error.suggestion} <h4>{error.suggestion}</h4> {/if}
  {#if error.notification} <h5>{error.notification}</h5> {/if}
  {#if error.fields}
    <h6>Fields:</h6>
    <ul>
      {#each Array.from(error.fields.entries, ([key, value]) => ({ key, value })) as field}
        <li>{field}</li>
      {/each}
    </ul>
  {/if}
</div>