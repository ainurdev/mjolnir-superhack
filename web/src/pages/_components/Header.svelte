<script>
  import { goto, url } from "@roxi/routify";
  import { quintOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import Logo from "./Logo.svelte";

  const onLogout = () => {
    $goto("/login");
  };
</script>

<header
  transition:fly={{
    duration: 500,
    y: -100,
    opacity: 0.5,
    easing: quintOut,
  }}
  class="w-full z-50 flex justify-between items-center py-3 sticky bg-zinc-950 shadow-lg top-0 px-5 mx-auto"
>
  <a class="flex items-center gap-2" href={$url("/home")}>
    <Logo class="scale-50" />
    <h1 class="text-xl text-primary-400 font-black">Mjolnir</h1>
  </a>
  <div class="flex items-center gap-2">
    <a
      href={$url("/stations")}
      class="sm:px-4 px-3 py-2 font-bold text-xs sm:text-sm rounded-3xl bg-primary-500"
    >
      Your Stations
    </a>
    <button
      on:click={onLogout}
      aria-label="log out"
      title="Log out"
      class="rounded-3xl text-xs sm:text-sm font-bold bg-zinc-950 border-zinc-800 border sm:px-4 px-3 py-2"
    >
      Log out
    </button>
  </div>
</header>
