const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");

const GHDToken = artifacts.require("GHDToken");
const GHDTokenV2 = artifacts.require("GHDTokenV2");

module.exports = async function (deployer) {
  const ghdv1 = await GHDToken.deployed();

  const v1 = await ghdv1.version();
  console.log("Previous version:", { address: ghdv1.address, version: v1 });

  const ghdv2 = await upgradeProxy(ghdv1.address, GHDTokenV2, { deployer });

  const v2 = await ghdv2.version();
  console.log("Upgraded to:", {
    old_address: ghdv1.address,
    new_address: ghdv2.address,
    version: v2,
  });
};
