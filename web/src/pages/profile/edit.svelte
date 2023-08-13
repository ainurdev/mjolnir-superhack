<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { params } from '@roxi/routify';
  import StationForm from '../_components/StationForm.svelte';
  import { createStationsStore } from '@/stores';
  import type { StationStoreType, Station } from '@/types';
  import { fetchStationNFT } from '@/utils';
  import LoadingSpinner from '../_components/LoadingSpinner.svelte';

  let station: StationStoreType, s: Station;

  const fetchStationGraph = async (stationCid: string) => {
    station = createStationsStore(
      {
        where: {
          cid: stationCid,
        },
      },
      'network-only',
    ) as unknown as StationStoreType;
  };

  const checkStationData = _ => {
    if (
      $station.fetching ||
      $station.error ||
      $station.data.stations.length === 0
    )
      return;

    s = $station.data.stations[0];
    loadStationNFT(s.cid);
  };

  const loadStationNFT = async (cid: string) => {
    const data = await fetchStationNFT(cid);
    s.name = data.name;
    s.cover = data.cover;
    s.image = data.image;
    s.description = data.description;
  };

  $: fetchStationGraph($params.cid);
  $: checkStationData($station);
</script>

<div
  in:fly={{
    duration: 300,
    y: -20,
    opacity: 0.2,
    easing: quintOut,
  }}
  class="flex flex-col max-w-3xl w-full mx-auto gap-5"
>
  <h2 class="text-3xl font-bold">Edit Station</h2>

  {#if $station.fetching}
    <LoadingSpinner />
  {:else if $station.error}
    <p>{$station.error}</p>
  {:else}
    <StationForm state="edit" station={s} />
  {/if}
</div>
