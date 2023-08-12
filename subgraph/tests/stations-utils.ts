import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts';
import { newMockEvent } from 'matchstick-as';

import {
  Approval,
  ApprovalForAll,
  PrivateStreamPublished,
  PublicStreamPublished,
  StationCidUpdated,
  StationCreated,
  StationFeeUpdated,
  Transfer,
} from '../generated/Stations/Stations';

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

export function createPrivateStreamPublishedEvent(
  stationId: BigInt,
  cid: string,
): PrivateStreamPublished {
  let privateStreamPublishedEvent = changetype<PrivateStreamPublished>(
    newMockEvent(),
  );

  privateStreamPublishedEvent.parameters = new Array();

  privateStreamPublishedEvent.parameters.push(
    new ethereum.EventParam(
      'stationId',
      ethereum.Value.fromUnsignedBigInt(stationId),
    ),
  );
  privateStreamPublishedEvent.parameters.push(
    new ethereum.EventParam('cid', ethereum.Value.fromString(cid)),
  );

  return privateStreamPublishedEvent;
}

export function createPublicStreamPublishedEvent(
  stationId: BigInt,
  cid: string,
): PublicStreamPublished {
  let publicStreamPublishedEvent = changetype<PublicStreamPublished>(
    newMockEvent(),
  );

  publicStreamPublishedEvent.parameters = new Array();

  publicStreamPublishedEvent.parameters.push(
    new ethereum.EventParam(
      'stationId',
      ethereum.Value.fromUnsignedBigInt(stationId),
    ),
  );
  publicStreamPublishedEvent.parameters.push(
    new ethereum.EventParam('cid', ethereum.Value.fromString(cid)),
  );

  return publicStreamPublishedEvent;
}

export function createStationCidUpdatedEvent(
  stationId: BigInt,
  cid: string,
): StationCidUpdated {
  let stationCidUpdatedEvent = changetype<StationCidUpdated>(newMockEvent());

  stationCidUpdatedEvent.parameters = new Array();

  stationCidUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      'stationId',
      ethereum.Value.fromUnsignedBigInt(stationId),
    ),
  );
  stationCidUpdatedEvent.parameters.push(
    new ethereum.EventParam('cid', ethereum.Value.fromString(cid)),
  );

  return stationCidUpdatedEvent;
}

export function createStationCreatedEvent(
  stationId: BigInt,
  monthlyFee: BigInt,
  cid: string,
): StationCreated {
  let stationCreatedEvent = changetype<StationCreated>(newMockEvent());

  stationCreatedEvent.parameters = new Array();

  stationCreatedEvent.parameters.push(
    new ethereum.EventParam(
      'stationId',
      ethereum.Value.fromUnsignedBigInt(stationId),
    ),
  );
  stationCreatedEvent.parameters.push(
    new ethereum.EventParam(
      'monthlyFee',
      ethereum.Value.fromUnsignedBigInt(monthlyFee),
    ),
  );
  stationCreatedEvent.parameters.push(
    new ethereum.EventParam('cid', ethereum.Value.fromString(cid)),
  );

  return stationCreatedEvent;
}

export function createStationFeeUpdatedEvent(
  stationId: BigInt,
  monthlyFee: BigInt,
): StationFeeUpdated {
  let stationFeeUpdatedEvent = changetype<StationFeeUpdated>(newMockEvent());

  stationFeeUpdatedEvent.parameters = new Array();

  stationFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      'stationId',
      ethereum.Value.fromUnsignedBigInt(stationId),
    ),
  );
  stationFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      'monthlyFee',
      ethereum.Value.fromUnsignedBigInt(monthlyFee),
    ),
  );

  return stationFeeUpdatedEvent;
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
