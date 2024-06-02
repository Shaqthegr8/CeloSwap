import { expect } from "chai";
import { ethers } from "hardhat";

describe("Ecommerce Contract", function () {
  let Ecommerce, ecommerce, owner, buyer, addr1;

  beforeEach(async function () {
    [owner, buyer, addr1] = await ethers.getSigners();

    const peanutVaultAddress = "PEANUT_VAULT_CONTRACT_ADDRESS";
    const xmptAddress = "XMPT_CONTRACT_ADDRESS";
    const olasAddress = "OLAS_CONTRACT_ADDRESS";

    Ecommerce = await ethers.getContractFactory("Ecommerce");
    ecommerce = await Ecommerce.deploy(peanutVaultAddress, xmptAddress, olasAddress);
    await ecommerce.deployed();
  });

  it("Should create and purchase a product", async function () {
    const productName = "Test Product";
    const productPrice = ethers.utils.parseEther("1");

    await ecommerce.connect(owner).createProduct(productName, productPrice);
    const product = await ecommerce.products(1);

    expect(product.name).to.equal(productName);
    expect(product.price).to.equal(productPrice);
    expect(product.owner).to.equal(owner.address);

    await ecommerce.connect(buyer).purchaseProduct(1, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("secret")));

    const newProductOwner = await ecommerce.products(1).owner;
    expect(newProductOwner).to.equal(owner.address); // Owner should remain the same
  });

  it("Should send a message via XMPT", async function () {
    const message = "Hello from the blockchain";
    await ecommerce.connect(owner).sendMessage(addr1.address, message);

    // Add assertions to check the XMPT contract (mock/fake it in a real test scenario)
  });

  it("Should reward customer via Olas", async function () {
    const productName = "Test Product";
    const productPrice = ethers.utils.parseEther("1");

    await ecommerce.connect(owner).createProduct(productName, productPrice);

    await ecommerce.connect(buyer).purchaseProduct(1, ethers.utils.keccak256(ethers.utils.toUtf8Bytes("secret")));

    // Add assertions to check the Olas contract (mock/fake it in a real test scenario)
  });
});
