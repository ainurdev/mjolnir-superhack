<script lang="ts">
  import type { Readable } from 'svelte/store';
  import { Contract, ethers } from 'ethers';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { v4 as uuidv4 } from 'uuid';
  import StationsABI from '@mjolnir/contracts/artifacts/contracts/Stations.sol/Stations.json';
  import type * as StationsTypes from '@mjolnir/contracts/typechain-types/contracts/Stations';

  import { params } from '@roxi/routify';
  import { createStationsStore } from '@/stores';
  import type { Station } from '@/types';
  import { fetchStationNFT } from '@/utils';
  import LoadingSpinner from '../../_components/LoadingSpinner.svelte';
  import { registry } from '@/constants';

  type StationStoreType = Readable<{
    data: {
      stations: Station[];
    };
    fetching: boolean;
    error: string;
  }>;

  let station: StationStoreType, streamCid: string;

  let image: string, cover: string, name: string, description: string;

  const fetchStationGraph = async (stationCid: string) => {
    station = createStationsStore({
      where: {
        cid: stationCid,
      },
    }) as unknown as StationStoreType;
  };

  const checkStationData = ($tmp: any) => {
    if ($station.fetching || $station.error || !$station.data.stations.length)
      return;

    const s = $station.data.stations[0];
    if (s.streamCid) {
      streamCid = s.streamCid;
    } else {
      streamCid = uuidv4();
      createStreamCid(s.id, streamCid);
    }
  };

  const loadStationNFT = async (cid: string) => {
    const data = await fetchStationNFT(cid);
    image = data.image;
    cover = data.cover;
    name = data.name;
    description = data.description;
  };

  const createStreamCid = async (
    stationId: ethers.BigNumberish,
    streamCid: string,
  ) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const station: StationsTypes.Stations = new Contract(
      registry.goerli.stations,
      StationsABI.abi,
    ).connect(signer) as any;

    const tx = await station.publishPublicStream(stationId, streamCid);
    const receipt = await tx.wait(3);
    if (receipt.status === 0) {
      throw new Error('failed');
    }
  };

  $: fetchStationGraph($params.cid);
  $: checkStationData($station);
  $: loadStationNFT($params.cid);
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
    class="flex flex-col items-center relative sm:px-20 min-h-screen"
  >
    <img class="cover" src={cover} alt="cover" />
    <div
      class="rounded-3xl mt-10 p-10 sm:mt-24 w-[90%] bg-zinc-950 flex flex-col gap-4"
    >
      <h1 class="text-white text-xl font-bold">Start streaming</h1>
      <p class="text-sm text-red-300 mb-4">
        Do <b>NOT</b> share this information. Before starting your stream click
        on
        <b>"View Station"</b>.
      </p>
      <form on:submit|preventDefault>
        <div class="mb-4 flex flex-col gap-2">
          <label for="" class="text-gray-300 text-sm"> Stream Server: </label>
          <input
            type="text"
            readonly
            class="py-2 px-4 rounded-3xl text-gray-100"
            value="rtmp://gettv-srs.testing.gettv.ainur.dev/live"
          />
        </div>
        <div class="mb-4 flex flex-col gap-2">
          <label for="" class="text-gray-300 text-sm"> Stream Key: </label>
          <input
            type="text"
            readonly
            class="py-2 px-4 rounded-3xl text-gray-100"
            value={streamCid}
          />
        </div>
      </form>
    </div>
    <div
      class="flex w-full items-center justify-between px-5 sm:px-20 mt-10 self-start"
    >
      <div class="flex gap-5 flex-1 md:flex-row flex-col">
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
      <div class="flex">
        <a
          href={`/station/${$params.cid}`}
          class="rounded-3xl text-white font-bold border border-blue-500 hover:bg-blue-500 text-lg py-2 px-6"
        >
          View Station
        </a>
      </div>
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
