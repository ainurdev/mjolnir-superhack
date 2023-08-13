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
  href={$url('/stream/:cid', { cid: station.cid })}
  class="p-5 rounded-3xl bg-zinc-900 flex md:flex-row flex-col"
>
  <div class="flex-1 flex">
    <img
      class="w-40 aspect-video self-start rounded-xl sm:mr-4"
      src={cover}
      alt="station cover"
    />
    <div class="flex flex-col gap-1 mt-4 md:mt-0">
      <span class="text-sm font-bold hidden md:block"> {name} </span>
      <p class="text-sm text-zinc-300 line-clamp-4">{description}</p>
      <div class="flex sm:flex-row flex-col sm:items-center sm:gap-10 gap-1">
        <div class="flex items-center gap-1 mt-2">
          <ClockIcon class="w-4 h-4 fill-zinc-300" />
          <span class="text-xs text-zinc-400">
            Last stream {'never'}
          </span>
        </div>
        <div class="flex items-center gap-1 mt-1">
          <UserIcon class="w-4 h-4 fill-zinc-300" />
          <span class="text-xs text-zinc-400">
            {'1'} subscribers
          </span>
        </div>
      </div>
    </div>
  </div>
  <div
    class="flex flex-row md:mt-0 mt-7 md:flex-col items-center gap-3 md:ml-5"
  >
    <img class="w-12 h-12 rounded-full" src={image} alt="station avatar" />
    <a
      href={$url(`./edit?cid=${station.cid}`)}
      class="border border-primary-400 text-xs font-bold px-4 py-2 rounded-3xl"
    >
      Edit
    </a>
  </div>
</a>
