// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IStations} from "./IStations.sol";
import {ISubscriptions} from "./ISubscriptions.sol";
import {Subscriptions} from "./Subscriptions.sol";

contract Stations is IStations, ERC721("MjolnirStation", "MST") {
    ISubscriptions private immutable _SUBSCRIPTIONS_CONTRACT;
    uint256 private _nextSalt;

    modifier onlyStationOwner(uint256 stationId) {
        if (msg.sender != ownerOf(stationId)) revert NotStationOwner();
        _;
    }

    constructor() {
        _SUBSCRIPTIONS_CONTRACT = new Subscriptions(this);
    }

    function createStation(
        string calldata cid,
        address to,
        bytes calldata data
    ) external override {
        uint256 salt = _nextSalt;
        uint256 stationId = uint256(
            keccak256(abi.encode([block.chainid, salt]))
        );
        _safeMint({tokenId: stationId, to: to, data: data});
        _nextSalt = salt + 1;
        emit StationCreated(stationId, cid);
    }

    function updateStation(
        uint256 stationId,
        string calldata cid
    ) external override onlyStationOwner(stationId) {
        emit StationUpdated(stationId, cid);
    }

    function publishPublicStream(
        uint256 stationId,
        string calldata cid
    ) external override onlyStationOwner(stationId) {
        emit PublicStreamPublished(stationId, cid);
    }

    function publishPrivateStream(
        uint256 stationId,
        string calldata cid
    ) external override onlyStationOwner(stationId) {
        emit PrivateStreamPublished(stationId, cid);
    }

    function subscriptionsContract()
        external
        view
        override
        returns (ISubscriptions)
    {
        return _SUBSCRIPTIONS_CONTRACT;
    }
}
