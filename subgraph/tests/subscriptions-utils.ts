import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts';
import { newMockEvent } from 'matchstick-as';

import {
  Approval,
  ApprovalForAll,
  SubscriptionCreated,
  Transfer,
} from '../generated/Subscriptions/Subscriptions';

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt,
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent());

  approvalEvent.parameters = new Array();

  approvalEvent.parameters.push(
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner)),
  );
  approvalEvent.parameters.push(
    new ethereum.EventParam('approved', ethereum.Value.fromAddress(approved)),
  );
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ),
  );

  return approvalEvent;
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean,
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent());

  approvalForAllEvent.parameters = new Array();

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner)),
  );
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam('operator', ethereum.Value.fromAddress(operator)),
  );
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam('approved', ethereum.Value.fromBoolean(approved)),
  );

  return approvalForAllEvent;
}

export function createSubscriptionCreatedEvent(
  stationId: BigInt,
  subscriptionId: BigInt,
): SubscriptionCreated {
  let subscriptionCreatedEvent = changetype<SubscriptionCreated>(
    newMockEvent(),
  );

  subscriptionCreatedEvent.parameters = new Array();

  subscriptionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      'stationId',
      ethereum.Value.fromUnsignedBigInt(stationId),
    ),
  );
  subscriptionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      'subscriptionId',
      ethereum.Value.fromUnsignedBigInt(subscriptionId),
    ),
  );

  return subscriptionCreatedEvent;
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt,
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent());

  transferEvent.parameters = new Array();

  transferEvent.parameters.push(
    new ethereum.EventParam('from', ethereum.Value.fromAddress(from)),
  );
  transferEvent.parameters.push(
    new ethereum.EventParam('to', ethereum.Value.fromAddress(to)),
  );
  transferEvent.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ),
  );

  return transferEvent;
}
