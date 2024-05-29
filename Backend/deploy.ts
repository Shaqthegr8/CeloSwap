import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const balance = await deployer.getBalance();
  console.log('Account balance:', ethers.utils.formatEther(balance));

  const Ecommerce = await ethers.getContractFactory('Ecommerce');
  const ecommerce = await Ecommerce.deploy();

  await ecommerce.deployed();

  console.log('Ecommerce contract deployed to:', ecommerce.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
