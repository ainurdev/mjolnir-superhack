import {
  SubscriptionCreated as SubscriptionCreatedEvent,
  Transfer as TransferEvent,
} from '../generated/Subscriptions/Subscriptions';
import { NFTSubscription } from '../generated/schema';

export function handleSubscriptionCreated(
  event: SubscriptionCreatedEvent,
): void {
  const subscription = new NFTSubscription(
    event.params.subscriptionId.toString(),
  );
  subscription.station = event.params.stationId.toString();
  subscription.owner = '0x0000000000000000000000000000000000000000';
  subscription.save();
}

export function handleTransfer(event: TransferEvent): void {
  const subscriptionId = event.params.tokenId.toString();
  const subscription = NFTSubscription.load(subscriptionId);
  if (subscription === null) {
    throw new Error(
      `subscriptionId for handleTransfer is invalid: ${subscriptionId}`,
    );
  }
  subscription.owner = event.params.to.toHexString();
  subscription.save();
}
