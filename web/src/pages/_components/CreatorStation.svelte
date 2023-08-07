<script lang="ts">
  import { url } from "@roxi/routify";
  import type { stationType } from "@/types";
  import { DEFAULT_STATION } from "@/constants";

  import UserIcon from "@/icons/User.svelte";
  import ClockIcon from "@/icons/Clock.svelte";

  export let station: stationType = DEFAULT_STATION;
</script>

<a
  href={$url("/station/:uid", { uid: station.uid })}
  class="p-5 rounded-3xl bg-zinc-900 flex md:flex-row flex-col"
>
  <img
    class="w-40 aspect-video self-start rounded-xl sm:mr-4"
    src={station.cover}
    alt="station cover"
  />
  <div class="flex flex-col gap-1 mt-4 md:mt-0">
    <span class="text-sm font-bold hidden md:block"> Description </span>
    <p class="text-sm text-zinc-300 line-clamp-4">{station.description}</p>
    <div class="flex sm:flex-row flex-col sm:items-center sm:gap-10 gap-1">
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
  </div>
  <div
    class="flex flex-row md:mt-0 mt-7 md:flex-col items-center gap-3 md:ml-5"
  >
    <img
      class="w-12 h-12 rounded-full"
      src={station.avatar}
      alt="station avatar"
    />
    <div class="text-sm font-medium px-3">{station.name}</div>
    <a
      href={$url(`./edit?uid=${station.uid}`)}
      class="border border-primary-400 text-xs font-bold px-4 py-2 rounded-3xl"
    >
      Edit
    </a>
  </div>
</a>
