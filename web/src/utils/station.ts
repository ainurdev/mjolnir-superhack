import type { StationMetadata } from "@/types";

export const fetchStationNFT = async (stationCid: string) => {
  const response = await fetch(
    `https://${stationCid}.ipfs.nftstorage.link/metadata.json`,
  );
  const data: StationMetadata = await response.json();
  data.image = (data.image as unknown as string)
    .replace('ipfs://', '')
    .replace('/blob', '') as unknown as Blob;
  data.properties.cover = (data.properties.cover as unknown as string)
    .replace('ipfs://', '')
    .replace('/blob', '') as unknown as Blob;

  const name = data.name;
  const description = data.description;
  const image = `https://${data.image}.ipfs.nftstorage.link/blob`;
  const cover = `https://${data.properties.cover}.ipfs.nftstorage.link/blob`;

  return {
    name,
    description,
    image,
    cover,
  };
};
