<script lang="ts">
  import { NFTStorage, type CIDString } from 'nft.storage';
  import { Contract, ethers } from 'ethers';
  import StationsABI from '@mjolnir/contracts/artifacts/contracts/Stations.sol/Stations.json';
  import type * as StationsTypes from '@mjolnir/contracts/typechain-types/contracts/Stations';
  import type { NFTStorageStatus, Station, StationMetadata } from '@/types';
  import ImgUpload from './ImgUpload.svelte';
  import { accountStore } from '@/stores';
  import { registry } from '@/constants';

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

  let isProcessing: boolean = false,
    error: string = '';

  const NFT_Storage_KEY = import.meta.env.VITE_NFT_STORAGE_API_KEY;
  const client = new NFTStorage({ token: NFT_Storage_KEY });

  const submitStation = async () => {
    const { name, cover, image, description, monthlyFee } = station;

    error = '';
    if (!name || !cover || !image || !description) {
      error = 'Please fill all fields';
      return;
    }

    const stationMetadata: StationMetadata = {
      name,
      description,
      image: await getImgBlob(image),
      properties: {
        cover: await getImgBlob(cover),
      },
    };

    isProcessing = true;
    const metadata = await client.store(stationMetadata);

    await getStatus(metadata.ipnft);
    await createStation(metadata.ipnft, monthlyFee, $accountStore.wallet);
    isProcessing = false;
  };

  const getImgBlob = async (img: string): Promise<Blob> => {
    return await fetch(img).then(r => r.blob());
  };

  const getStatus = async (cid: CIDString): Promise<NFTStorageStatus> =>
    await client.status(cid);

  const createStation = async (
    cid: string,
    monthlyFee: ethers.BigNumberish,
    owner: string,
  ) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const station: StationsTypes.Stations = new Contract(
      registry.goerli.stations,
      StationsABI.abi,
    ).connect(signer) as any;

    const tx = await station.createStation(
      monthlyFee,
      cid,
      owner,
      new Uint8Array(),
    );
    const receipt = await tx.wait(3);
    if (receipt.status === 0) {
      throw new Error('failed');
    }
  };
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
          Monthly fee for subscribers (Set to 0 (zero) if you want free
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

  {#if error}
    <div class="bg-red-300 border-red-500 border px-4 py-2 rounded-lg my-2">
      <p>{error}</p>
    </div>
  {/if}

  <button
    class="px-5 py-3 rounded-3xl text-sm font-bold self-end {isProcessing
      ? 'bg-primary-900'
      : 'bg-primary-500'}"
    type="submit"
    form="station"
    value="Submit"
    disabled={isProcessing}
  >
    {isProcessing
      ? `${state === 'create' ? 'Creating' : 'Updating'} Station...`
      : `${state === 'create' ? 'Create' : 'Update'} Station`}
  </button>
</form>
