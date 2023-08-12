<script lang="ts">
  import { params } from '@roxi/routify';
  import { quintOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { request } from '@/utils';
  import type { Station } from '@/types';
  import Player from '../_components/Player.svelte';

  let station: Station, stationCID: string;
  let uri: string;

  const getStation = async () => {
    const response: any = await request(
      `https://faas-ams3-2a2df116.doserverless.co/api/v1/web/fn-f5594546-71c3-4ce7-846b-9101362b017d/mjolnir/stations?uid=${stationCID}`,
      {
        method: 'GET',
        ignoreBaseUrl: true,
      },
    );

    if (response && response.stations) {
      station = response.stations[0];
    }
  };

  onMount(async () => {
    await getStation();
  });

  $: stationCID = $params.cid;
</script>

{#if station}
  {#key station}
    <div
      in:fly={{
        duration: 300,
        y: -20,
        opacity: 0.2,
        easing: quintOut,
      }}
      class="flex flex-col items-center relative sm:px-20"
    >
      <img class="cover" src={station.cover} alt="cover" />
      <div class="aspect-video rounded-3xl mt-10 sm:mt-24 w-[90%]">
        {#if uri}
          <Player src={uri} />
        {/if}
      </div>
      <div
        class="flex w-full items-start justify-between px-5 sm:px-20 mt-10 self-start"
      >
        <div class="flex gap-5 md:flex-row flex-col">
          <img
            class="rounded-full w-24 h-24"
            src={station.image}
            alt="avatar"
          />
          <div class="flex flex-col">
            <h2 class="text-3xl font-black">
              {station.name}
            </h2>
            <p class="text-lg text-zinc-200 mt-2">
              {station.description}
            </p>
          </div>
        </div>
        <button
          class="bg-primary-500 shrink-0 text-sm rounded-3xl px-5 py-3 font-bold"
        >
          Subscribe ${station.monthlyFee}
        </button>
      </div>
    </div>
  {/key}
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
