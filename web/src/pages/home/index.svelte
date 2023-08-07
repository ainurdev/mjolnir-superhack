<script>
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  import StationCard from "../_components/StationCard.svelte";
  
</script>

<div
  in:fly={{
    duration: 300,
    y: -20,
    opacity: 0.2,
    easing: quintOut,
  }}
  class="flex flex-col items-center"
>
  <div class="flex flex-wrap justify-center gap-5 mb-5">
    {#each new Array(12) as _}
      <StationCard />
    {/each}
  </div>
</div>
