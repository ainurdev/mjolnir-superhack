<script>
  import { quintOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
</script>

<div
  in:fly={{
    duration: 300,
    y: -20,
    opacity: 0.2,
    easing: quintOut,
  }}
>
  <slot />
</div>
