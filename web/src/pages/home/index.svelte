<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  import StationCard from '../_components/StationCard.svelte';
  import LoadingSpinner from '../_components/LoadingSpinner.svelte';
  import { onMount } from 'svelte';
  import { request } from '@/utils';
  import type { Station } from '@/types';

  let stations: Station[] = [];
  let loading = true;

  const getStations = async () => {
    const response: any = await request(
      'https://faas-ams3-2a2df116.doserverless.co/api/v1/web/fn-f5594546-71c3-4ce7-846b-9101362b017d/mjolnir/stations',
      {
        method: 'GET',
        ignoreBaseUrl: true,
      },
    );

    if (response && response.stations) {
      stations = response.stations;
    }
  };

  onMount(async () => {
    await getStations();
    loading = false;
  });
</script>

{#if loading}
  <LoadingSpinner />
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
    {#each [...stations, ...stations] as station}
      <StationCard {station} />
    {/each}
  </div>
{/if}
