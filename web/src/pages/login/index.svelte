<script>
  import { goto } from "@roxi/routify";
  import { quintOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import Logo from "../_components/Logo.svelte";
  import MetamaskIcon from "@/icons/Metamask.svelte";

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
  class="flex items-center justify-center w-full h-screen flex-col"
>
  <Logo />
  <h1 class="text-4xl text-white font-bold mt-8">
    Welcome to
    <span class="font-black text-primary-400">Mjolnir</span>
  </h1>
  <p class="mt-5 text-xl text-center max-w-xl">
    This is your streaming platform that you can trust and earn all your profits
  </p>
  <button
    on:click={continueViaMetamask}
    class="rounded-3xl px-5 py-3 flex items-center gap-2 font-bold bg-primary-500 mt-14"
  >
    <span> Continue via Metamask </span>
    <MetamaskIcon class="w-6 h-6 fill-white" />
  </button>

  <svg
    class="absolute -z-10 scale-125 scale-x-150"
    viewBox="0 0 900 600"
    width="900"
    height="600"
  >
    <rect x="0" y="0" width="900" height="600" fill="#09090b" />
    <g transform="translate(445.7878723114449 324.06827144594604)">
      <path
        d="M172.1 -183.3C203.8 -140.5 196.9 -70.2 179.5 -17.4C162 35.4 134 70.7 102.4 98.5C70.7 126.4 35.4 146.7 -17.7 164.4C-70.7 182 -141.4 197.1 -169.6 169.3C-197.8 141.4 -183.4 70.7 -169.6 13.8C-155.8 -43.1 -142.6 -86.3 -114.4 -129.1C-86.3 -171.9 -43.1 -214.5 13.6 -228C70.2 -241.6 140.5 -226.1 172.1 -183.3"
        fill="#18181b"
        style="transition: all 0.3s ease 0s;"
      />
    </g>
  </svg>
</div>