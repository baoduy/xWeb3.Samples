const GHDToken = artifacts.require("GHDToken");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(GHDToken);

  const ghd = await GHDToken.deployed();
  console.log("Deployed:", ghd.address);
};
