// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Contract {
    uint256 private num;

    constructor(uint256 startingNum) {
        num = startingNum;
    }

    function get() external view returns (uint256) {
        return num;
    }

    function set(uint256 newNum) external {
        num = newNum;
    }
}
