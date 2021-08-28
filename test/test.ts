import { ethers } from "hardhat"
import { Contract } from "../typechain/Contract"
import { expect } from "chai"

let contract: Contract
describe("Deployment", () => {
  it("Deploy contract", async () => {
    const _Contract = await ethers.getContractFactory("Contract")
    contract = <Contract>await _Contract.deploy(0)
    await contract.deployed()
  })
})

describe("Set and get number", () => {
  it("Default is 0", async () => {
    expect(await contract.get()).to.be.equal(0)
  })

  it("Set changes number", async () => {
    await contract.set(2)
    expect(await contract.get()).to.be.equal(2)
  })
})
