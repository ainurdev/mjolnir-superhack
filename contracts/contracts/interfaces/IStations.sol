// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import {ISubscriptions} from "./ISubscriptions.sol";

interface IStations is IERC721, IERC721Metadata {
    event StationCreated(uint256 stationId, uint256 monthlyFee, string cid);
    event StationFeeUpdated(uint256 stationId, uint256 monthlyFee);
    event StationCidUpdated(uint256 stationId, string cid);
    event PublicStreamPublished(uint256 stationId, string cid);
    event PrivateStreamPublished(uint256 stationId, string cid);

    error NotStationOwner();

    function createStation(
        uint256 monthlyFee,
        string calldata cid,
        address to,
        bytes calldata data
    ) external;

    function updateStationFee(uint256 stationId, uint256 monthlyFee) external;
    function updateStationCid(uint256 stationId, string calldata cid) external;

    function publishPublicStream(
        uint256 stationId,
        string calldata cid
    ) external;

    function publishPrivateStream(
        uint256 stationId,
        string calldata cid
    ) external;

    function stationMonthlyFee(uint256 stationId) external view returns (uint256);

    function subscriptionsContract() external view returns (ISubscriptions);
}
