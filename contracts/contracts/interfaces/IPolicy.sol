// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IPolicy {
    function createSubscriptionPrice(
        uint256 stationSubscribers
    ) external view returns (uint256);
}
