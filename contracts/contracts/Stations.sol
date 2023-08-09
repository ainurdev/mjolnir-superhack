// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IStations} from "./interfaces/IStations.sol";
import {ISubscriptions} from "./interfaces/ISubscriptions.sol";
import {IPolicy} from "./interfaces/IPolicy.sol";
import {Subscriptions} from "./Subscriptions.sol";

contract Stations is IStations, ERC721("MjolnirStation", "MST") {
    ISubscriptions private immutable _SUBSCRIPTIONS_CONTRACT;
    uint256 private _nextSalt;

    mapping(uint256 stationId => uint256 monthlyFee) public stationMonthlyFee;

    modifier onlyStationOwner(uint256 stationId) {
        if (msg.sender != ownerOf(stationId)) revert NotStationOwner();
        _;
    }

    constructor(IPolicy policy) {
        _SUBSCRIPTIONS_CONTRACT = new Subscriptions(this, policy);
    }

    function createStation(
        uint256 monthlyFee,
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

        stationMonthlyFee[stationId] = monthlyFee;
        emit StationCreated({stationId:stationId, monthlyFee:monthlyFee, cid:cid});
    }

    function updateStationFee(
        uint256 stationId,
        uint256 monthlyFee
    ) external override onlyStationOwner(stationId) {
        stationMonthlyFee[stationId] = monthlyFee;
        emit StationFeeUpdated(stationId, monthlyFee);
    }

    function updateStationCid(
        uint256 stationId,
        string calldata cid
    ) external override onlyStationOwner(stationId) {
        emit StationCidUpdated(stationId, cid);
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
