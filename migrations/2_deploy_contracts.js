var filename = artifacts.require("./{filename}.sol");

module.exports = function(deployer) {
  deployer.deploy(filename);
};