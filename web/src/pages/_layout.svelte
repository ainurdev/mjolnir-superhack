<script>
  import { page } from '@roxi/routify';
  import Header from './_components/Header.svelte';
</script>

<div class="max-h-[100dvh] overflow-x-hidden">
  <div class="max-w-7xl w-full mx-auto pb-10">
    {#if $page.path !== '/index'}
      <Header />
    {/if}
    <slot />
  </div>
</div>
