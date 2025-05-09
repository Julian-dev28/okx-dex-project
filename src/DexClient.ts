import { OKXDexClient } from '@okx-dex/okx-dex-sdk';
import 'dotenv/config';

// Common Solana token addresses
export const TOKENS = {
  SOL: '11111111111111111111111111111111',   // Native SOL
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'
};

// Initialize OKX DEX client
const initClient = () => {
  if (!process.env.OKX_API_KEY) throw new Error('Missing OKX_API_KEY in .env file');
  if (!process.env.OKX_SECRET_KEY) throw new Error('Missing OKX_SECRET_KEY in .env file');
  if (!process.env.OKX_API_PASSPHRASE) throw new Error('Missing OKX_API_PASSPHRASE in .env file');
  if (!process.env.OKX_PROJECT_ID) throw new Error('Missing OKX_PROJECT_ID in .env file');

  return new OKXDexClient({
    apiKey: process.env.OKX_API_KEY,
    secretKey: process.env.OKX_SECRET_KEY,
    apiPassphrase: process.env.OKX_API_PASSPHRASE,
    projectId: process.env.OKX_PROJECT_ID,
    // Required for executing swaps
    evm: {
      connection: {
        rpcUrl: process.env.EVM_RPC_URL!,
      },
      privateKey: process.env.EVM_PRIVATE_KEY!,
      walletAddress: process.env.EVM_WALLET_ADDRESS!
    },
    solana: {
      connection: {
        rpcUrl: process.env.SOLANA_RPC_URL!,
      },
      walletAddress: process.env.SOLANA_WALLET_ADDRESS!,
      privateKey: process.env.SOLANA_PRIVATE_KEY!,
    },
    sui: {
      connection: {
        rpcUrl: process.env.SUI_RPC_URL!,
      },
      walletAddress: process.env.SUI_WALLET_ADDRESS!,
      privateKey: process.env.SUI_PRIVATE_KEY!,
    }
  });
};

export const client = initClient();
