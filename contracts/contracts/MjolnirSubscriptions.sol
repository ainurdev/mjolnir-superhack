// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IMjolnirSubscriptions} from "./IMjolnirSubscriptions.sol";
import {IMjolnirStations} from "./IMjolnirStations.sol";

contract MjolnirSubscriptions is
    IMjolnirSubscriptions,
    ERC721("MjolnirSubscriptions", "MSB")
{
    IMjolnirStations private immutable _STATIONS_CONTRACT;
    mapping(uint256 tokenId => uint256 stationId) public station;

    constructor(IMjolnirStations stationsContract_) {
        _STATIONS_CONTRACT = stationsContract_;
    }

    function stationsContract()
        external
        view
        override
        returns (IMjolnirStations)
    {
        return _STATIONS_CONTRACT;
    }
}
