<script>
  import { spring } from 'svelte/motion';

  let coords = spring(
    { x: 50, y: 50 },
    {
      stiffness: 0.01,
      damping: 0.01,
    }
  );

  let size = spring(10);
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg
  on:mousemove={(e) => coords.set({ x: e.clientX, y: e.clientY })}
  on:mousedown={() => size.set(30)}
  on:mouseup={() => size.set(10)}
>
  <circle cx={$coords.x} cy={$coords.y} r={$size} />
</svg>

<style>
  svg {
    width: 100%;
    height: 100%;
    margin: -8px;
  }
  circle {
    fill: #ff3e00;
  }
</style>
