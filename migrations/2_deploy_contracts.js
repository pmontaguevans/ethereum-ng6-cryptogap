var SafeMath = artifacts.require('SafeMath');
var CryptoPark = artifacts.require('CryptoPark');
var Mortal = artifacts.require('Mortal');

module.exports = function(deployer) {
    deployer.deploy(SafeMath);
    deployer.link(SafeMath, CryptoPark, Mortal);
    deployer.deploy(CryptoPark);
    deployer.deploy(Mortal);
};