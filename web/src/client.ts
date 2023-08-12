import { createClient, setContextClient } from '@urql/svelte';

const initGraphql = () => {
  const client = createClient({
    url: 'https://graph.ainur.dev/subgraphs/name/example/graphql',
    fetchOptions: {},
    exchanges: [],
  });

  setContextClient(client);
};

export default initGraphql;
