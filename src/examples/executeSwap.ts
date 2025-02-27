import { client, TOKENS } from '../index';

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
      chainId: '196',
      fromTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      toTokenAddress: '0x1e4a5963abfd975d8c9021ce480b42188849d41d',
      amount: String(10 * 10 ** 16), // .001 ETH (in wei)
      slippage: '0.5', // 0.1% slippage
      userWalletAddress: process.env.EVM_WALLET_ADDRESS
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
