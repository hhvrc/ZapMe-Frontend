<svelte:head>
  <title>ZapMe - Devices</title>
</svelte:head>

<div class="card responsive-card p-4">
  <div class="flex flex-row justify-between items-center">
    <h1>Devices</h1>
    <button class="btn-primary btn variant-filled-surface">Add</button>
  </div>
  <div class="flex flex-col gap-4 pt-4">
    <!-- Device card -->
    <div class="card flex flex-row overflow-hidden select-none">
      <img src="https://via.placeholder.com/64" alt="Device 1" class="w-16 h-16" />
      <div class="pl-1">
        <h2 class="text-2xl font-bold">Device 1</h2>
        <p class="text-sm">Status</p>
      </div>
    </div>
    <!-- Device card -->
    <div class="card flex flex-row overflow-hidden select-none">
      <img src="https://via.placeholder.com/64" alt="Device 2" class="w-16 h-16" />
      <div class="pl-1">
        <h2 class="text-2xl font-bold">Device 2</h2>
        <p class="text-sm">Status</p>
      </div>
    </div>
    <!-- Device card -->
    <div class="card flex flex-row overflow-hidden select-none">
      <img src="https://via.placeholder.com/64" alt="Device 3" class="w-16 h-16" />
      <div class="pl-1">
        <h2 class="text-2xl font-bold">Device 3</h2>
        <p class="text-sm">Status</p>
      </div>
    </div>
  </div>  
</div>
