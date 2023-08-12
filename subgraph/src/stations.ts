import { JSONValueKind, ipfs, json, log } from '@graphprotocol/graph-ts';

import {
  PrivateStreamPublished as PrivateStreamPublishedEvent,
  PublicStreamPublished as PublicStreamPublishedEvent,
  StationCidUpdated as StationCidUpdatedEvent,
  StationCreated as StationCreatedEvent,
  StationFeeUpdated as StationFeeUpdatedEvent,
  Transfer as TransferEvent,
} from '../generated/Stations/Stations';
import { Station } from '../generated/schema';

function fillMetaData(station: Station, cid: string): void {
  station.name = null;
  station.description = null;
  station.image = null;
  station.cover = null;
  station.streamCid = null;
  station.isStreamPrivate = false;

  const data = ipfs.cat(cid);
  if (data === null) {
    log.error(`could not get cid of ${cid} for stationId of ${station.id}`, []);
    return;
  }
  const result = json.try_fromBytes(data);
  if (result.isError || result.value.kind !== JSONValueKind.OBJECT) {
    log.error(`could parse json for cid of ${cid}`, []);
    return;
  }
  const value = result.value.toObject();

  const name = value.get('name');
  if (name !== null && !name.isNull() && name.kind === JSONValueKind.STRING) {
    station.name = name.toString();
  }

  const description = value.get('description');
  if (
    description !== null &&
    !description.isNull() &&
    description.kind === JSONValueKind.STRING
  ) {
    station.description = description.toString();
  }

  const image = value.get('image');
  if (
    image !== null &&
    !image.isNull() &&
    image.kind === JSONValueKind.STRING
  ) {
    station.image = image.toString();
  }

  const properties = value.get('properties');
  if (properties === null || properties.kind !== JSONValueKind.OBJECT) {
    return;
  }

  const cover = properties.toObject().get('cover');
  if (
    cover !== null &&
    !cover.isNull() &&
    cover.kind === JSONValueKind.STRING
  ) {
    station.cover = cover.toString();
  }
}

export function handleStationCreated(event: StationCreatedEvent): void {
  const stationId = event.params.stationId.toString();
  const station = new Station(stationId);
  station.owner = '0x0000000000000000000000000000000000000000';
  station.monthlyFee = event.params.monthlyFee;
  fillMetaData(station, event.params.cid);
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
  fillMetaData(station, event.params.cid);
  station.save();
}

export function handlePublicStreamPublished(
  event: PublicStreamPublishedEvent,
): void {
  const stationId = event.params.stationId.toString();
  const station = Station.load(stationId);
  if (station === null) {
    throw new Error(
      `stationId for PublicStreamPublished is invalid: ${stationId}`,
    );
  }
  station.streamCid = event.params.cid;
  station.isStreamPrivate = false;
  station.save();
}

export function handlePrivateStreamPublished(
  event: PrivateStreamPublishedEvent,
): void {
  const stationId = event.params.stationId.toString();
  const station = Station.load(stationId);
  if (station === null) {
    throw new Error(
      `stationId for PublicStreamPublished is invalid: ${stationId}`,
    );
  }
  station.streamCid = event.params.cid;
  station.isStreamPrivate = true;
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
