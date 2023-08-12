import { Address, BigInt } from '@graphprotocol/graph-ts';
import {
  afterEach,
  assert,
  beforeAll,
  clearStore,
  describe,
  mockIpfsFile,
  test,
} from 'matchstick-as/assembly/index';

import {
  handlePrivateStreamPublished,
  handlePublicStreamPublished,
  handleStationCidUpdated,
  handleStationCreated,
  handleStationFeeUpdated,
  handleTransfer,
} from '../src/stations';

import {
  createPrivateStreamPublishedEvent,
  createPublicStreamPublishedEvent,
  createStation,
  createStationCidUpdatedEvent,
  createStationCreatedEvent,
  createStationFeeUpdatedEvent,
  createTransferEvent,
} from './stations-utils';

describe('Station', function () {
  beforeAll(function () {
    mockIpfsFile('station1_metadata', 'tests/ipfs/station1_metadata.json');
    mockIpfsFile('station2_metadata', 'tests/ipfs/station2_metadata.json');
  });

  afterEach(function () {
    clearStore();
  });

  test('handleStationCreated', function () {
    const stationId = BigInt.fromI32(123);
    const monthlyFee = BigInt.fromI32(10);
    const cid = 'station1_metadata';
    const stationCreatedEvent = createStationCreatedEvent(
      stationId,
      monthlyFee,
      cid,
    );
    handleStationCreated(stationCreatedEvent);

    assert.entityCount('Station', 1);
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'owner',
      '0x0000000000000000000000000000000000000000',
    );
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'monthlyFee',
      monthlyFee.toString(),
    );
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'name',
      'random station 1 name',
    );
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'description',
      'random station 1 description',
    );
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'image',
      'ipfs://randomimage1',
    );
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'cover',
      'ipfs://randomcover1',
    );
    assert.fieldEquals('Station', stationId.toString(), 'streamCid', 'null');
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'isStreamPrivate',
      'false',
    );
  });

  test('handleStationFeeUpdated', function () {
    const result = createStation();
    const stationId = result.stationId;
    const monthlyFee = result.monthlyFee;
    const newMonthlyFee = monthlyFee.times(BigInt.fromI32(2));
    const stationFeeUpdatedEvent = createStationFeeUpdatedEvent(
      stationId,
      newMonthlyFee,
    );
    handleStationFeeUpdated(stationFeeUpdatedEvent);

    assert.entityCount('Station', 1);
    assert.fieldEquals('Station', stationId.toString(), 'owner', result.owner);
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'monthlyFee',
      newMonthlyFee.toString(),
    );
    assert.fieldEquals('Station', stationId.toString(), 'name', result.name);
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'description',
      result.description,
    );
    assert.fieldEquals('Station', stationId.toString(), 'image', result.image);
    assert.fieldEquals('Station', stationId.toString(), 'cover', result.cover);
    assert.fieldEquals('Station', stationId.toString(), 'streamCid', 'null');
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'isStreamPrivate',
      'false',
    );
  });

  test('handleStationCidUpdated', function () {
    const result = createStation();
    const stationId = result.stationId;
    const monthlyFee = result.monthlyFee;
    const newCid = 'station2_metadata';
    const stationCidUpdatedEvent = createStationCidUpdatedEvent(
      stationId,
      newCid,
    );
    handleStationCidUpdated(stationCidUpdatedEvent);

    assert.entityCount('Station', 1);
    assert.fieldEquals('Station', stationId.toString(), 'owner', result.owner);
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'monthlyFee',
      monthlyFee.toString(),
    );
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'name',
      'random station 2 name',
    );
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'description',
      'random station 2 description',
    );
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'image',
      'ipfs://randomimage2',
    );
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'cover',
      'ipfs://randomcover2',
    );
    assert.fieldEquals('Station', stationId.toString(), 'streamCid', 'null');
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'isStreamPrivate',
      'false',
    );
  });

  test('handlePublicStreamPublished', function () {
    const result = createStation();
    const stationId = result.stationId;
    const monthlyFee = result.monthlyFee;
    const streamCid = 'test stream';
    const publicStreamPublishedEvent = createPublicStreamPublishedEvent(
      stationId,
      streamCid,
    );
    handlePublicStreamPublished(publicStreamPublishedEvent);

    assert.entityCount('Station', 1);
    assert.fieldEquals('Station', stationId.toString(), 'owner', result.owner);
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'monthlyFee',
      monthlyFee.toString(),
    );
    assert.fieldEquals('Station', stationId.toString(), 'name', result.name);
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'description',
      result.description,
    );
    assert.fieldEquals('Station', stationId.toString(), 'image', result.image);
    assert.fieldEquals('Station', stationId.toString(), 'cover', result.cover);
    assert.fieldEquals('Station', stationId.toString(), 'streamCid', streamCid);
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'isStreamPrivate',
      'false',
    );
  });

  test('handlePrivateStreamPublished', function () {
    const result = createStation();
    const stationId = result.stationId;
    const monthlyFee = result.monthlyFee;
    const streamCid = 'test stream';
    const privateStreamPublishedEvent = createPrivateStreamPublishedEvent(
      stationId,
      streamCid,
    );
    handlePrivateStreamPublished(privateStreamPublishedEvent);

    assert.entityCount('Station', 1);
    assert.fieldEquals('Station', stationId.toString(), 'owner', result.owner);
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'monthlyFee',
      monthlyFee.toString(),
    );
    assert.fieldEquals('Station', stationId.toString(), 'name', result.name);
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'description',
      result.description,
    );
    assert.fieldEquals('Station', stationId.toString(), 'image', result.image);
    assert.fieldEquals('Station', stationId.toString(), 'cover', result.cover);
    assert.fieldEquals('Station', stationId.toString(), 'streamCid', streamCid);
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'isStreamPrivate',
      'true',
    );
  });

  test('handleTransfer', function () {
    const result = createStation();
    const stationId = result.stationId;
    const owner = result.owner;
    const monthlyFee = result.monthlyFee;
    const newOwner = '0x0000000000000000000000000000000000000002';
    const transferEvent = createTransferEvent(
      Address.fromString(owner),
      Address.fromString(newOwner),
      stationId,
    );
    handleTransfer(transferEvent);

    assert.entityCount('Station', 1);
    assert.fieldEquals('Station', stationId.toString(), 'owner', newOwner);
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'monthlyFee',
      monthlyFee.toString(),
    );
    assert.fieldEquals('Station', stationId.toString(), 'name', result.name);
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'description',
      result.description,
    );
    assert.fieldEquals('Station', stationId.toString(), 'image', result.image);
    assert.fieldEquals('Station', stationId.toString(), 'cover', result.cover);
    assert.fieldEquals('Station', stationId.toString(), 'streamCid', 'null');
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'isStreamPrivate',
      'false',
    );
  });
});
