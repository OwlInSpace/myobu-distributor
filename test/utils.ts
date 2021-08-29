import { BigNumberish } from "ethers"
import { MyobuDistributor } from "../typechain/"
import { expect } from "chai"

export const shouldRevert = async (
  func: () => void,
  errorMessage?: string
): Promise<void> => {
  try {
    await func()
  } catch {
    return
  }
  throw new Error(errorMessage)
}

export const setDistributionAndCheckIfCorrect = async (
  toDistributeTo: {
    addr: string
    percentage: BigNumberish
  }[],
  contract: MyobuDistributor
): Promise<void> => {
  await contract.setDistributeTo(toDistributeTo)
  toDistributeTo.forEach(async (value, i) => {
    const y = await contract.distributeTo(i)
    expect(y.addr).to.be.equal(value.addr)
    expect(y.percentage).to.be.equal(value.percentage)
  })
  expect(await contract.distributeToCount()).to.be.equal(toDistributeTo.length)
}
