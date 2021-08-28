# Smart contract template

A simple smart contract template using hardhat. With solhint, solcover, eslint, typescipt and prettier

## Requirements:

Node.js (https://nodejs.dev/)

Optionally: Pnpm (https://pnpm.io/)

## Config:

Secrets: Rename the secrets.json.dist to secrets.json
<pre>
   **mainnetNodeURI** & **testnetNodeURI**: The ethereum node URIs for mainnet and testnet. You can use https://www.alchemy.com/ to get one {string},

   **testnetPrivateKeys & mainnetPrivateKeys & localPrivateKeys**: Your private keys in an array, will be used for deployments or tests for testnet / local {string[]},
    
   **etherscanApiKey & coinMarketCapApiKey**: API keys, coinMarketCap API key to get price information for gas tracker, and etherscan API key used to verify contracts {string}
</pre>

Config: Change config in config.json
<pre>
   **compilerVersion & optimizerRuns**: The compiler version to use, and amount of optimizer runs to run. 0 turns optimizer off {number | string},

   **mainnetGasPrice & testnetGasPrice**: Gas price in GWEI to use for deployments / tests {nunber},

   **forkBlock**: The block to fork mainnet from on the local network, set to 0 for no forking {number},

   **reportGas**: Show amount of gas used after a test {boolean}
</pre>
## First:

    pnpm install

## Available Scripts:

### `pnpm test`

### `pnpm test:testnet`

Runs tests in the `test` directory, on a local network or on testnet

### `pnpm compile`

Compiles all the soliidity contracts

### `pnpm typechain`

Use typechain to generate types for the solidity contracts

### `pnpm coverage`

Generate code coverage for the contracts

### `pnpm deploy`

### `pnpm deploy:testnet`

### `pnpm deploy:mainnet`

Deploy contracts, deploy scripts in ./deploy/

Can be done on mainnet, testnet, or the local network

### `pnpm lint`

### `pnpm lint:fix`

Lints the solidity and typescript code

### `pnpm format`

### `pnpm format:fix`

Formats the solidity and typescript code

### `pnpm verify:testnet <address> <constructor arguments>`

### `pnpm verify:mainnet <address> <constructor arguments>`

Verifies the contracts on etherscan
