// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import {IMjolnirStations} from "./IMjolnirStations.sol";
import {IMjolnirSubscriptions} from "./IMjolnirSubscriptions.sol";
import {MjolnirSubscriptions} from "./MjolnirSubscriptions.sol";

contract MjolnirStations is IMjolnirStations, ERC721("MjolnirStations", "MST") {
    IMjolnirSubscriptions private immutable _SUBSCRIPTIONS_CONTRACT;
    uint256 private _nextSalt;
    mapping(uint256 stationId => string cid) private _stationCID;

    error NotOwner();

    modifier onlyOwner(uint256 stationId) {
        if (msg.sender != ownerOf(stationId)) revert NotOwner();
        _;
    }

    constructor() {
        _SUBSCRIPTIONS_CONTRACT = new MjolnirSubscriptions(this);
    }

    function createStation(
        address to,
        string calldata cid,
        bytes calldata data
    ) external override {
        uint256 salt = _nextSalt;
        uint256 stationId = uint256(
            keccak256(abi.encode([block.chainid, salt]))
        );
        _safeMint({to: to, tokenId: stationId, data: data});
        _stationCID[stationId] = cid;
        _nextSalt = salt + 1;
    }

    function setStationCID(
        uint256 stationId,
        string calldata cid
    ) external override {
        _stationCID[stationId] = cid;
    }

    function subscriptionsContract()
        external
        view
        override
        returns (IMjolnirSubscriptions)
    {
        return _SUBSCRIPTIONS_CONTRACT;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(IERC721Metadata, ERC721) returns (string memory) {
        return _stationCID[tokenId];
    }
}
