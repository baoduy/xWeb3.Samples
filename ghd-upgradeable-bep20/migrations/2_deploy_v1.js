const { deployProxy, upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const { getAddress } = require("../account-provider");

const GHDToken = artifacts.require("GHDToken");

module.exports = async function (deployer, network, accounts) {
  const account = accounts[0];
  console.log("Current Wallet: ", account);

  const ghdv1 = await deployProxy(GHDToken, [account], {
    deployer,
    kind: "uups",
    initializer: "initialize",
  });

  const v1 = await ghdv1.version();
  console.log("Deployed:", { address: ghdv1.address, version: v1 });
};
