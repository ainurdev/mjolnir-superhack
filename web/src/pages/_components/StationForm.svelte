<script lang="ts">
  import ImgUpload from "./ImgUpload.svelte";
  import type { Station } from "@/types";

  export let state: "create" | "edit" = "create";
  export let station: Station = {
    name: "",
    cover: "",
    avatar: "",
    description: "",
    monthly_fee: 0,
  };
</script>

<form class="flex flex-col gap-5 mt-5" id="station">
  <ImgUpload bind:uploaded={station.cover} type="cover" />
  <div class="flex sm:flex-row flex-col gap-2">
    <ImgUpload
      class="!w-32 self-start"
      bind:uploaded={station.avatar}
      type="avatar"
    />
    <div class="flex flex-col gap-2 w-full">
      <input
        class="w-1/2"
        placeholder="Name"
        bind:value={station.name}
        type="text"
        name="name"
        id="name"
      />
      <textarea
        class="w-full min-h-[220px]"
        placeholder="Description"
        bind:value={station.description}
        name="description"
        id="description"
      />
      <div class="flex flex-col gap-2 mt-5">
        <span class="text-sm">
          Monthly fee for subscribers (Skip this step if you want free
          subscription for your audience)
        </span>
        <input
          bind:value={station.monthly_fee}
          class="w-60"
          placeholder="420 $"
          type="number"
          name="monthly fee"
          id="monthly-fee"
        />
      </div>
    </div>
  </div>

  <button
    class="px-5 py-3 rounded-3xl bg-primary-500 text-sm font-bold self-end"
    type="submit"
    form="station"
    value="Submit"
  >
    {state.toUpperCase()} Station
  </button>
</form>
