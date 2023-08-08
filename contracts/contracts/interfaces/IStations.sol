// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import {ISubscriptions} from "./ISubscriptions.sol";

interface IStations is IERC721, IERC721Metadata {
    event StationCreated(uint256 stationId, string cid);
    event StationUpdated(uint256 stationId, string cid);
    event PublicStreamPublished(uint256 stationId, string cid);
    event PrivateStreamPublished(uint256 stationId, string cid);

    error NotStationOwner();

    function createStation(
        string calldata cid,
        address to,
        bytes calldata data
    ) external;

    function updateStation(uint256 stationId, string calldata cid) external;

    function publishPublicStream(
        uint256 stationId,
        string calldata cid
    ) external;

    function publishPrivateStream(
        uint256 stationId,
        string calldata cid
    ) external;

    function subscriptionsContract() external view returns (ISubscriptions);
}
