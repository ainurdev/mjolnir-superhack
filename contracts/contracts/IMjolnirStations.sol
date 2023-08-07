// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import {IMjolnirSubscriptions} from "./IMjolnirSubscriptions.sol";

interface IMjolnirStations is IERC721, IERC721Metadata {
    function createStation(
        address to,
        string calldata cid,
        bytes calldata data
    ) external;

    function setStationCID(uint256 stationId, string calldata cid) external;

    function subscriptionsContract()
        external
        view
        returns (IMjolnirSubscriptions);
}
