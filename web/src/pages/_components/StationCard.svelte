<script lang="ts">
  import { url } from '@roxi/routify';
  import type { Station } from '@/types';
  import UserIcon from '@/icons/User.svelte';
  import ClockIcon from '@/icons/Clock.svelte';
  import { fetchStationNFT } from '@/utils';

  export let station: Station;
  let image: string, cover: string, name: string, description: string;

  const loadStationNFT = async (cid: string) => {
    const data = await fetchStationNFT(cid);
    image = data.image;
    cover = data.cover;
    name = data.name;
    description = data.description;
  };

  $: loadStationNFT(station.cid);
</script>

<a
  href={$url('/station/:cid', { cid: station.cid })}
  class="w-full rounded-3xl bg-zinc-900"
>
  <div class="flex px-5 items-center gap-4 font-bold">
    <img
      src={image}
      class="rounded-full w-14 h-14 relative top-3 shadow-md"
      alt="Station Avatar"
    />
    <h4 class="line-clamp-1">{name}</h4>
  </div>
  <img class="w-full aspect-video" src={cover} alt="station cover" />
  <div class="mx-5 my-4 flex flex-col">
    <p class="line-clamp-2">
      {description}
    </p>
    <div class="flex items-center gap-1 mt-2">
      <ClockIcon class="w-4 h-4 fill-zinc-300" />
      <span class="text-xs text-zinc-400">
        Last stream {'never'}
      </span>
    </div>
    <div class="flex items-center gap-1 mt-1">
      <UserIcon class="w-4 h-4 fill-zinc-300" />
      <span class="text-xs text-zinc-400">
        {'1'} subscriber
      </span>
    </div>
  </div>
</a>
