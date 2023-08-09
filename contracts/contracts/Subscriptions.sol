// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ISubscriptions} from "./interfaces/ISubscriptions.sol";
import {IPolicy} from "./interfaces/IPolicy.sol";
import {IStations} from "./interfaces/IStations.sol";

contract Subscriptions is ISubscriptions, ERC721("MjolnirSubscription", "MSB") {
    IStations private immutable _STATIONS_CONTRACT;
    IPolicy private immutable _POLICY_CONTRACT;
    mapping(uint256 subscriptionId => uint256 stationId) public station;
    mapping(uint256 stationId => uint256 number) public subscribers;

    constructor(IStations stationsContract_, IPolicy policy_) {
        _STATIONS_CONTRACT = stationsContract_;
        _POLICY_CONTRACT = policy_;
    }

    function createSubscription(
        uint256 stationId,
        address to,
        bytes calldata data
    ) external payable override {
        uint256 number = subscribers[stationId];
        uint256 createFee = _POLICY_CONTRACT.createSubscriptionPrice(number);
        if (createFee > msg.value) revert InsufficientFunds();

        uint256 subscriptionId = uint256(
            keccak256(abi.encode([stationId, number]))
        );
        _safeMint({tokenId: subscriptionId, to: to, data: data});
        subscribers[stationId] = number + 1;
        emit SubscriptionCreated(stationId, subscriptionId);

        address stationOwner = _STATIONS_CONTRACT.ownerOf(stationId);
        bool succeeded;
        (succeeded, ) = stationOwner.call{value: createFee}("");
        assert(succeeded);

        if (createFee < msg.value) {
            (succeeded, ) = msg.sender.call{value: createFee}("");
        }
        assert(succeeded);
    }

    function stationsContract() external view override returns (IStations) {
        return _STATIONS_CONTRACT;
    }

    function policyContract() external view override returns (IPolicy) {
        return _POLICY_CONTRACT;
    }
}
