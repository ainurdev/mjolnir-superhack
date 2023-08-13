<script lang="ts">
  import { url } from '@roxi/routify';
  import type { Station } from '@/types';
  import UserIcon from '@/icons/User.svelte';
  import ClockIcon from '@/icons/Clock.svelte';
  import { DEFAULT_STATION } from '@/constants';

  let station: Station = DEFAULT_STATION;
  let free = false;
</script>

<a
  href={$url('/station/:cid', { cid: station.cid })}
  class="max-w-md w-72 rounded-3xl bg-zinc-900"
>
  <div class="flex px-5 items-center gap-4 font-bold">
    <img
      src={station.avatar}
      class="rounded-full w-14 h-14 relative top-3 shadow-md"
      alt="Station Avatar"
    />
    <h4 class="line-clamp-1">{station.name}</h4>
  </div>
  <div class="w-full relative aspect-video">
    <img class="w-full h-full" src={station.cover} alt="station cover" />
    {#if !free}
      <div
        class="absolute right-2 top-2 text-xs bg-primary-800 p-1 rounded-md font-bold"
      >
        420 $
      </div>
    {/if}
  </div>
  <div class="mx-5 my-4 flex flex-col">
    <p class="line-clamp-2">
      {station.description}
    </p>
    <div class="flex items-center gap-1 mt-2">
      <ClockIcon class="w-4 h-4 fill-zinc-300" />
      <span class="text-xs text-zinc-400">
        Last stream {station.last_stream}
      </span>
    </div>
    <div class="flex items-center gap-1 mt-1">
      <UserIcon class="w-4 h-4 fill-zinc-300" />
      <span class="text-xs text-zinc-400">
        {station.subscribers} subscribers
      </span>
    </div>
  </div>
</a>
