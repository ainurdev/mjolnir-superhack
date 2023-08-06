<script lang="ts">
  import { url } from "@roxi/routify";
  import { DEFAULT_STATION } from "@/constants";
  import type { stationType } from "@/types";

  export let station: stationType = DEFAULT_STATION;
</script>

<a
  href={$url("/station/:uid", { uid: station.uid })}
  class="max-w-md w-72 rounded-3xl bg-zinc-900"
>
  <div class="flex px-5 items-center gap-4 font-bold">
    <img
      src={station.avatar_url}
      class="rounded-full w-14 h-14 relative top-3 shadow-md"
      alt="Station Avatar"
    />
    <h4 class="line-clamp-1">{station.name}</h4>
  </div>
  <img
    class="w-full aspect-video"
    src={station.cover_url}
    alt="station cover"
  />
  <div class="mx-5 my-4 flex flex-col">
    <p class="line-clamp-2">
      {station.description}
    </p>
    <span class="text-xs text-zinc-400 mt-2">
      Last stream {station.last_stream}
    </span>
    <span class="text-xs text-zinc-400 mt-1">
      {station.subscribers} subscribers
    </span>
  </div>
</a>
