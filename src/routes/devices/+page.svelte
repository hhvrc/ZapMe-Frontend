<svelte:head>
  <title>ZapMe - Devices</title>
</svelte:head>

<div class="responsive-card card p-4">
  <div class="flex flex-row items-center justify-between">
    <h1>Devices</h1>
    <button class="btn-primary btn variant-filled-surface">Add</button>
  </div>
  <hr class="my-2" />
  <p>You have no devices yet.</p>
  <div class="flex flex-col gap-4 pt-4">
    <!-- Device card -->
    <div class="card card-hover flex select-none flex-row overflow-hidden">
      <img src="https://via.placeholder.com/64" alt="Device 1" class="h-16 w-16" />
      <div class="pl-1">
        <h2 class="text-2xl font-bold">Device 1</h2>
        <p class="text-sm">Status</p>
      </div>
    </div>
    <!-- Device card -->
    <div class="card card-hover flex select-none flex-row overflow-hidden">
      <img src="https://via.placeholder.com/64" alt="Device 2" class="h-16 w-16" />
      <div class="pl-1">
        <h2 class="text-2xl font-bold">Device 2</h2>
        <p class="text-sm">Status</p>
      </div>
    </div>
    <!-- Device card -->
    <div class="card card-hover flex select-none flex-row overflow-hidden">
      <img src="https://via.placeholder.com/64" alt="Device 3" class="h-16 w-16" />
      <div class="pl-1">
        <h2 class="text-2xl font-bold">Device 3</h2>
        <p class="text-sm">Status</p>
      </div>
    </div>
  </div>
</div>
