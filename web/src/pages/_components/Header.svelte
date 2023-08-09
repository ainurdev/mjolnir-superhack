<script lang="ts">
  import { onMount } from 'svelte';
  import { goto, url } from '@roxi/routify';
  import { quintOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import Logo from './Logo.svelte';
  import accounts from '../../store/accounts';

  let isLoggedIn: boolean = false;

  const checkMetamaskLogin = async () => {
    if (!window.ethereum) {
      return;
    }

    const wallets = await window.ethereum.request({ method: 'eth_accounts' });
    isLoggedIn = wallets.length > 0;

    window.ethereum.on('accountsChanged', (wallets: string[]) => {
      isLoggedIn = wallets.length > 0;
      if (!isLoggedIn) {
        accounts.removeWallet();
        $goto('/login');
        return;
      }

      accounts.setWallet(wallets[0]);
    });
  };

  onMount(() => {
    checkMetamaskLogin();
  });
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
  <a class="flex items-center gap-2" href={$url('/home')}>
    <Logo class="scale-50" />
    <h1 class="text-xl text-primary-400 font-black">Mjolnir</h1>
  </a>
  <div class="flex items-center gap-2">
    <a
      href={$url('/stations')}
      class="sm:px-4 px-3 py-2 font-bold text-xs sm:text-sm rounded-3xl bg-primary-500"
    >
      Your Stations
    </a>
    {#if isLoggedIn}
      <span
        title="You can change your account or disconnect in Metamask"
        class="rounded-3xl text-xs sm:text-sm font-bold bg-zinc-950 border-zinc-800 border sm:px-4 px-3 py-2"
      >
        Connected to Metamask
      </span>
    {:else}
      <a
        href={$url('/login')}
        class="rounded-3xl text-xs sm:text-sm font-bold bg-zinc-950 border-zinc-800 border sm:px-4 px-3 py-2"
      >
        Log in
      </a>
    {/if}
  </div>
</header>
