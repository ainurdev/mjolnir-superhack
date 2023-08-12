<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  import StationCard from '../_components/StationCard.svelte';
  import { createStationsStore } from '@/stores';

  const stations = createStationsStore();

  $: console.log($stations);
</script>

<div
  in:fly={{
    duration: 300,
    y: -20,
    opacity: 0.2,
    easing: quintOut,
  }}
  class="flex flex-col items-center"
>
  <div class="flex flex-wrap justify-center gap-5 mb-5">
    {#if $stations.fetching}
      <p>Loading</p>
    {:else if $stations.error}
      <p>Oh no... {$stations.error.message}</p>
    {:else}
      {#each $stations.data.stations as station}
        <StationCard {station} />
      {/each}
    {/if}
  </div>
</div>
