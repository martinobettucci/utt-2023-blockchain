const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Headn", (m) => {
    const apollo = m.contract("Module01_base");
    return { apollo };
});