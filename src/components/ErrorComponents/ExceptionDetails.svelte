<script lang="ts">
  export let exception: any;
</script>

{#if exception instanceof Error}
  <div>
    <h1>Error: {exception.message}</h1>
  </div>
{:else}
  <div>
    <h1>Exception: {JSON.stringify(exception)}</h1>
  </div>
{/if}