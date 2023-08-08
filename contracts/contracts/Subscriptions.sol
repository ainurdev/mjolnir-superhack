// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ISubscriptions} from "./ISubscriptions.sol";
import {IStations} from "./IStations.sol";

contract Subscriptions is ISubscriptions, ERC721("MjolnirSubscription", "MSB") {
    IStations private immutable _STATIONS_CONTRACT;
    mapping(uint256 subscriptionId => uint256 stationId) public station;
    mapping(uint256 stationId => uint256 number) public subscribers;

    constructor(IStations stationsContract_) {
        _STATIONS_CONTRACT = stationsContract_;
    }

    function createSubscription(
        uint256 stationId,
        address to,
        bytes calldata data
    ) external override {
        uint256 number = subscribers[stationId];
        uint256 subscriptionId = uint256(
            keccak256(abi.encode([stationId, number]))
        );
        _safeMint({tokenId: subscriptionId, to: to, data: data});
        subscribers[stationId] = number + 1;
        emit SubscriptionCreated(stationId, subscriptionId);
    }

    function stationsContract() external view override returns (IStations) {
        return _STATIONS_CONTRACT;
    }
}
