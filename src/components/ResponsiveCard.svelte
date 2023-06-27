<div class="card">
  <slot />
</div>

<style lang="postcss">
  div {
    height: 100%;
    width: 100%;
    max-width: 100%;
    margin: auto;
    padding: 2rem;
    border-radius: 0;
    @apply bg-surface-100;
  }
  :global(.dark) div {
    @apply bg-surface-800;
  }
  @media (min-width: 700px) {
    div {
      height: auto;
      width: 50%;
      max-width: 40rem;
      margin-top: 2rem;
      margin-bottom: 2rem;
      padding: 1rem;
      border-radius: 1rem;
    }
  }
</style>
