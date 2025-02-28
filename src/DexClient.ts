import { OKXDexClient } from '@okx-dex/okx-dex-sdk';
import 'dotenv/config';

// Common Solana token addresses
export const TOKENS = {
  SOL: '11111111111111111111111111111111',   // Wrapped SOL
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'
};

// Initialize OKX DEX client
const initClient = () => {
  if (!process.env.OKX_API_KEY) throw new Error('Missing OKX_API_KEY in .env file');
  if (!process.env.OKX_SECRET_KEY) throw new Error('Missing OKX_SECRET_KEY in .env file');
  if (!process.env.OKX_API_PASSPHRASE) throw new Error('Missing OKX_API_PASSPHRASE in .env file');
  if (!process.env.OKX_PROJECT_ID) throw new Error('Missing OKX_PROJECT_ID in .env file');
  // if (!process.env.SOLANA_PRIVATE_KEY) throw new Error('Missing SOLANA_PRIVATE_KEY in .env file');
  // if (!process.env.SOLANA_WALLET_ADDRESS) throw new Error('Missing SOLANA_WALLET_ADDRESS in .env file');
  // if (!process.env.SOLANA_RPC_URL) throw new Error('Missing SOLANA_RPC_URL in .env file');

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
    }
  });
};

export const client = initClient();
