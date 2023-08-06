<script>
  import { goto } from "@roxi/routify";
  import { quintOut } from "svelte/easing";
  import { fly } from "svelte/transition";

  const continueViaMetamask = () => {
    $goto("/home");
  };
</script>

<div
  in:fly={{
    duration: 300,
    y: -10,
    opacity: 0.5,
    easing: quintOut,
  }}
  class="flex items-center mt-20 flex-col"
>
  <h1 class="text-4xl text-white">
    Welcome to
    <span class="font-bold text-blue-400">Mjolnir</span>
  </h1>
  <p class="mt-5 text-xl text-center">
    This is your streaming platform that you can trust and earn all your profits
  </p>
  <button
    on:click={continueViaMetamask}
    class="rounded-3xl px-5 py-3 font-medium bg-orange-500 mt-14"
  >
    Continue via Metamask
  </button>
</div>
