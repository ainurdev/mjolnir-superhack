# Mjolnir Superhack

A decentralized live streaming platform based on the Ethereum L2s, The Graph, and IPFS that enables the creators to have their Stations as NFTs and token-gate their content.

Each creator can have multiple **Stations (Channels)** and these stations are NFTs that can be traded on the open marketplace. Only the station owner can publish content on the station. The content of the station is token-gated and only the holders of the station's **Subscription NFT** can view the content.

Viewers can buy the **Subscription NFT** of the station they want to watch directly from our platform via their wallets or trade it on the open marketplace. Each **Station NFT** can have any number of **Subscription NFTs** attached to it and the Station’s value would be based on these subscription **NFTs** and each new subscription transaction would change the previous value.

## Vision

Vision for Mjolnir is to create a DAO that empowers creators and viewers alike, offering a secure and transparent way for creators to monetize their content and have a real value for their brand and name and also for viewers to support their favorite creators while being able to always have a fair price for watching the content.

### Milestones

- Support more chains!
- KYC for streamers through Worldcoin
- Auctioning Station NFTs on Zora
- Ticketing and event management through GET Protocol

## Project Structure

The project is divided into 5 main parts:

- **contracts**: Solidity smart contracts for the platform to control the Station and Subscription NFTs.
- **subgraph**: The Graph subgraph to index the data of the platform and make it available for querying.
- **web**: The frontend of the platform built with Svelte.
- **watcher**: An Electron app that lets users stream OBS's HLS output to IPFS.
- **deploy**: Infrastructure as code to deploy the platform to Kubernetes and also an Production ready Helm chart for The Graph.