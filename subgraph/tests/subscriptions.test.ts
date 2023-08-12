import { Address, BigInt } from '@graphprotocol/graph-ts';
import {
  afterEach,
  assert,
  clearStore,
  describe,
  test,
} from 'matchstick-as/assembly/index';

import {
  handleSubscriptionCreated,
  handleTransfer,
} from '../src/nft-subscriptions';
import {
  handleStationCreated,
  handleTransfer as handleStationTransfer,
} from '../src/stations';

import {
  createStationCreatedEvent,
  createTransferEvent as createStationTransferEvent,
} from './stations-utils';
import {
  createSubscriptionCreatedEvent,
  createTransferEvent,
} from './subscriptions-utils';

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
  const transferEvent = createStationTransferEvent(
    zeroAddress,
    owner,
    stationId,
  );

  handleStationCreated(stationCreatedEvent);
  handleStationTransfer(transferEvent);

  return new createStationResult(stationId, owner, monthlyFee, cid);
}

describe('Subscription', () => {
  afterEach(function () {
    clearStore();
  });

  test('handleSubscriptionCreated', function () {
    const result = createStation();
    const stationId = result.stationId;
    const subscriptionId = BigInt.fromI32(420);
    const subscriptionCreatedEvent = createSubscriptionCreatedEvent(
      stationId,
      subscriptionId,
    );
    handleSubscriptionCreated(subscriptionCreatedEvent);

    assert.entityCount('NFTSubscription', 1);
    assert.fieldEquals(
      'NFTSubscription',
      subscriptionId.toString(),
      'station',
      stationId.toString(),
    );
    assert.fieldEquals(
      'NFTSubscription',
      subscriptionId.toString(),
      'owner',
      '0x0000000000000000000000000000000000000000',
    );
  });

  test('handleTransfer', function () {
    const result = createStation();
    const stationId = result.stationId;
    const subscriptionId = BigInt.fromI32(420);
    const subscriptionCreatedEvent = createSubscriptionCreatedEvent(
      stationId,
      subscriptionId,
    );
    handleSubscriptionCreated(subscriptionCreatedEvent);

    const zeroAddress = Address.fromString(
      '0x0000000000000000000000000000000000000000',
    );
    const subscriberAddress = Address.fromString(
      '0x0000000000000000000000000000000000000003',
    );
    const transferEvent = createTransferEvent(
      zeroAddress,
      subscriberAddress,
      subscriptionId,
    );
    handleTransfer(transferEvent);

    assert.entityCount('NFTSubscription', 1);
    assert.fieldEquals(
      'NFTSubscription',
      subscriptionId.toString(),
      'station',
      stationId.toString(),
    );
    assert.fieldEquals(
      'NFTSubscription',
      subscriptionId.toString(),
      'owner',
      subscriberAddress.toHexString(),
    );
  });
});
