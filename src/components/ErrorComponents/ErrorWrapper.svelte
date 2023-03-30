<script lang="ts">
  import type { Response } from "$lib/axiosSingleton";
  import { ExceptionDetails, NetworkErrorDetails, ServerErrorDetails, UnknownErrorDetails } from "$components/ErrorComponents";
  import LoadingWidget from "$components/LoadingWidget.svelte";

  type T = $$Generic;

  export let request: () => Promise<Response<T>>;
  export let data: T;
</script>

{#await request()}
  <slot name="loading">
    <LoadingWidget />
  </slot>
{:then response}
  {#if response.code == 'ok'}
    {() => data = response.data}
    <slot>
      <h1>Missing default slot</h1>
    </slot>
  {:else if response.code == 'err_server'}
    <ServerErrorDetails error={response} />
  {:else if response.code == 'err_network'}
    <NetworkErrorDetails />
  {:else}
    <UnknownErrorDetails />
  {/if}
{:catch exception}
  <ExceptionDetails {exception} />
{/await}

<style>
</style>