const { ethers } = require('hardhat');
const {
  loadFixture,
} = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { expect } = require('chai');

describe('Subscriptions', function () {
  async function deployFixture() {
    const MockPolicy = await ethers.getContractFactory('MockPolicy');
    const policy = await MockPolicy.deploy();
    const Stations = await ethers.getContractFactory('Stations');
    const stations = await Stations.deploy(policy);
    const subscriptionsAddress = await stations.subscriptionsContract();
    const subscriptions = await ethers.getContractAt(
      'Subscriptions',
      subscriptionsAddress,
    );

    const [, owner1, user1] = await ethers.getSigners();

    const createStation = async owner => {
      const fee = BigInt(1e18);
      const cid = 'test cid';
      const tx = await stations.createStation(
        fee,
        cid,
        owner,
        new Uint8Array(),
      );
      const receipt = await tx.wait();
      const stationId = receipt?.logs
        .filter(log => log.address === stations.target)
        .map(log => stations.interface.parseLog(log))
        .find(log => (log.name = 'Transfer')).args[2];
      return stationId;
    };
    const stationId1 = await createStation(owner1);

    return { policy, subscriptions, stationId1, user1 };
  }

  describe('Deployment', async function () {
    it('Should have right name', async function () {
      const { subscriptions } = await loadFixture(deployFixture);
      const name = await subscriptions.name();
      expect(name).to.equal('MjolnirSubscription');
    });

    it('Should have right symbol', async function () {
      const { subscriptions } = await loadFixture(deployFixture);
      const symbol = await subscriptions.symbol();
      expect(symbol).to.equal('MSB');
    });

    it('Should have right policyContract', async function () {
      const { policy, subscriptions } = await loadFixture(deployFixture);
      expect(subscriptions.policyContract()).to.eventually.equal(policy.target);
    });
  });

  describe('Creating Subscription', async function () {
    it('Should emit Transfer from zero_address to to_address', async function () {
      const { policy, subscriptions, stationId1, user1 } = await loadFixture(
        deployFixture,
      );
      const number = await subscriptions.subscribers(stationId1);
      const createPrice = await policy.createSubscriptionPrice(number);
      await expect(
        subscriptions.createSubscription(stationId1, user1, new Uint8Array(), {
          value: createPrice,
        }),
      )
        .to.emit(subscriptions, 'Transfer')
        .withArgs(ethers.ZeroAddress, user1.address, () => true);
    });

    it('Should subscription owner have been set correctly', async function () {
      const { policy, subscriptions, stationId1, user1 } = await loadFixture(
        deployFixture,
      );
      const number = await subscriptions.subscribers(stationId1);
      const createPrice = await policy.createSubscriptionPrice(number);
      const tx = await subscriptions.createSubscription(
        stationId1,
        user1,
        new Uint8Array(),
        { value: createPrice },
      );
      const receipt = await tx.wait();
      const subscriptionId = receipt?.logs
        .filter(log => log.address === subscriptions.target)
        .map(log => subscriptions.interface.parseLog(log))
        .find(log => (log.name = 'Transfer')).args[2];
      await expect(subscriptions.ownerOf(subscriptionId)).to.eventually.equal(
        user1.address,
      );
    });

    it('Should emit SubscriptionCreated event with correct stationId and subscriptionId', async function () {
      const { policy, subscriptions, stationId1, user1 } = await loadFixture(
        deployFixture,
      );
      const number = await subscriptions.subscribers(stationId1);
      const createPrice = await policy.createSubscriptionPrice(number);
      const tx = await subscriptions.createSubscription(
        stationId1,
        user1,
        new Uint8Array(),
        { value: createPrice },
      );
      const receipt = await tx.wait();
      const subscriptionId = receipt?.logs
        .filter(log => log.address === subscriptions.target)
        .map(log => subscriptions.interface.parseLog(log))
        .find(log => (log.name = 'Transfer')).args[2];
      await expect(tx)
        .to.emit(subscriptions, 'SubscriptionCreated')
        .withArgs(stationId1, subscriptionId);
    });

    it('Should revert on InsufficientFunds', async function () {
      const { policy, subscriptions, stationId1, user1 } = await loadFixture(
        deployFixture,
      );
      const number = await subscriptions.subscribers(stationId1);
      const createPrice = await policy.createSubscriptionPrice(number);
      await expect(
        subscriptions.createSubscription(stationId1, user1, new Uint8Array(), {
          value: createPrice / BigInt(2),
        }),
      ).to.revertedWithCustomError(subscriptions, 'InsufficientFunds');
    });

    it('Should return exceed funds', async function () {
      const { policy, subscriptions, stationId1, user1 } = await loadFixture(
        deployFixture,
      );
      const number = await subscriptions.subscribers(stationId1);
      const createPrice = await policy.createSubscriptionPrice(number);
      await expect(() =>
        subscriptions
          .connect(user1)
          .createSubscription(stationId1, user1, new Uint8Array(), {
            value: createPrice * BigInt(2),
          }),
      ).to.changeEtherBalance(user1, -createPrice);
    });

    it('Should revert on invalid stationId', async function () {
      const { policy, subscriptions, stationId1, user1 } = await loadFixture(
        deployFixture,
      );
      const number = await subscriptions.subscribers(stationId1);
      const createPrice = await policy.createSubscriptionPrice(number);
      await expect(
        subscriptions.createSubscription(
          ethers.keccak256(ethers.toUtf8Bytes('random stationId')),
          user1,
          new Uint8Array(),
          {
            value: createPrice,
          },
        ),
      ).to.reverted;
    });
  });
});
