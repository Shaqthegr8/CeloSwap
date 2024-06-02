import { ethers } from "hardhat";
import { ContractKit, newKit } from "@celo/contractkit";
import { Wallet } from "ethers";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const privateKey = process.env.DEPLOYER_PRIVATE_KEY as string;
  const kit: ContractKit = newKit("https://alfajores-forno.celo-testnet.org");

  const deployer = new Wallet(privateKey);
  kit.connection.addAccount(deployer.privateKey);

  const [defaultAccount] = await kit.connection.getAccounts();
  kit.defaultAccount = defaultAccount;

  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await kit.getTotalBalance(deployer.address);
  console.log("Account balance:", balance.cUSD.toString());

  const Ecommerce = await ethers.getContractFactory("Ecommerce");
  const peanutVaultAddress = "PEANUT_VAULT_CONTRACT_ADDRESS"; // Replace with actual Peanut vault contract address
  const xmptAddress = "XMPT_CONTRACT_ADDRESS"; // Replace with actual XMPT contract address
  const olasAddress = "OLAS_CONTRACT_ADDRESS"; // Replace with actual Olas contract address

  const ecommerce = await Ecommerce.deploy(peanutVaultAddress, xmptAddress, olasAddress);

  await ecommerce.deployed();
  console.log("Ecommerce contract deployed to:", ecommerce.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
