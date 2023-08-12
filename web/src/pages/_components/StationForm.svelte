<script lang="ts">
  import { NFTStorage, type CIDString } from 'nft.storage';
  import ImgUpload from './ImgUpload.svelte';
  import type { NFTStorageStatus, Station, StationMetadata } from '@/types';

  export let state: 'create' | 'edit' = 'create';
  export let station: Station = {
    owner: '',
    name: '',
    cover: '',
    image: '',
    description: '',
    isStreamPrivate: false,
    monthlyFee: 0,
  };

  const NFT_Storage_KEY = import.meta.env.VITE_NFT_STORAGE_API_KEY;
  const client = new NFTStorage({ token: NFT_Storage_KEY });

  const submitStation = async () => {
    const { name, cover, image, description, monthlyFee } = station;
    const stationMetadata: StationMetadata = {
      name,
      description,
      image: await getImgBlob(image),
      properties: {
        cover: await getImgBlob(cover),
      },
    };

    const metadata = await client.store(stationMetadata);
    await getStatus(metadata.ipnft);
  };

  const getImgBlob = async (img: string): Promise<Blob> => {
    return await fetch(img).then(r => r.blob());
  };

  const getStatus = async (cid: CIDString): Promise<NFTStorageStatus> =>
    await client.status(cid);
</script>

<form
  on:submit|preventDefault={submitStation}
  class="flex flex-col gap-5 mt-5"
  id="station"
>
  <ImgUpload bind:uploaded={station.cover} type="cover" />
  <div class="flex sm:flex-row flex-col gap-2">
    <ImgUpload
      class="!w-32 self-start"
      bind:uploaded={station.image}
      type="avatar"
    />
    <div class="flex flex-col gap-2 w-full">
      <input
        class="w-1/2"
        placeholder="Name"
        bind:value={station.name}
        type="text"
        name="name"
        id="name"
      />
      <textarea
        class="w-full min-h-[220px]"
        placeholder="Description"
        bind:value={station.description}
        name="description"
        id="description"
      />
      <div class="flex flex-col gap-2 mt-5">
        <span class="text-sm">
          Monthly fee for subscribers (Skip this step if you want free
          subscription for your audience)
        </span>
        <input
          bind:value={station.monthlyFee}
          class="w-60"
          placeholder="420 $"
          type="number"
          name="monthly fee"
          id="monthly-fee"
        />
      </div>
    </div>
  </div>

  <button
    class="px-5 py-3 rounded-3xl bg-primary-500 text-sm font-bold self-end"
    type="submit"
    form="station"
    value="Submit"
  >
    {state.toUpperCase()} Station
  </button>
</form>
