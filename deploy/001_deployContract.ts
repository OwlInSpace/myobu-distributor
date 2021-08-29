import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import deployContract from "../scripts/deployContract"
import { MyobuDistributor } from "../typechain/"

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const c = <MyobuDistributor>await deployContract(hre, "MyobuDistributor")
  await c.setDistributeTo([{ addr: c.deployTransaction.from, percentage: 100 }])
}

export default func
