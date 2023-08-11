import { createClient } from '@urql/svelte';

export default createClient({
  url: 'https://graph.ainur.dev/subgraphs/name/example/graphql',
  fetchOptions: {},
  exchanges: [],
});
