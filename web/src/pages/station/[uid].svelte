<script lang="ts">
  import { params } from "@roxi/routify";
  import { quintOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import { DEFAULT_STATION } from "@/constants";

  $: stationUID = $params.uid;
  $: station = DEFAULT_STATION;
</script>

{#key stationUID}
  <div
    in:fly={{
      duration: 300,
      y: -20,
      opacity: 0.2,
      easing: quintOut,
    }}
    class="flex flex-col items-center relative"
  >
    <img class="cover" src={station.cover_url} alt="cover" />
    <div class="w-[90%] aspect-video rounded-3xl bg-zinc-800 mt-24 px-5" />
    <div class="flex w-full items-start justify-between px-20 mt-10 self-start">
      <div class="flex gap-5">
        <img
          class="rounded-full w-24 h-24"
          src={station.avatar_url}
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
      <button class="bg-primary-400 shrink-0 rounded-3xl px-5 py-3 font-bold">
        Subscribe ${station.monthly_fee}
      </button>
    </div>
  </div>
{/key}

<style>
  .cover {
    @apply absolute top-0 right-0 left-0 -z-10 h-72 object-cover w-full;
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
