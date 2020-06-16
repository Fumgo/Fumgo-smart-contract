const { BN, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const ERC20Token = artifacts.require("ERC20Token");

require('chai').should();

contract('ERC20Token', (accounts) => {
  /*
  * - Deployer
  */
  const account_0 = accounts[0];
  const account_1 = accounts[1];
  const account_2 = accounts[2];

  const totalSupply = new BN("1000000000000000000000000000")
  const name = 'FUMGO';
  const symbol = 'FMG';
  const decimals = new BN("18");
  const beneficiar = account_0;
  

  let erc20;

  beforeEach(async ()=> {
    erc20 = await ERC20Token.new(beneficiar);
  });

  it('should be created with right params', async () => {
    const _name = await erc20.name();
    const _symbol = await erc20.symbol();
    const _decimals = await erc20.decimals();

    expect(_name).equal(name);
    expect(_symbol).equal(symbol);
    expect(_decimals).to.be.bignumber.equal(decimals);
  });

  it(`should put ${totalSupply} tokens in the beneficiar (${beneficiar}) account`, async () => {
    const balance = await erc20.balanceOf(beneficiar);
    expect(balance).to.be.bignumber.equal(totalSupply);
  });

  it('should burn 2000 tokens', async () => {
    const burnAmount = new BN("2000");
    const totalSupplyBefore = await erc20.totalSupply();
    const benBalanceBefore = await erc20.balanceOf(beneficiar);

    await erc20.burn(burnAmount);
    const balanceAfter = await erc20.balanceOf(beneficiar);
    const totalSupplyAfter = await erc20.totalSupply();

    expect(balanceAfter).to.be.bignumber.equal(benBalanceBefore.sub(burnAmount));
    expect(totalSupplyAfter).to.be.bignumber.equal(totalSupplyBefore.sub(burnAmount));
  });

  it('should deny to burn tokens if user desnt have tokens', async () => {
    const burnAmount = new BN("1");
    
    await expectRevert(erc20.burn(burnAmount, { from: account_1 }),
      'ERC20: burn amount exceeds balance',
    );
  });

});
