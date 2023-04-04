<script lang="ts">
  export let exception: any;

  function isError(exception: any): exception is Error {
    return (
      exception.HasOwnProperty('cause') &&
      exception.HasOwnProperty('message') &&
      exception.HasOwnProperty('name') &&
      exception.HasOwnProperty('stack')
    );
  }
</script>

{#if isError(exception)}
  <div>
    <h1>Error: {exception.message}</h1>
  </div>
{:else}
  <div>
    <h1>Exception: {JSON.stringify(exception)}</h1>
  </div>
{/if}