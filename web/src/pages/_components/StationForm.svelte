<script lang="ts">
  import { NFTStorage, type CIDString } from 'nft.storage';
  import { Contract, ethers } from 'ethers';
  import { parseUnits } from 'ethers/utils';
  import StationsABI from '@mjolnir/contracts/artifacts/contracts/Stations.sol/Stations.json';
  import type * as StationsTypes from '@mjolnir/contracts/typechain-types/contracts/Stations';
  import type {
    NFTStorageStatus,
    Station,
    StationMetadata,
    StationStoreType,
  } from '@/types';
  import ImgUpload from './ImgUpload.svelte';
  import { accountStore } from '@/stores';
  import { registry } from '@/constants';

  export let state: 'create' | 'edit' = 'create';
  export let station: Station = {
    name: '',
    cover: '',
    image: '',
    description: '',
    isStreamPrivate: false,
    monthlyFee: 0.005,
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
    try {
      const metadata = await client.store(stationMetadata);

      await getStatus(metadata.ipnft);
      if (state === 'create') {
        await createStation(
          metadata.ipnft,
          parseUnits(monthlyFee.toString(), 'ether'),
        );
      } else {
        await updateStation(metadata.ipnft);
      }
    } catch (err) {
      error = err.message;
      isProcessing = false;
    }
  };

  const getImgBlob = async (img: string): Promise<Blob> => {
    return await fetch(img).then(r => r.blob());
  };

  const getStatus = async (cid: CIDString): Promise<NFTStorageStatus> =>
    await client.status(cid);

  const createStation = async (
    cid: string,
    monthlyFee: ethers.BigNumberish,
  ) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const stationContract: StationsTypes.Stations = new Contract(
      registry[$accountStore.chainId].stations,
      StationsABI.abi,
    ).connect(signer) as any;

    const tx = await stationContract.createStation(
      monthlyFee,
      cid,
      $accountStore.wallet,
      new Uint8Array(),
    );
    isProcessing = false;
    const receipt = await tx.wait(1);
    if (receipt.status === 0) {
      throw new Error('failed');
    }
  };

  const updateStation = async (cid: string) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const stationContract: StationsTypes.Stations = new Contract(
      registry[$accountStore.chainId].stations,
      StationsABI.abi,
    ).connect(signer) as any;

    const tx = await stationContract.updateStationCid(station.id, cid);
    isProcessing = false;
    const receipt = await tx.wait(1);
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
      {#if state === 'create'}
        <div class="flex flex-col gap-2 my-6">
          <span class="text-sm font-bold"
            >Monthly fee for subscribers (ETH)</span
          >
          <span class="text-sm">
            (Set to 0 (zero) if you want free subscription for your audience)
          </span>
          <input
            bind:value={station.monthlyFee}
            class="w-60"
            placeholder="0.005"
            type="text"
            name="monthly fee"
            id="monthly-fee"
          />
        </div>
      {/if}
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
