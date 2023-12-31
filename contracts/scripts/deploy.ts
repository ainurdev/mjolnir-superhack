import { ethers } from 'hardhat';

async function main() {
  const policy = await ethers.deployContract('MockPolicy');
  await policy.deploymentTransaction()?.wait(3);
  console.log(`policy contract address is: ${policy.target}`);
  const stations = await ethers.deployContract('Stations', [policy.target]);
  await stations.deploymentTransaction()?.wait(3);
  console.log(`stations contract address is: ${stations.target}`);
  const subscriptionsTarget = await stations.subscriptionsContract();
  console.log(`subscriptions contract address is: ${subscriptionsTarget}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
