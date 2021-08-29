import { ethers } from "hardhat"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { MyobuDistributor, IWETH } from "../typechain/"
import { shouldRevert, setDistributionAndCheckIfCorrect } from "./utils"
import { toSetDistributionTo, amountToDistributeWith } from "./Constants"
import { expect } from "chai"
import { BigNumber } from "ethers"

let signers: SignerWithAddress[]

let contract: MyobuDistributor

describe("Deployment", () => {
  before(async () => {
    signers = await ethers.getSigners()
  })

  it("Deploy contract", async () => {
    const _Contract = await ethers.getContractFactory("MyobuDistributor")
    contract = <MyobuDistributor>await _Contract.deploy()
    await contract.deployed()
  })
})

describe("Set distribution", () => {
  it("Distribute() does not work when no distribution is set", async () => {
    await shouldRevert(async () => await contract.distribute())
  })

  it("Reverts on over or under 100%", async () => {
    await shouldRevert(async () => {
      await contract.setDistributeTo([
        { addr: signers[0].address, percentage: 30 },
        { addr: signers[1].address, percentage: 80 },
      ])
      await contract.setDistributeTo([
        { addr: signers[0].address, percentage: 5 },
        { addr: signers[1].address, percentage: 60 },
      ])
    })
  })

  it("Set default distribution", async () => {
    await setDistributionAndCheckIfCorrect(toSetDistributionTo, contract)
  })
})

describe("Distribute", () => {
  it("Can receive ETH", async () => {
    await contract.fallback({ value: amountToDistributeWith })
  })

  it("Distribute works correctly", async () => {
    const oldBalance: BigNumber[] = []
    for await (const value of toSetDistributionTo)
      oldBalance.push(await ethers.provider.getBalance(value.addr))
    await contract.distribute()
    await toSetDistributionTo.forEach(async (value, i) =>
      expect(await ethers.provider.getBalance(value.addr)).to.be.equal(
        oldBalance[i].add(amountToDistributeWith.mul(value.percentage).div(100))
      )
    )
  })

  it("Sends WETH on unsuccessful transfer", async () => {
    const smartContractAddr = "0x220866B1A2219f40e72f5c628B65D54268cA3A9D"
    await contract.setDistributeTo([
      { addr: smartContractAddr, percentage: 100 },
    ])
    const WETH = <IWETH>(
      await ethers.getContractAt(
        "IWETH",
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
      )
    )
    const oldBalance = await WETH.balanceOf(smartContractAddr)
    const toAdd = ethers.utils.parseEther("0.1")
    await contract.fallback({ value: toAdd })
    await contract.distribute()
    expect(await WETH.balanceOf(smartContractAddr)).to.be.equal(
      oldBalance.add(toAdd)
    )
  })
})
