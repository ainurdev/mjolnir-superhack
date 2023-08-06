<script>
  import Header from "./_components/Header.svelte";
</script>

<div class="max-h-[100dvh] overflow-x-hidden">
  <div class="max-w-7xl w-full mx-auto pb-10">
    <Header />
    <slot />
  </div>
</div>
