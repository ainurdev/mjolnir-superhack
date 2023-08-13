<script lang="ts">
  import { goto, params } from '@roxi/routify';
  import type { Readable } from 'svelte/store';
  import { quintOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import { Contract, ethers } from 'ethers';
  import { formatUnits } from 'ethers/utils';
  import SubscriptionsABI from '@mjolnir/contracts/artifacts/contracts/Subscriptions.sol/Subscriptions.json';
  import type * as SubscriptionTypes from '@mjolnir/contracts/typechain-types/contracts/Subscriptions';
  import type { Station, StationStoreType } from '@/types';
  import Player from '../../_components/Player.svelte';
  import LoadingSpinner from '../../_components/LoadingSpinner.svelte';
  import { accountStore, createStationsStore } from '@/stores';
  import { fetchStationNFT } from '@/utils';
  import { registry } from '@/constants';

  let station: StationStoreType,
    uri: string,
    image: string,
    cover: string,
    name: string,
    description: string,
    isOwner: boolean,
    isSubscribing: boolean,
    isSubscribed: boolean;

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
    isOwner = s.owner === $accountStore.wallet;

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

  const handleSubscribe = async () => {
    if (!$accountStore.wallet) {
      $goto('/login');
      return;
    }

    if ($station.fetching || $station.error || !$station.data.stations.length)
      return;

    const s = $station.data.stations[0];
    if (s.owner === $accountStore.wallet) {
      isOwner = true;
      return;
    }

    isSubscribing = true;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const subscription: SubscriptionTypes.Subscriptions = new Contract(
        registry.goerli.subscriptions,
        SubscriptionsABI.abi,
      ).connect(signer) as any;
      debugger;
      const tx = await subscription.createSubscription(
        s.id,
        $accountStore.wallet,
        new Uint8Array(),
      );
      isSubscribing = false;
      isSubscribed = true;
      const receipt = await tx.wait(0);
      if (receipt.status === 0) {
        throw new Error('failed');
      }
    } catch (err) {
      isSubscribed = false;
      isSubscribing = false;
    }
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
      {#if isOwner || isSubscribed}
        <span
          class="bg-primary-200 text-primary-800 shrink-0 text-sm rounded-2xl px-5 py-3 font-bold"
        >
          Subscribed
        </span>
      {:else}
        <button
          class="{isSubscribing
            ? 'bg-primary-300'
            : 'bg-primary-500'} hover:bg-primary-700 shrink-0 text-sm rounded-3xl px-5 py-3 font-bold"
          disabled={isSubscribing}
          on:click|preventDefault={handleSubscribe}
        >
          {isSubscribing
            ? 'Processing...'
            : `Subscribe ${formatUnits(
                $station.data.stations[0].monthlyFee,
                18,
              )}`}
        </button>
      {/if}
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
