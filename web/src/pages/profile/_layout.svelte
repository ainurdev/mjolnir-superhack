<script>
  import { goto } from '@roxi/routify';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { accountStore } from '@/stores';

  $: {
    if (!$accountStore.isLoggedIn) {
      $goto('/login');
    }
  }
</script>

<div
  class="p-5"
  in:fly={{
    duration: 300,
    y: -20,
    opacity: 0.2,
    easing: quintOut,
  }}
>
  <slot />
</div>
