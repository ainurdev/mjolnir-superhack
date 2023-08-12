<script>
  import { Router } from '@roxi/routify';
  import { routes } from '../.routify/routes';
  import initGraphql from './client';
  import { onMount } from 'svelte';

  onMount(() => {
    initGraphql();
  });
</script>

<Router {routes} />
