<script lang="ts">
  import { url } from '@roxi/routify';
  import type { Station } from '@/types';
  import UserIcon from '@/icons/User.svelte';
  import ClockIcon from '@/icons/Clock.svelte';

  export let station: Station;
</script>

<a
  href={$url('/stream/:uid', { uid: station.uid })}
  class="w-full rounded-3xl bg-zinc-900"
>
  <div class="flex px-5 items-center gap-4 font-bold">
    <img
      src={station.avatar}
      class="rounded-full w-14 h-14 relative top-3 shadow-md"
      alt="Station Avatar"
    />
    <h4 class="line-clamp-1">{station.name}</h4>
  </div>
  <img class="w-full aspect-video" src={station.cover} alt="station cover" />
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
