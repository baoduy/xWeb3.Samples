const truffleAssert = require("truffle-assertions");
const { getAddress, getDevelopmentWeb3 } = require("../account-provider");
const { deployProxy, upgradeProxy } = require("@openzeppelin/truffle-upgrades");

const GHDToken = artifacts.require("GHDToken");
const GHDTokenV2 = artifacts.require("GHDTokenV2");
const GHDTokenV3 = artifacts.require("GHDTokenV3");

async function getWalletBalance(account, contractAddress) {
  //Check amount in Account
  const web3 = getDevelopmentWeb3();
  const minABI = [
    // balanceOf
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
    // decimals
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ name: "", type: "uint8" }],
      type: "function",
    },
  ];

  const contract = new web3.eth.Contract(minABI, contractAddress);
  const balance = await contract.methods.balanceOf(account).call();
  return balance;
}

describe("GHD Tests", () => {
  it("First deployment", async () => {
    const account = await getAddress("development");
    const ghd = await deployProxy(GHDToken, [account], {
      kind: "uups",
      initializer: "initialize",
    });

    const owner = await ghd.getOwner();
    const name = await ghd.name();
    const symbol = await ghd.symbol();
    const amount = await ghd.totalSupply();
    const version = await ghd.version();

    assert.equal(owner.toString(), account);
    assert.equal(name.toString(), "GHD Loyal Token");
    assert.equal(symbol.toString(), "GHD");
    assert.equal(version.toString(), "v1.0.0");
    assert.equal(amount.toString(), "9900000000000000000000000");

    //Check amount in Account
    const balance = await getWalletBalance(account, ghd.address);
    assert.equal(balance.toString(), "9900000000000000000000000");
  });

  it("Upgrade to v2", async () => {
    const ghd = await GHDToken.deployed();
    const ghdv2 = await upgradeProxy(ghd.address, GHDTokenV2, { kind: "uups" });

    const version = await ghdv2.version();
    const amount = await ghdv2.totalSupply();

    assert.equal(amount, 9900000000000000000000000);
    assert.equal(version.toString(), "v1.0.2");

    const account = await getAddress("development");
    const balance = await getWalletBalance(account, ghdv2.address);
    assert.equal(balance, amount);

    console.log("latest balance", balance);
  });

  it("Upgrade to v3", async () => {
    const ghdv2 = await GHDTokenV2.deployed();
    const ghdv3 = await upgradeProxy(ghdv2.address, GHDTokenV3, {
      kind: "uups",
    });

    const version = await ghdv3.version();
    const amount = await ghdv3.totalSupply();

    assert.equal(amount, 9900000000000000000000000);
    assert.equal(version.toString(), "v1.0.3");
  });
});
