import { Address } from '@graphprotocol/graph-ts';

import {
  SubscriptionCreated as SubscriptionCreatedEvent,
  Transfer as TransferEvent,
} from '../generated/Subscriptions/Subscriptions';
import { Subscription } from '../generated/schema';

export function handleSubscriptionCreated(
  event: SubscriptionCreatedEvent,
): void {
  const subscription = new Subscription(event.params.subscriptionId.toString());
  subscription.station = event.params.stationId.toString();
  subscription.owner = Address.fromString(
    '0x0000000000000000000000000000000000000000',
  );
  subscription.save();
}

export function handleTransfer(event: TransferEvent): void {
  const subscriptionId = event.params.tokenId.toString();
  const subscription = Subscription.load(subscriptionId);
  if (subscription === null) {
    throw new Error(
      `subscriptionId for handleTransfer is invalid: ${subscriptionId}`,
    );
  }
  subscription.owner = event.params.to;
  subscription.save();
}
