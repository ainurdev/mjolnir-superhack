// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IMjolnirStations} from "./IMjolnirStations.sol";
import {IMjolnirSubscriptions} from "./IMjolnirSubscriptions.sol";
import {MjolnirSubscriptions} from "./MjolnirSubscriptions.sol";

contract MjolnirStations is IMjolnirStations, ERC721("MjolnirStations", "MST") {
    IMjolnirSubscriptions private immutable _SUBSCRIPTIONS_CONTRACT;

    constructor() {
        _SUBSCRIPTIONS_CONTRACT = new MjolnirSubscriptions(this);
    }

    function subscriptionsContract()
        external
        view
        override
        returns (IMjolnirSubscriptions)
    {
        return _SUBSCRIPTIONS_CONTRACT;
    }
}
