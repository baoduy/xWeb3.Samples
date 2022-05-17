const Web3 = require('web3');
const config = require('./truffle-config');

function getDevelopmentWeb3(){
    return new Web3(new Web3.providers.HttpProvider(`http://${config.networks.development.host}:${config.networks.development.port}`));
}
async function getAddress(network) {
    switch (network) {
        case "development": {
            const web3 = getDevelopmentWeb3();
            const accounts = await web3.eth.getAccounts();
            return  accounts[0];
        }
            break;
        case "testnet":
        case "bsc":
            return  process.env.PUBLIC_ADDRESS;
    }
}

module.exports = {getAddress,getDevelopmentWeb3};