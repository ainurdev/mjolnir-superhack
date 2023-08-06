<script lang="ts">
  import { url } from "@roxi/routify";
  import { DEFAULT_STATION } from "@/constants";
  import type { stationType } from "@/types";
  import UserIcon from "@/icons/User.svelte";
  import ClockIcon from "@/icons/Clock.svelte";

  const stations: stationType[] = new Array(2).fill(DEFAULT_STATION);
</script>

<div class="flex flex-col px-5 gap-5 mt-10 max-w-3xl mx-auto">
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold">Your Stations</h2>
    <a class="text-sm font-bold" href={$url("./create")}>Create New Station</a>
  </div>
  <div class="flex flex-col gap-5">
    {#each stations as station}
      <a
        href={$url("/station/:uid", { uid: station.uid })}
        class="p-5 rounded-3xl bg-zinc-900 flex"
      >
        <img
          class="w-40 aspect-video self-start rounded-xl"
          src={station.cover_url}
          alt="station cover"
        />
        <div class="flex flex-col gap-1 ml-5">
          <span class="text-sm font-bold">Description</span>
          <p class="text-sm text-zinc-300">{station.description}</p>
          <div class="flex items-center gap-10">
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
        <div class="flex flex-col items-center gap-3 ml-5">
          <img
            class="w-12 h-12 rounded-full"
            src={station.avatar_url}
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
    {/each}
  </div>
</div>
