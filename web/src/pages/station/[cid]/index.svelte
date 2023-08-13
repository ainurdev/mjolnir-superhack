<script lang="ts">
  import { params } from '@roxi/routify';
  import { quintOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import type { Station } from '@/types';
  import Player from '../../_components/Player.svelte';
  import LoadingSpinner from '../../_components/LoadingSpinner.svelte';
  import { createStationsStore } from '@/stores';
  import type { Readable } from 'svelte/store';
  import { fetchStationNFT } from '@/utils';

  type StatinStoreType = Readable<{
    data: {
      stations: Station[];
    };
    fetching: boolean;
    error: string;
  }>;

  let station: StatinStoreType, uri: string;

  let image: string, cover: string, name: string, description: string;

  const fetchStationGraph = async (stationCid: string) => {
    station = createStationsStore({
      where: {
        cid: stationCid,
      },
    }) as unknown as StatinStoreType;
  };

  const checkStationData = ($tmp: any) => {
    if ($station.fetching || $station.error || !$station.data.stations.length)
      return;

    const s = $station.data.stations[0];
    if (!s.streamCid) return;

    uri = `https://gettv-srs.testing.gettv.ainur.dev/files/live/${s.streamCid}.mpd`;
  };

  const loadStationNFT = async (cid: string) => {
    const data = await fetchStationNFT(cid);
    image = data.image;
    cover = data.cover;
    name = data.name;
    description = data.description;
  };

  $: loadStationNFT($params.cid);
  $: fetchStationGraph($params.cid);
  $: checkStationData($station.data);
</script>

{#if $station.fetching}
  <LoadingSpinner />
{:else if $station.error || !$station.data.stations.length}
  <p>{$station.error}</p>
{:else}
  <div
    in:fly={{
      duration: 300,
      y: -20,
      opacity: 0.2,
      easing: quintOut,
    }}
    class="flex flex-col items-center relative sm:px-20"
  >
    <img class="cover" src={cover} alt="cover" />
    <div class="aspect-video rounded-3xl mt-10 sm:mt-24 w-[90%]">
      <Player src={uri} />
    </div>
    <div
      class="flex w-full items-start justify-between px-5 sm:px-20 mt-10 self-start"
    >
      <div class="flex gap-5 md:flex-row flex-col">
        <img class="rounded-full w-24 h-24" src={image} alt="avatar" />
        <div class="flex flex-col">
          <h2 class="text-3xl font-black">
            {name}
          </h2>
          <p class="text-lg text-zinc-200 mt-2">
            {description}
          </p>
        </div>
      </div>
      <button
        class="bg-primary-500 shrink-0 text-sm rounded-3xl px-5 py-3 font-bold"
      >
        Subscribe ${$station.data.stations[0].monthlyFee}
      </button>
    </div>
  </div>
{/if}

<style>
  .cover {
    @apply absolute top-0 right-0 left-0 -z-10 h-72 object-cover w-full rounded-t-3xl;
    -webkit-mask-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(0, 0, 0, 1)),
      to(rgba(0, 0, 0, 0))
    );
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }
</style>
