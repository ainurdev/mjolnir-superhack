<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { params } from '@roxi/routify';
  import StationForm from '../_components/StationForm.svelte';
  import { DEFAULT_STATION } from '@/constants';

  let stationCID: string;

  $: stationCID = $params.cid;
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
  <h2 class="text-3xl font-bold">Edit Station</h2>
  <StationForm state="edit" station={{ ...DEFAULT_STATION }} />
</div>
