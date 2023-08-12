import { cacheExchange, createClient, fetchExchange, setContextClient } from '@urql/svelte';

const initGraphql = () => {
  const client = createClient({
    url: 'https://graph.ainur.dev/subgraphs/name/mjolnir-ethereum-goerli-test',
    exchanges: [cacheExchange, fetchExchange],
  });

  setContextClient(client);
};

export default initGraphql;
