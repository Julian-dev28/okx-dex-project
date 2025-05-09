# OKX DEX SDK Project

A project utilizing the OKX DEX SDK for Solana network DEX operations. This project demonstrates how to integrate with the OKX DEX API for getting quotes, executing swaps, and managing liquidity on Solana.

## Features

* Execute token swaps on Solana
* Get real-time quotes and liquidity info
* Built-in retry mechanism and error handling
* Full TypeScript support
* Solana transaction handling and signing

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/Julian-dev28/okx-dex-project.git
   cd okx-dex-project
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure your environment variables by editing the `.env` file

Required environment variables:
```
# OKX
OKX_PROJECT_ID=
OKX_API_KEY=
OKX_SECRET_KEY=
OKX_API_PASSPHRASE=

# Wallet
SOLANA_WALLET_ADDRESS=
SOLANA_PRIVATE_KEY=

# Sui
SUI_WALLET_ADDRESS=
SUI_PRIVATE_KEY=

# Solana
SOLANA_RPC_URL=
WS_ENDPONT=
RECEIVING_ADDRESS=

# Evm
EVM_WALLET_ADDRESS=
EVM_PRIVATE_KEY=
EVM_RPC_URL=
```

You can obtain your OKX API credentials by creating an account on the [OKX Developer Portal](https://www.okx.com/web3/build/dev-portal) and generating an API key.

## Usage

This project includes several example scripts demonstrating how to use the OKX DEX SDK:

### Get Quote (SOL → USDC)

```
npx ts-node src/examples/getQuote.ts      
```

### Execute Swap

```
npx ts-node src/examples/executeSwap.ts .01 11111111111111111111111111111111 EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
```

### Get Chain, Token, and Liquidity Information

```
npx ts-node src/examples/getInfo.ts
```

## API Reference

The project uses the following methods from the OKX DEX SDK:

```typescript

// Get Solana tokens
const tokens = await client.dex.getTokens('501');

// Get swap quote
const quote = await client.dex.getQuote({...});

// Get swap data (transaction details)
const swapData = await client.dex.getSwapData({...});

// Execute swap
const swapResult = await client.dex.executeSwap({...});
```

## Common Solana Token Addresses

```typescript
const TOKENS = {
  SOL: 'So11111111111111111111111111111111111111112',   // Wrapped SOL
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'
};
```

## Notes
This project is for demonstration purposes only and should not be used in production environments. The OKX DEX SDK is still in development and may be subject to changes.

