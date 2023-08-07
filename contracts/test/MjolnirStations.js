import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";

describe("MjolnirStations", function () {
  async function deployStationsFixture() {
    const MjolnirStations = await ethers.getContractFactory("MjolnirStations");
    const stations = await MjolnirStations.deploy();

    const [, owner1] = await ethers.getSigners();
    return { stations, owner1 };
  }

  describe("Deployment", async function () {
    it("should stationsContract of subscriptionsContract of stations be stations", async function () {
      const { stations } = await loadFixture(deployStationsFixture);
      const subscriptionsAddress = await stations.subscriptionsContract();
      const subscriptions = await ethers.getContractAt(
        "MjolnirSubscriptions",
        subscriptionsAddress,
      );
      const stationsAddress = await subscriptions.stationsContract();
      await expect(stations.target).to.equal(stationsAddress);
    });
  });

  describe("Creating Station", async function () {
    it("should emit Transfer from zero_address to to_address", async function () {
      const { stations, owner1 } = await loadFixture(deployStationsFixture);
      const cid = "test cid";
      await expect(stations.createStation(owner1, cid, new Uint8Array()))
        .to.emit(stations, "Transfer")
        .withArgs(ethers.ZeroAddress, owner1.address, () => true);
    });

    it("should station owner be equal to to_address", async function () {
      const { stations, owner1 } = await loadFixture(deployStationsFixture);
      const cid = "test cid";
      const tx = await stations.createStation(owner1, cid, new Uint8Array());
      const receipt = await tx.wait();
      const logs = receipt?.logs
        .filter((log) => log.address === stations.target)
        .map((log) => stations.interface.parseLog(log));
      const stationId = logs[0].args[2];
      await expect(stations.ownerOf(stationId)).to.eventually.equal(
        owner1.address,
      );
    });
  });
});
