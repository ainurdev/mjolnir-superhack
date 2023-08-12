import { Address, BigInt } from '@graphprotocol/graph-ts';
import {
  afterEach,
  assert,
  clearStore,
  describe,
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
  createStationCidUpdatedEvent,
  createStationCreatedEvent,
  createStationFeeUpdatedEvent,
  createTransferEvent,
} from './stations-utils';

class createStationResult {
  constructor(
    public stationId: BigInt,
    public owner: Address,
    public monthlyFee: BigInt,
    public cid: string,
  ) {}
}

function createStation(): createStationResult {
  const stationId = BigInt.fromI32(123);
  const monthlyFee = BigInt.fromI32(10);
  const cid = 'test cid';
  const stationCreatedEvent = createStationCreatedEvent(
    stationId,
    monthlyFee,
    cid,
  );
  const zeroAddress = Address.fromString(
    '0x0000000000000000000000000000000000000000',
  );
  const owner = Address.fromString(
    '0x0000000000000000000000000000000000000001',
  );
  const transferEvent = createTransferEvent(zeroAddress, owner, stationId);

  handleStationCreated(stationCreatedEvent);
  handleTransfer(transferEvent);

  return new createStationResult(stationId, owner, monthlyFee, cid);
}

describe('Station', function () {
  afterEach(function () {
    clearStore();
  });

  test('handleStationCreated', function () {
    const stationId = BigInt.fromI32(123);
    const monthlyFee = BigInt.fromI32(10);
    const cid = 'test cid';
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
    assert.fieldEquals('Station', stationId.toString(), 'cid', cid);
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'monthlyFee',
      monthlyFee.toString(),
    );
    assert.fieldEquals('Station', stationId.toString(), 'stream', 'null');
  });

  test('handleStationFeeUpdated', function () {
    const result = createStation();
    const stationId = result.stationId;
    const owner = result.owner;
    const cid = result.cid;
    const monthlyFee = result.monthlyFee;
    const newMonthlyFee = monthlyFee.times(BigInt.fromI32(2));
    const stationFeeUpdatedEvent = createStationFeeUpdatedEvent(
      stationId,
      newMonthlyFee,
    );
    handleStationFeeUpdated(stationFeeUpdatedEvent);

    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'owner',
      owner.toHexString(),
    );
    assert.fieldEquals('Station', stationId.toString(), 'cid', cid);
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'monthlyFee',
      newMonthlyFee.toString(),
    );
    assert.fieldEquals('Station', stationId.toString(), 'stream', 'null');
  });

  test('handleStationCidUpdated', function () {
    const result = createStation();
    const stationId = result.stationId;
    const owner = result.owner;
    const cid = result.cid;
    const monthlyFee = result.monthlyFee;
    const newCid = 'new ' + cid;
    const stationCidUpdatedEvent = createStationCidUpdatedEvent(
      stationId,
      newCid,
    );
    handleStationCidUpdated(stationCidUpdatedEvent);

    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'owner',
      owner.toHexString(),
    );
    assert.fieldEquals('Station', stationId.toString(), 'cid', newCid);
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'monthlyFee',
      monthlyFee.toString(),
    );
    assert.fieldEquals('Station', stationId.toString(), 'stream', 'null');
  });

  test('handlePublicStreamPublished', function () {
    const result = createStation();
    const stationId = result.stationId;
    const owner = result.owner;
    const cid = result.cid;
    const monthlyFee = result.monthlyFee;
    const streamCid = 'test stream';
    const streamId = `public-${streamCid}`;
    const publicStreamPublishedEvent = createPublicStreamPublishedEvent(
      stationId,
      streamCid,
    );
    handlePublicStreamPublished(publicStreamPublishedEvent);

    assert.entityCount('Stream', 1);
    assert.fieldEquals('Stream', streamId, 'cid', streamCid);
    assert.fieldEquals('Stream', streamId, 'isPrivate', 'false');
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'owner',
      owner.toHexString(),
    );
    assert.fieldEquals('Station', stationId.toString(), 'cid', cid);
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'monthlyFee',
      monthlyFee.toString(),
    );
    assert.fieldEquals('Station', stationId.toString(), 'stream', streamId);
  });

  test('handlePrivateStreamPublished', function () {
    const result = createStation();
    const stationId = result.stationId;
    const owner = result.owner;
    const cid = result.cid;
    const monthlyFee = result.monthlyFee;
    const streamCid = 'test stream';
    const streamId = `private-${streamCid}`;
    const privateStreamPublishedEvent = createPrivateStreamPublishedEvent(
      stationId,
      streamCid,
    );
    handlePrivateStreamPublished(privateStreamPublishedEvent);

    assert.entityCount('Stream', 1);
    assert.fieldEquals('Stream', streamId, 'cid', streamCid);
    assert.fieldEquals('Stream', streamId, 'isPrivate', 'true');
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'owner',
      owner.toHexString(),
    );
    assert.fieldEquals('Station', stationId.toString(), 'cid', cid);
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'monthlyFee',
      monthlyFee.toString(),
    );
    assert.fieldEquals('Station', stationId.toString(), 'stream', streamId);
  });

  test('handleTransfer', function () {
    const result = createStation();
    const stationId = result.stationId;
    const owner = result.owner;
    const cid = result.cid;
    const monthlyFee = result.monthlyFee;
    const newOwner = Address.fromString(
      '0x0000000000000000000000000000000000000002',
    );
    const transferEvent = createTransferEvent(owner, newOwner, stationId);
    handleTransfer(transferEvent);

    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'owner',
      newOwner.toHexString(),
    );
    assert.fieldEquals('Station', stationId.toString(), 'cid', cid);
    assert.fieldEquals(
      'Station',
      stationId.toString(),
      'monthlyFee',
      monthlyFee.toString(),
    );
    assert.fieldEquals('Station', stationId.toString(), 'stream', 'null');
  });
});
