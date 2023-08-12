import { Address } from '@graphprotocol/graph-ts';

import {
  PrivateStreamPublished as PrivateStreamPublishedEvent,
  PublicStreamPublished as PublicStreamPublishedEvent,
  StationCidUpdated as StationCidUpdatedEvent,
  StationCreated as StationCreatedEvent,
  StationFeeUpdated as StationFeeUpdatedEvent,
  Transfer as TransferEvent,
} from '../generated/Stations/Stations';
import { Station, Stream } from '../generated/schema';

export function handleStationCreated(event: StationCreatedEvent): void {
  const station = new Station(event.params.stationId.toString());
  station.owner = '0x0000000000000000000000000000000000000000';
  station.monthlyFee = event.params.monthlyFee;
  station.cid = event.params.cid;
  station.stream = null;
  station.save();
}

export function handleStationFeeUpdated(event: StationFeeUpdatedEvent): void {
  const stationId = event.params.stationId.toString();
  const station = Station.load(stationId);
  if (station === null) {
    throw new Error(`stationId for StationFeeUpdated is invalid: ${stationId}`);
  }
  station.monthlyFee = event.params.monthlyFee;
  station.save();
}

export function handleStationCidUpdated(event: StationCidUpdatedEvent): void {
  const stationId = event.params.stationId.toString();
  const station = Station.load(stationId);
  if (station === null) {
    throw new Error(`stationId for StationCidUpdated is invalid: ${stationId}`);
  }
  station.cid = event.params.cid;
  station.save();
}

export function handlePublicStreamPublished(
  event: PublicStreamPublishedEvent,
): void {
  const streamCid = event.params.cid;
  const streamId = `public-${streamCid}`;
  const stream = new Stream(streamId);
  stream.isPrivate = false;
  stream.cid = streamCid;

  const stationId = event.params.stationId.toString();
  const station = Station.load(stationId);
  if (station === null) {
    throw new Error(
      `stationId for PublicStreamPublished is invalid: ${stationId}`,
    );
  }
  station.stream = streamId;

  stream.save();
  station.save();
}

export function handlePrivateStreamPublished(
  event: PrivateStreamPublishedEvent,
): void {
  const streamCid = event.params.cid;
  const streamId = `private-${streamCid}`;
  let stream = new Stream(streamId);
  stream.isPrivate = true;
  stream.cid = streamCid;

  const stationId = event.params.stationId.toString();
  const station = Station.load(stationId);
  if (station === null) {
    throw new Error(
      `stationId for PrivateStreamPublished is invalid: ${stationId}`,
    );
  }
  station.stream = streamId;

  stream.save();
  station.save();
}

export function handleTransfer(event: TransferEvent): void {
  const stationId = event.params.tokenId.toString();
  const station = Station.load(stationId);
  if (station === null) {
    throw new Error(`stationId for handleTransfer is invalid: ${stationId}`);
  }
  station.owner = event.params.to.toHexString();
  station.save();
}
