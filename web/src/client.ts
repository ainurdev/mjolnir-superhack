import { cacheExchange, createClient, fetchExchange, setContextClient } from '@urql/svelte';

const initGraphql = () => {
  const client = createClient({
    url: 'https://graphnode.ainur.dev/subgraphs/name/mjolnir-ethereum-goerli',
    exchanges: [cacheExchange, fetchExchange],
  });

  setContextClient(client);
};

export default initGraphql;
