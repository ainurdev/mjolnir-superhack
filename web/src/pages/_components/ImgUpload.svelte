<script lang="ts">
  import CameraIcon from "@/icons/Camera.svelte";

  export let uploaded;
  export let type: "cover" | "avatar" = "cover";

  let input: HTMLInputElement;
  let inputFiles: FileList;

  const fileReader = new FileReader();

  const upload = () => {
    fileReader.onload = () => {
      if (typeof fileReader.result !== "string") return;
      uploaded = fileReader.result;
    };
    fileReader.readAsDataURL(inputFiles[0]);
  };
</script>

<div
  class="relative min-w-[100px] w-full shrink-0 {$$props.class} {type ===
  'cover'
    ? 'w-full rounded-3xl aspect-video '
    : 'rounded-full aspect-square'}"
>
  <input
    class="hidden rounded-3xl"
    bind:this={input}
    bind:files={inputFiles}
    type="file"
    accept=".jpg, .jpeg, .png"
    on:change={upload}
    alt="cover"
  />

  <div
    class="bg-zinc-90/10 absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center border border-zinc-700 {type ===
    'cover'
      ? 'rounded-3xl'
      : 'rounded-full'}"
  >
    <button
      class="duration-200 hover:scale-125 active:scale-110"
      on:click|preventDefault={() => input.click()}
    >
      <CameraIcon
        class="w-12 rounded-full h-12 bg-zinc-950 bg-opacity-60 p-2 dark:hover:bg-opacity-80 duration-150 stroke-1 hover:bg-opacity-60"
      />
    </button>
  </div>

  {#key uploaded}
    <div
      class="group relative z-10 flex h-full w-full justify-center overflow-hidden {type ===
      'cover'
        ? 'rounded-3xl'
        : 'rounded-full'}"
    >
      {#if uploaded}
        <img
          class="w-full object-cover h-full duration-500 ease-out will-change-transform group-hover:scale-105"
          src={uploaded}
          alt="Profile Cover"
        />
      {/if}
    </div>
  {/key}
</div>
