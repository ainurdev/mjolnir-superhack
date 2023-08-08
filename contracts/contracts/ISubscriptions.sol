// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import {IStations} from "./IStations.sol";

interface ISubscriptions is IERC721, IERC721Metadata {
    event SubscriptionCreated(uint256 stationId, uint256 subscriptionId);

    function createSubscription(
        uint256 stataionId,
        address to,
        bytes calldata data
    ) external;

    function station(
        uint256 subscriptionId
    ) external view returns (uint256 stationId);

    function subscribers(
        uint256 stationId
    ) external view returns (uint256 number);

    function stationsContract() external view returns (IStations);
}
