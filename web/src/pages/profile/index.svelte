<script lang="ts">
  import { url } from '@roxi/routify';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import PlusIcon from '@/icons/Plus.svelte';
  import CreatorStation from '../_components/CreatorStation.svelte';
  import { accountStore, createStationsStore } from '@/stores';

  const stations = createStationsStore(
    {
      where: {
        owner: $accountStore.wallet,
      },
    },
    'cache-and-network',
  );

  const refetchStations = _ => {
    createStationsStore(
      {
        where: {
          owner: $accountStore.wallet,
        },
      },
      'network-only',
    );
  };

  $: refetchStations($accountStore.wallet);
</script>

<div
  in:fly={{
    duration: 300,
    y: -20,
    opacity: 0.2,
    easing: quintOut,
  }}
  class="flex flex-col px-5 gap-5 mt-2 max-w-3xl mx-auto"
>
  <div class="flex justify-between items-center">
    <h2 class="text-xl sm:text-3xl font-bold">Your Stations</h2>
    <a
      class="text-sm font-bold flex items-center gap-1"
      href={$url('./create')}
    >
      <PlusIcon class="w-6 h-6" />
      <span class="text-xs sm:text-base"> New Station </span>
    </a>
  </div>
  <div class="flex flex-col gap-5">
    {#if $stations.fetching}
      <p>Loading</p>
    {:else if $stations.error}
      <p>Oh no... {$stations.error.message}</p>
    {:else if $stations.data.stations.length === 0}
      <p class="text-lg text-gray-400">
        You don't have any stations yet. Use <b>"New Station"</b> to create your
        first station and start streaming.
      </p>
    {:else}
      {#each $stations.data.stations as station}
        <CreatorStation {station} />
      {/each}
    {/if}
  </div>
</div>
