<script lang="ts">
  export let exception: any;
</script>

{#if Object.hasOwn(exception, 'cause')}
  <div>
    <h1>Error: {exception.cause}</h1>
  </div>
{:else if Object.hasOwn(exception, 'message')}
  <div>
    <h1>Exception: {exception.message}</h1>
  </div>
{:else}
  <div>
    <h1>Unknown exception</h1>
  </div>
{/if}