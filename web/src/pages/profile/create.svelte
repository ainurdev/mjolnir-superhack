<script>
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import StationForm from "../_components/StationForm.svelte";
</script>

<div
  in:fly={{
    duration: 300,
    y: -20,
    opacity: 0.2,
    easing: quintOut,
  }}
  class="flex flex-col max-w-3xl w-full mx-auto gap-5"
>
  <h2 class="text-3xl font-bold">Create New Station</h2>
  <p class="text-zinc-200">
    Create your very new station by uploading <span>cover</span> and
    <span>avatar</span>, choosing a <span>name</span> and
    <span>description</span> and set a price for <span> monthly fee</span>. this
    all you need.
  </p>
  <StationForm state="create" />
</div>

<style>
  span {
    @apply font-bold text-primary-400;
  }
</style>
