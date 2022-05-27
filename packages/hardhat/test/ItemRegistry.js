const { ethers } = require("hardhat");
// eslint-disable-next-line no-unused-vars
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

const { utils } = ethers;

use(solidity);

describe("ItemRegistry Contract", function () {
  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  describe("#marketplace", () => {
    // eslint-disable-next-line no-unused-vars
    let itemContract;
    let registry;
    beforeEach(async () => {
      const RegNFT = await ethers.getContractFactory("ItemRegistry");
      registry = await RegNFT.deploy(utils.parseEther("1000000"));

      await registry.createType(
        utils.formatBytes32String("Item 1"),
        utils.formatBytes32String("weapon1"),
        utils.parseEther("0.1"),
        "",
        ""
      );
      const [, , , itemContractAddress] = await registry.getType(0);
      itemContract = await ethers.getContractAt(
        "YourCollectible",
        itemContractAddress
      );

      await registry.mint(0, 10);
    });

    it("should not allow to list item that does not belong to the user", async () => {
      // selling item with id #1
      await expect(
        registry.listOnMarketplace(0, 1, utils.parseEther("0.3"))
      ).to.be.revertedWith(
        "ItemRegistry: only owner can list item on marketplace"
      );
    });

    it("should allow user to put item up for sale", async () => {
      await registry.buyItem(0, { value: utils.parseEther("0.1") });
      // selling item with id #1
      await registry.listOnMarketplace(0, 1, utils.parseEther("0.3"));

      const result = await registry.getItemsOnMarketplace(0);
      const {
        numberOfCollectiblesForSale,
        itemIds,
        itemPrices,
        marketplaceEntryIndex,
      } = result;
      expect(numberOfCollectiblesForSale).to.equal(1);
      expect(itemIds[0]).to.equal(1);
      expect(itemPrices[0]).to.equal(utils.parseEther("0.3"));
      expect(marketplaceEntryIndex[0]).to.equal(1);
    });

    it("should not allow to put the same item twice on the marketplace", async () => {
      await registry.buyItem(0, { value: utils.parseEther("0.1") });
      await registry.listOnMarketplace(0, 1, utils.parseEther("0.3"));
      await expect(
        registry.listOnMarketplace(0, 1, utils.parseEther("0.3"))
      ).to.be.revertedWith("ItemRegistry: item already listed");
    });

    it("should allow user to buy item on marketplace", async () => {
      const [deployer, account1] = await ethers.getSigners();
      await registry.transfer(account1.address, utils.parseEther("1"));
      await registry.buyItem(0, { value: utils.parseEther("0.1") });
      const itemId = 1;
      const currentOwner = await itemContract.ownerOf(itemId);
      expect(currentOwner).to.be.equal(deployer.address);
      await registry.listOnMarketplace(0, itemId, utils.parseEther("0.3"));

      const marketEntries = await registry.getItemsOnMarketplace(0);
      const { marketplaceEntryIndex } = marketEntries;

      await registry
        .connect(account1)
        .buyItemFromMarketplace(0, marketplaceEntryIndex[0]);

      const newOwner = await itemContract.ownerOf(itemId);
      expect(newOwner).to.be.equal(account1.address);
    });

    it("should prevent users from buying same item twice", async () => {
      const [, account1, account2] = await ethers.getSigners();
      const itemId = 1;
      await registry.transfer(account1.address, utils.parseEther("1"));
      await registry.transfer(account2.address, utils.parseEther("1"));

      await registry.buyItem(0, { value: utils.parseEther("0.1") });
      await registry.listOnMarketplace(0, itemId, utils.parseEther("0.3"));

      const marketEntries = await registry.getItemsOnMarketplace(0);
      const { marketplaceEntryIndex } = marketEntries;

      await registry
        .connect(account1)
        .buyItemFromMarketplace(0, marketplaceEntryIndex[0]);

      await expect(
        registry
          .connect(account2)
          .buyItemFromMarketplace(0, marketplaceEntryIndex[0])
      ).to.be.revertedWith("ItemRegistry: inactive market entry");
    });
  });

  describe("#types", () => {
    it("should return info about all created item types", async () => {
      const RegNFT = await ethers.getContractFactory("ItemRegistry");
      const registry = await RegNFT.deploy(utils.parseEther("1000000"));

      await registry.createType(
        utils.formatBytes32String("Item1"),
        utils.formatBytes32String("gun1"),
        22222,
        "",
        ""
      );
      await registry.createType(
        utils.formatBytes32String("Item2"),
        utils.formatBytes32String("ship1"),
        33333,
        "",
        ""
      );
      await registry.createType(
        utils.formatBytes32String("Item3"),
        utils.formatBytes32String("rocket2"),
        44444,
        "",
        ""
      );

      const result = await registry.getTypes();
      const { itemTypes, itemPrices, itemSymbols } = result;

      expect(utils.parseBytes32String(itemTypes[0])).to.equal("Item1");
      expect(utils.parseBytes32String(itemSymbols[0])).to.equal("gun1");
      expect(itemPrices[0]).to.equal(22222);
      expect(utils.parseBytes32String(itemTypes[1])).to.equal("Item2");
      expect(utils.parseBytes32String(itemSymbols[1])).to.equal("ship1");
      expect(itemPrices[1]).to.equal(33333);
      expect(utils.parseBytes32String(itemTypes[2])).to.equal("Item3");
      expect(utils.parseBytes32String(itemSymbols[2])).to.equal("rocket2");
      expect(itemPrices[2]).to.equal(44444);
    });
  });

  describe("#minting", () => {
    let itemContract;
    let registry;
    beforeEach(async () => {
      const RegNFT = await ethers.getContractFactory("ItemRegistry");
      registry = await RegNFT.deploy(utils.parseEther("1000000"));

      await registry.createType(
        utils.formatBytes32String("Item 1"),
        utils.formatBytes32String("weapon1"),
        utils.parseEther("0.1"),
        "",
        ""
      );
      const [, , , itemContractAddress] = await registry.getType(0);
      itemContract = await ethers.getContractAt(
        "YourCollectible",
        itemContractAddress
      );
    });

    it("should allow users to buy items in exchange for Ether", async () => {
      const [, account1] = await ethers.getSigners();
      await registry.mint(0, 10);
      const initialBalance = await itemContract.balanceOf(account1.address);
      expect(initialBalance).to.equal(0);

      await registry
        .connect(account1)
        .buyItem(0, { value: utils.parseEther("0.1") });

      const finalBalance = await itemContract.balanceOf(account1.address);
      expect(finalBalance).to.equal(1);
    });

    it("should allow admin to mint new items", async () => {
      const [, , , , totalSupply] = await registry.getType(0);
      expect(totalSupply).to.equal(ethers.BigNumber.from(0));

      await registry.mint(0, 10);

      const [, , , , updatedTotalSupply, itemsOnSale] = await registry.getType(
        0
      );
      expect(updatedTotalSupply).to.equal(ethers.BigNumber.from(10));
      expect(itemsOnSale).to.equal(10);
    });

    it("should allow anyone to buy minted items from shop for fixed Ether price", async () => {
      const [, account1] = await ethers.getSigners();
      await registry.mint(0, 10);
      const balanceOfShop = await registry.balanceOfItem(registry.address);
      expect(balanceOfShop).to.equal(ethers.BigNumber.from(10));

      await registry
        .connect(account1)
        .buyItem(0, { value: utils.parseEther("0.1") });

      const [, , , , lastTotalSupply, itemsOnSale] = await registry.getType(0);
      expect(lastTotalSupply).to.equal(ethers.BigNumber.from(10));
      expect(itemsOnSale).to.equal(9);
      const lastBalanceOfShop = await registry.balanceOfItem(registry.address);
      expect(lastBalanceOfShop).to.equal(ethers.BigNumber.from(9));
    });

    it("should not allow minting items directly through YourCollectible", async () => {
      // this should fail because YourCollectible is owned by ItemRegistry and not by deployer
      const [deployer] = await ethers.getSigners();
      const initialBalance = await itemContract.balanceOf(deployer.address);
      expect(initialBalance).to.equal(0);

      await expect(
        itemContract.mintItem(deployer.address, "")
      ).to.be.revertedWith("Ownable: caller is not the owner");

      const finalBalance = await itemContract.balanceOf(deployer.address);
      expect(finalBalance).to.equal(0);
    });
  });

  describe("#querying", () => {
    let itemContract;
    let registry;
    beforeEach(async () => {
      const RegNFT = await ethers.getContractFactory("ItemRegistry");
      registry = await RegNFT.deploy(utils.parseEther("1000000"));

      await registry.createType(
        utils.formatBytes32String("Item 1"),
        utils.formatBytes32String("weapon1"),
        utils.parseEther("0.1"),
        "",
        ""
      );
      await registry.createType(
        utils.formatBytes32String("Item 2"),
        utils.formatBytes32String("ship1"),
        utils.parseEther("0.1"),
        "",
        ""
      );
      await registry.mint(0, 10);
      await registry.mint(1, 10);
      const [, , , itemContractAddress] = await registry.getType(0);
      itemContract = await ethers.getContractAt(
        "YourCollectible",
        itemContractAddress
      );
    });

    it("should return ids of items belonging to the player from YourCollectible", async () => {
      const [deployer, account1] = await ethers.getSigners();

      await registry
        .connect(account1)
        .buyItem(0, { value: utils.parseEther("0.1") });
      await registry
        .connect(deployer)
        .buyItem(0, { value: utils.parseEther("0.1") });
      await registry
        .connect(account1)
        .buyItem(0, { value: utils.parseEther("0.1") });

      const result = await itemContract.itemsOf(account1.address);

      const finalBalance = await itemContract.balanceOf(account1.address);

      expect(finalBalance).to.equal(2);
      expect(result.length).to.be.greaterThan(0);
      expect(result[0]).to.equal(1);
      expect(result[1]).to.equal(9);
    });

    it("should return ids of items of every type belonging to the player", async () => {
      const [deployer, account1] = await ethers.getSigners();

      await registry
        .connect(account1)
        .buyItem(0, { value: utils.parseEther("0.1") });
      await registry
        .connect(deployer)
        .buyItem(0, { value: utils.parseEther("0.1") });
      await registry
        .connect(account1)
        .buyItem(0, { value: utils.parseEther("0.1") });
      await registry
        .connect(account1)
        .buyItem(1, { value: utils.parseEther("0.1") });
      await registry
        .connect(account1)
        .buyItem(1, { value: utils.parseEther("0.1") });

      const result = await registry.itemsOf(account1.address);
      const { itemsOfType, ownedItems } = result;
      const finalBalance = await registry.balanceOfItem(account1.address);

      expect(finalBalance).to.equal(4);

      // should have entry for every item type
      expect(itemsOfType.length).to.equal(2);
      expect(itemsOfType[0]).to.equal(2);
      expect(itemsOfType[1]).to.equal(2);

      // should be 4 entries: 2 for the first and 2 for the second type
      expect(ownedItems.length).to.equal(2 * 2);
      expect(ownedItems[0]).to.equal(1);
      expect(ownedItems[1]).to.equal(9);
      expect(ownedItems[2]).to.equal(1);
      expect(ownedItems[3]).to.equal(10);
    });
  });

  describe("#withdrawing", () => {
    let registry;
    beforeEach(async () => {
      const [deployer] = await ethers.getSigners();
      const RegNFT = await ethers.getContractFactory("ItemRegistry", deployer);
      registry = await RegNFT.deploy(utils.parseEther("1000000"));

      await registry.createType(
        utils.formatBytes32String("Item 1"),
        utils.formatBytes32String("weapon1"),
        utils.parseEther("0.3"),
        "",
        ""
      );
      await registry.createType(
        utils.formatBytes32String("Item 2"),
        utils.formatBytes32String("ship1"),
        utils.parseEther("0.8"),
        "",
        ""
      );

      await registry.mint(0, 10);
      await registry.mint(1, 10);
    });

    it("should secure access to withdraw method", async () => {
      const [, account1] = await ethers.getSigners();

      await expect(registry.connect(account1).withdraw()).to.be.revertedWith(
        "ItemRegistry: caller is not the beneficiary"
      );
    });

    it("should allow beneficiary to withdraw", async () => {
      const [deployer, account1] = await ethers.getSigners();

      await registry
        .connect(account1)
        .buyItem(0, { value: utils.parseEther("0.3") });
      await registry
        .connect(account1)
        .buyItem(1, { value: utils.parseEther("0.8") });
      await registry
        .connect(account1)
        .buyItem(1, { value: utils.parseEther("0.8") });

      await expect(
        await registry.connect(deployer).withdraw()
      ).to.changeEtherBalance(deployer, utils.parseEther("1.9"));

      await expect(
        await registry.connect(deployer).withdraw()
      ).to.changeEtherBalance(deployer, 0);
    });
  });

  describe("#exchange", () => {
    let registry;
    beforeEach(async () => {
      const [deployer] = await ethers.getSigners();

      const RegNFT = await ethers.getContractFactory("ItemRegistry", deployer);
      registry = await RegNFT.deploy(utils.parseEther("1000000"));

      await deployer.sendTransaction({
        to: registry.address,
        value: ethers.utils.parseEther("2.0"),
      });
    });

    it("should allow user to swap ETH to SZN and back", async () => {
      const [, account1] = await ethers.getSigners();

      const connectedRegistry = registry.connect(account1);
      const balance1 = await connectedRegistry.balanceOf(account1.address);
      expect(balance1).to.equal(0);

      await connectedRegistry.swapEthForToken({ value: utils.parseEther("1") });
      const balance2 = await connectedRegistry.balanceOf(account1.address);
      expect(balance2.gt(0)).to.equal(true);

      await expect(
        await connectedRegistry.swapTokenForEth(balance2)
      ).to.changeEtherBalance(account1, utils.parseEther("1"));
      const balance3 = await connectedRegistry.balanceOf(account1.address);
      expect(balance3).to.equal(0);
    });

    it("the buyer must receive the correct price", async () => {
      const [, account1] = await ethers.getSigners();

      const sznOld = await registry.balanceOf(account1.address);
      const price = await registry.getSwapEthForTokenPrice(
        utils.parseEther("1.0")
      );
      await registry
        .connect(account1)
        .swapEthForToken({ value: utils.parseEther("1.0") });

      const sznNew = await registry.balanceOf(account1.address);
      expect(price).to.equal(sznNew.sub(sznOld));
    });
  });
});
