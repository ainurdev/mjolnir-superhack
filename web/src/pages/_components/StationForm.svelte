<script lang="ts">
  import CameraIcon from "@/icons/Camera.svelte";

  export let state: "create" | "edit" = "create";

  let cover: string = "";
  let coverInput: HTMLInputElement;
  let coverInputFile: FileList;
  let fr = new FileReader();

  const onCoverUpload = () => {
    fr.onload = () => {
      if (typeof fr.result !== "string") return;
      cover = fr.result;
    };
    fr.readAsDataURL(coverInputFile[0]);
  };
</script>

<form>
  <div class="relative aspect-video w-full shrink-0 rounded-3xl">
    <input
      class="hidden rounded-3xl"
      bind:this={coverInput}
      bind:files={coverInputFile}
      type="file"
      accept=".jpg, .jpeg, .png"
      on:change={onCoverUpload}
      alt="cover"
    />

    <div
      class="bg-zinc-20/10 rounded-3xl dark:bg-zinc-90/10 absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center border border-light-outline dark:border-dark-outline"
    >
      <button
        class="duration-200 hover:scale-125 active:scale-110"
        on:click|preventDefault={() => coverInput.click()}
      >
        <CameraIcon
          class="w-12 rounded-full h-12 dark:bg-black dark:bg-opacity-60 p-2 dark:hover:bg-opacity-80 duration-150 stroke-1 bg-white bg-opacity-30 hover:bg-opacity-60"
        />
      </button>
    </div>
    {#key cover}
      <div
        class="group relative z-10 flex h-full w-full justify-center overflow-hidden rounded-3xl"
      >
        {#if cover}
          <img
            class="w-full object-cover h-full duration-500 ease-out will-change-transform group-hover:scale-105"
            src={cover}
            alt="Profile Cover"
          />
        {/if}
      </div>
    {/key}
  </div>
</form>
