require("dotenv").config();

const { skipIfNotLocal } = require("../utils/deploymentUtils");

const deploymentScript = async ({ getNamedAccounts, deployments }) => {
  console.log("\n00_deploy_multicall");

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("Multicall", {
    from: deployer,
    log: true,
    contract: "Multicall",
  });

  console.log("00_deploy_multicall - FINISHED");
};

deploymentScript.skip = skipIfNotLocal;

module.exports = deploymentScript;

module.exports.tags = ["FakeTokens"];
