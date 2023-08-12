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
  handleSubscriptionCreated,
  handleTransfer,
} from '../src/nft-subscriptions';

import { createStation } from './stations-utils';
import {
  createSubscriptionCreatedEvent,
  createTransferEvent,
} from './subscriptions-utils';

describe('Subscription', () => {
  beforeAll(function () {
    mockIpfsFile('station1_metadata', 'tests/ipfs/station1_metadata.json');
  });

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
