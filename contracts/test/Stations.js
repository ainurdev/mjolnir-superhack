const { ethers } = require("hardhat");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Stations", function () {
  async function deployFixture() {
    const Stations = await ethers.getContractFactory("Stations");
    const stations = await Stations.deploy();

    const [, owner1] = await ethers.getSigners();
    return { stations, owner1 };
  }

  describe("Deployment", async function () {
    it("Should have right name", async function () {
      const { stations } = await loadFixture(deployFixture);
      const name = await stations.name();
      expect(name).to.equal("MjolnirStation");
    });

    it("Should have right symbol", async function () {
      const { stations } = await loadFixture(deployFixture);
      const symbol = await stations.symbol();
      expect(symbol).to.equal("MST");
    });

    it("Should stationsContract of subscriptionsContract of stations be stations", async function () {
      const { stations } = await loadFixture(deployFixture);
      const subscriptionsAddress = await stations.subscriptionsContract();
      const subscriptions = await ethers.getContractAt(
        "Subscriptions",
        subscriptionsAddress,
      );
      const stationsAddress = await subscriptions.stationsContract();
      await expect(stations.target).to.equal(stationsAddress);
    });
  });

  describe("Creating Station", async function () {
    it("Should emit Transfer from zero_address to to_address", async function () {
      const { stations, owner1 } = await loadFixture(deployFixture);
      const cid = "test cid";
      await expect(stations.createStation(cid, owner1, new Uint8Array()))
        .to.emit(stations, "Transfer")
        .withArgs(ethers.ZeroAddress, owner1.address, () => true);
    });

    it("Should station owner have been set correctly", async function () {
      const { stations, owner1 } = await loadFixture(deployFixture);
      const cid = "test cid";
      const tx = await stations.createStation(cid, owner1, new Uint8Array());
      const receipt = await tx.wait();
      const stationId = receipt?.logs
        .filter((log) => log.address === stations.target)
        .map((log) => stations.interface.parseLog(log))
        .find((log) => (log.name = "Transfer")).args[2];
      await expect(stations.ownerOf(stationId)).to.eventually.equal(
        owner1.address,
      );
    });

    it("Should emit StationCreated event with correct stationId and cid", async function () {
      const { stations, owner1 } = await loadFixture(deployFixture);
      const cid = "test cid";
      const tx = await stations.createStation(cid, owner1, new Uint8Array());
      const receipt = await tx.wait();
      const stationId = receipt?.logs
        .filter((log) => log.address === stations.target)
        .map((log) => stations.interface.parseLog(log))
        .find((log) => (log.name = "Transfer")).args[2];
      await expect(tx)
        .to.emit(stations, "StationCreated")
        .withArgs(stationId, cid);
    });
  });

  describe("Updating Station", async function () {
    it("Should revert with NotStationOwner on wrong caller", async function () {
      const { stations, owner1 } = await loadFixture(deployFixture);
      const old_cid = "old test cid";
      const tx = await stations.createStation(
        old_cid,
        owner1,
        new Uint8Array(),
      );
      const receipt = await tx.wait();
      const stationId = receipt?.logs
        .filter((log) => log.address === stations.target)
        .map((log) => stations.interface.parseLog(log))
        .find((log) => (log.name = "Transfer")).args[2];

      const new_cid = "new test cid";
      await expect(
        stations.updateStation(stationId, new_cid),
      ).to.revertedWithCustomError(stations, "NotStationOwner");
    });

    it("Should emit StationUpdated event with correct stationId and cid", async function () {
      const { stations, owner1 } = await loadFixture(deployFixture);
      const old_cid = "old test cid";
      const tx = await stations.createStation(
        old_cid,
        owner1,
        new Uint8Array(),
      );
      const receipt = await tx.wait();
      const stationId = receipt?.logs
        .filter((log) => log.address === stations.target)
        .map((log) => stations.interface.parseLog(log))
        .find((log) => (log.name = "Transfer")).args[2];

      const new_cid = "new test cid";
      await expect(stations.connect(owner1).updateStation(stationId, new_cid))
        .to.emit(stations, "StationUpdated")
        .withArgs(stationId, new_cid);
    });
  });
});
