<script lang="ts">
  import Plyr from 'plyr';
  import dash from 'dashjs';

  import { onDestroy, onMount } from 'svelte';

  export let src: string;

  let videoPlayer: HTMLVideoElement;
  let plyrInstance: Plyr;

  onMount(async () => {
    plyrInstance = await new Plyr(videoPlayer, {
      controls: ['play', 'current-time', 'mute', 'volume', 'fullscreen'],
      keyboard: { focused: true, global: true },
      invertTime: false,
    });

    let dashPlayer = dash.MediaPlayer().create();
    dashPlayer.initialize(videoPlayer, src, true);
  });

  onDestroy(() => {
    plyrInstance.destroy();
  });
</script>

<div class="rounded-3xl overflow-hidden">
  <video
    playsinline
    bind:this={videoPlayer}
    controls
    class="rounded-3xl h-full"
  >
    <source {src} />
    <track kind="captions" />
  </video>
</div>
