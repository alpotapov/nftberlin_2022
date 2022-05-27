const isProduction = (chainId) => {
  return chainId === "137";
};

const skipIfOnProduction = (hre) =>
  new Promise(async (resolve) => {
    const chainId = await hre.getChainId();
    if (isProduction(chainId)) {
      console.log("Production environment, skipping deployment");
      resolve(true);
      return;
    }

    console.log("Test environment, deploying");
    resolve(false);
  });

const skipIfNotLocal = (hre) =>
  new Promise(async (resolve) => {
    const chainId = await hre.getChainId();
    console.log({ chainId });
    if (chainId !== "31337") {
      console.log("Non-local environment, skipping deployment");
      resolve(true);
      return;
    }

    console.log("Local environment, deploying");
    resolve(false);
  });

const skipAlways = () => new Promise((resolve) => resolve(true));

const range = (n) => [...Array(n).keys()];

module.exports = {
  isProduction,
  skipIfOnProduction,
  skipIfNotLocal,
  skipAlways,
  range,
};
