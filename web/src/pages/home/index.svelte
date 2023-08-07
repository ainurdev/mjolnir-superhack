<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  import StationCard from '../_components/StationCard.svelte';
  import { onMount } from 'svelte';
  import { request } from '@/utils';
  import type { Station } from '@/types';


  let stations: Station[] = [];

  const getStations = async () => {
    const response: any = await request('https://faas-ams3-2a2df116.doserverless.co/api/v1/web/fn-f5594546-71c3-4ce7-846b-9101362b017d/mjolnir/stations', {
      method: 'GET',
      ignoreBaseUrl: true,
    });

    if (response && response.stations) {
      stations = response.stations;
    }
  }

  onMount(async () => {
    await getStations();
  });
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
    {#each stations as station}
      <StationCard station={station} />
    {/each}
  </div>
</div>
