import { gql } from '@urql/svelte';

export const getStations = gql`
  query ($where: Station_filter) {
    stations(where: $where) {
      id
      owner
    }
  }
`;

export const getStationMetadata = async cid => {
  const response = await fetch(`https://ipfs.io/ipfs/${cid}/metadata.json`);
  const data = await response.json();
  return data;
};

export const getImage = async cid => {
  const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
  const data = await response.blob();
  return data;
};
