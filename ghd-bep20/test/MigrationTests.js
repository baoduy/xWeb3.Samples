const truffleAssert = require("truffle-assertions");

const GHDToken = artifacts.require("GHDToken");

// async function getWalletBalance(account, contractAddress) {
//   //Check amount in Account
//   const web3 = getDevelopmentWeb3();
//   const minABI = [
//     // balanceOf
//     {
//       constant: true,
//       inputs: [{ name: "_owner", type: "address" }],
//       name: "balanceOf",
//       outputs: [{ name: "balance", type: "uint256" }],
//       type: "function",
//     },
//     // decimals
//     {
//       constant: true,
//       inputs: [],
//       name: "decimals",
//       outputs: [{ name: "", type: "uint8" }],
//       type: "function",
//     },
//   ];
//
//   const contract = new web3.eth.Contract(minABI, contractAddress);
//   const balance = await contract.methods.balanceOf(account).call();
//   return balance;
// }

describe("GHD Tests", () => {
  it("Deployment", async () => {
    const ghd = await GHDToken.deployed();

    const owner = await ghd.getOwner();
    const name = await ghd.name();
    const symbol = await ghd.symbol();
    const amount = await ghd.totalSupply();

    //assert.equal(owner.toString(), account);
    assert.equal(name.toString(), "GHD Token");
    assert.equal(symbol.toString(), "GHD");
    assert.equal(amount.toString(), "9900000000000000000000000");
  });
});
