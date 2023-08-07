// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import {IMjolnirStations} from "./IMjolnirStations.sol";

interface IMjolnirSubscriptions is IERC721, IERC721Metadata {
    function stationsContract() external view returns (IMjolnirStations);

    function station(uint256 tokenId) external view returns (uint256 stationId);
}
