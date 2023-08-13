<script>
  import { page, goto } from '@roxi/routify';
  import Header from './_components/Header.svelte';
  import { onMount } from 'svelte';
  import { accountStore as account } from '@/stores';

  onMount(() => {
    if ($page.path !== '/index') return;
    if ($account?.wallet) {
      $goto('/home');
    } else {
      $goto('/login');
    }
  });
</script>

{#if $page.path !== '/index'}
  <div class="max-h-[100dvh] overflow-x-hidden">
    <div class="max-w-7xl w-full mx-auto pb-10">
      <Header />
      <slot />
    </div>
  </div>
{/if}
