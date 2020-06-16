const ERC20Token = artifacts.require("ERC20Token");

const {
  ERC20: ERC20_OPTIONS,
} = require("../deploy-params");


module.exports = function(deployer) {
  deployer.then(async () => {
      await deployer.deploy(ERC20Token, ERC20_OPTIONS.initialBeneficiar);
  });
};
