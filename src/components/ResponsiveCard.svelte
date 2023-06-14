<script lang="ts">
</script>

<div>
  <slot/>
</div>

<style lang="postcss">
  div {
    @apply h-full w-full max-w-full mx-auto m-0 p-8 rounded-none bg-surface-100;
  }
  :global(.dark) div {
    @apply bg-surface-800;
  }
  @media (min-width: 768px) {
    div {
      @apply h-auto w-1/2 max-w-xl my-8 p-4 card;
    }
  }
</style>
