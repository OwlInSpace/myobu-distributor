import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import deployContract from "../scripts/deployContract"
import { Contract } from "../typechain/Contract"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const c = <Contract>await deployContract(hre, "Contract", 0)
  await c.set(2)
}

export default func
