<script>
  import { Router } from '@roxi/routify';
  import { routes } from '../.routify/routes';
  import initGraphql from './client';

  initGraphql();
</script>

<Router {routes} />
