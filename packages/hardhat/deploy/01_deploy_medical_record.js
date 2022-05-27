require("dotenv").config();

const deploymentScript = async ({ getNamedAccounts, deployments }) => {
  console.log("\n01_deploy_medical_record");

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("MedicalRecord", {
    from: deployer,
    log: true,
    contract: "MedicalRecord",
  });

  console.log("01_deploy_medical_record - FINISHED");
};

module.exports = deploymentScript;

module.exports.tags = [];
