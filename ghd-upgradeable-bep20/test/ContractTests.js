const Web3 = require("web3");

async function getContract() {
  const contractAddress = "0x349EF4a2aE429A021378535f4d24AE55898234b3";

  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://data-seed-prebsc-1-s1.binance.org:8545`
    )
  );
  const minABI = [
    // version
    {
      constant: true,
      inputs: [],
      name: "version",
      outputs: [{ name: "version", type: "string" }],
      type: "function",
    },
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

  return new web3.eth.Contract(minABI, contractAddress);
}

describe("GHD Contract Tests", () => {
  it("Test versioning", async () => {
    const contract = await getContract();
    const version = await contract.methods.version().call();

    console.log(version);
    assert.equal(version.toString(), "v1.0.2");
  });
});
