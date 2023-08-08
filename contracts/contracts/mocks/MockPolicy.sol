// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IPolicy} from "../interfaces/IPolicy.sol";

contract MockPolicy is IPolicy {
    function createSubscriptionPrice(
        uint256 stationSubscribers
    ) external pure override returns (uint256) {
        return 1e9 + stationSubscribers * 1e9;
    }
}
