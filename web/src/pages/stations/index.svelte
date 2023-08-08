<script lang="ts">
  import { url } from "@roxi/routify";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { DEFAULT_STATION } from "@/constants";
  import type { Station } from "@/types";
  import PlusIcon from "@/icons/Plus.svelte";
  import CreatorStation from "../_components/CreatorStation.svelte";

  const stations: Station[] = new Array(2).fill(DEFAULT_STATION);
</script>

<div
  in:fly={{
    duration: 300,
    y: -20,
    opacity: 0.2,
    easing: quintOut,
  }}
  class="flex flex-col px-5 gap-5 mt-2 max-w-3xl mx-auto"
>
  <div class="flex justify-between items-center">
    <h2 class="text-xl sm:text-3xl font-bold">Your Stations</h2>
    <a
      class="text-sm font-bold flex items-center gap-1"
      href={$url("./create")}
    >
      <PlusIcon class="w-6 h-6" />
      <span class="text-xs sm:text-base"> New Station </span>
    </a>
  </div>
  <div class="flex flex-col gap-5">
    {#each stations as station}
      <CreatorStation {station} />
    {/each}
  </div>
</div>
