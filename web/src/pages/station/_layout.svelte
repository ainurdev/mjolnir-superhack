<script>
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
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
