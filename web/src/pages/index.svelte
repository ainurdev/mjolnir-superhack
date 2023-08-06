<script>
  import { onMount } from "svelte";
  import { goto } from "@roxi/routify";

  onMount(() => {
    $goto("/login");
  });
</script>
