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
  <a class="flex items-center gap-5" href={$url("/home")}>
    <Logo />
    <h1 class="text-2xl text-primary-400 font-black">Mjolnir</h1>
  </a>
  <button
    on:click={onLogout}
    aria-label="log out"
    title="Log out"
    class="rounded-3xl bg-zinc-950 border-zinc-800 border px-4 py-2"
  >
    Log out
  </button>
</header>
