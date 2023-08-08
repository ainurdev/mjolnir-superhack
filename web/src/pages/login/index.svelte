<script lang="ts">
  import { goto } from "@roxi/routify";
  import { onMount } from "svelte";
  import { quintOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import MetamaskIcon from "@/icons/Metamask.svelte";
  import { userStore } from "@/stores";

  import Logo from "../_components/Logo.svelte";
    import accounts from "src/store/accounts";

  let etherumInstalled: boolean = false,
    shouldConnectWallet: boolean = false;

  const continueViaMetamask = async () => {
    let wallets = await window.ethereum.request({ method: "eth_accounts" });
    if (!wallets || wallets.length === 0) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      wallets = await window.ethereum.request({ method: "eth_accounts" });

      if (!wallets || wallets.length === 0) {
        shouldConnectWallet = true;
        return;
      }
    }

    const chainId = await window.ethereum.request({ method: "eth_chainId" });

    if (wallets && wallets.length > 0 && chainId) {
      accounts.setWallet(wallets[0]);
      $goto("/home");
    } else {
      alert("Please connect your wallet to continue.");
    }
  };

  const requestAccounts = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    continueViaMetamask();
  };

  onMount(async () => {
    if (window.ethereum) {
      etherumInstalled = true;
      let wallets = await window.ethereum.request({ method: "eth_accounts" });

      if (
        wallets &&
        wallets.length > 0 &&
        $userStore.user &&
        $userStore.user.wallet === wallets[0]
      ) {
        $goto("/home");
      } else {
        $goto("/login");
      }
    }
  });
</script>

<div
  class="flex items-center justify-center px-5 flex-col relative overflow-hidden w-full h-[100dvh]"
>
  <div
    in:fly={{
      delay: 500,
      duration: 300,
      y: -20,
      opacity: 0.2,
      easing: quintOut,
    }}
    class="flex flex-col items-center justify-center"
  >
    <Logo />
    <h1 class="text-4xl text-white font-bold mt-8 text-center">
      Welcome to
      <span class="font-black text-primary-400">Mjolnir</span>
    </h1>
    <p class="mt-5 text-xl text-center max-w-xl text-zinc-200">
      This is your streaming platform that you can trust and earn all your
      profits
    </p>

    {#if etherumInstalled}
      {#if shouldConnectWallet}
        <button
          on:click={requestAccounts}
          class="rounded-3xl px-5 py-3 flex items-center gap-2 font-bold bg-primary-500 mt-14"
        >
          <span> Connect Wallet </span>
          <MetamaskIcon class="w-6 h-6 fill-white" />
        </button>
      {:else}
        <button
          on:click={continueViaMetamask}
          class="rounded-3xl px-5 py-3 flex items-center gap-2 font-bold bg-primary-500 mt-14"
        >
          <span> Continue via Metamask </span>
          <MetamaskIcon class="w-6 h-6 fill-white" />
        </button>
      {/if}
    {:else}
      <a
        href="https://metamask.io/download/"
        target="_blank"
        class="rounded-3xl px-5 py-3 flex items-center gap-2 font-bold bg-primary-500 mt-14"
      >
        <span> Install Metamask </span>
        <MetamaskIcon class="w-6 h-6 fill-white" />
      </a>
    {/if}
    <svg
      class="absolute -z-10 scale-[225] scale-x-[175]"
      id="bg-svg"
      viewBox="0 0 900 600"
    >
      <g transform="translate(445.7878723114449 324.06827144594604)">
        <path
          d="M172.1 -183.3C203.8 -140.5 196.9 -70.2 179.5 -17.4C162 35.4 134 70.7 102.4 98.5C70.7 126.4 35.4 146.7 -17.7 164.4C-70.7 182 -141.4 197.1 -169.6 169.3C-197.8 141.4 -183.4 70.7 -169.6 13.8C-155.8 -43.1 -142.6 -86.3 -114.4 -129.1C-86.3 -171.9 -43.1 -214.5 13.6 -228C70.2 -241.6 140.5 -226.1 172.1 -183.3"
          fill="#18181b"
          style="transition: all 0.3s ease 0s;"
        />
      </g>
    </svg>
  </div>
</div>

<style>
  @keyframes blob {
    from {
      transform: scaleX(1.25) scaleY(0.9);
    }
    to {
      transform: scaleX(0.9) scaleY(1.3);
    }
  }

  #bg-svg {
    animation: blob 8s ease-in-out infinite alternate;
  }
</style>
