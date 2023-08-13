<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import LoadingSpinner from '../_components/LoadingSpinner.svelte';
  import StationCard from '../_components/StationCard.svelte';
  import { createStationsStore } from '@/stores';

  const stations = createStationsStore();
</script>

{#if $stations.fetching}
  <LoadingSpinner />
{:else if $stations.error}
  <p>Oh no... {$stations.error.message}</p>
{:else}
  <div
    in:fly={{
      duration: 300,
      y: -20,
      opacity: 0.2,
      easing: quintOut,
    }}
    style="grid-template-columns: repeat(auto-fill, minmax(370px, 1fr));"
    class="grid max-w-[1950px] grid-flow-row place-items-start items-start justify-start gap-5 p-5"
  >
    {#each $stations.data.stations as station}
      <StationCard {station} />
    {/each}
  </div>
{/if}
