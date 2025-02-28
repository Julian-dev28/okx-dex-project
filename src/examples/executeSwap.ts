import { client, TOKENS } from '../DexClient';

/**
 * Example: Execute a swap from SOL to USDC
 */
async function executeSwap() {
  try {
    if (!process.env.EVM_PRIVATE_KEY) {
      throw new Error('Missing EVM_PRIVATE_KEY in .env file');
    }


    // You can change this to any EVM chain
    // For example, for base, use chainId: '8453'
    // For example, for baseSepolia, use chainId: '84532'
    // You can also use SUI, use chainId: '784'
    // When using another Chain, you need to change the fromTokenAddress and toTokenAddress to the correct addresses for that chain
    
    const swapResult = await client.dex.executeSwap({
      chainId: '8453', // Base chain ID
      fromTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      toTokenAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      amount: String(10 * 10 ** 14), // .0001 ETH
      slippage: '0.5', // 0.1% slippage
      userWalletAddress: process.env.EVM_WALLET_ADDRESS!
    });

    console.log('Swap executed successfully:');
    console.log(JSON.stringify(swapResult, null, 2));
    
    return swapResult;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error executing swap:', error.message);
      // API errors include details in the message
      if (error.message.includes('API Error:')) {
        const match = error.message.match(/API Error: (.*)/);
        if (match) console.error('API Error Details:', match[1]);
      }
    }
    throw error;
  }
}

// Run if this file is executed directly
if (require.main === module) {
  executeSwap()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });
}

export { executeSwap };
