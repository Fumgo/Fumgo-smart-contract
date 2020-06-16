const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config();

const DEPLOYER_PRIVATE_KEY_MAIN = process.env.DEPLOYER_PRIVATE_KEY_MAIN;
const ETH_PROVIDER_URL_MAIN = process.env.ETH_PROVIDER_URL_MAIN;

const DEPLOYER_PRIVATE_KEY_RINKEBY = process.env.DEPLOYER_PRIVATE_KEY_RINKEBY;
const ETH_PROVIDER_URL_RINKEBY = process.env.ETH_PROVIDER_URL_RINKEBY;

if (!DEPLOYER_PRIVATE_KEY_MAIN) {
  console.error('Private key for MAIN_NET was not provided')
}

if (!DEPLOYER_PRIVATE_KEY_RINKEBY) {
  console.error('Private key for RINKEBY was not provided')
}

module.exports = {
  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  
  networks: {
    rinkebyinfura: {
      provider() {
        return new HDWalletProvider(DEPLOYER_PRIVATE_KEY_RINKEBY, ETH_PROVIDER_URL_RINKEBY)
      },
      network_id: "4", // Rinkeby ID 4
      gasPrice: 10000000000
    },
    maininfura: {
      provider() {
        return new HDWalletProvider(DEPLOYER_PRIVATE_KEY_MAIN, ETH_PROVIDER_URL_MAIN)
      },
      network_id: "1", // Mainer ID 1
      gas: 2000000,
      gasPrice: 40000000000
    },
  }
};
