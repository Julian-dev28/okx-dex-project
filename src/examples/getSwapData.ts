import { client } from '../DexClient';

/**
 * Example: Get a swap quote for SOL to USDC
 */
async function getSwapData() {
  try {
    const swapData = await client.dex.getSwapData({
      chainId: '8453', // Base chain ID
      fromTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      toTokenAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      amount: String(10 * 10 ** 18), // 0.0001 ETH (in wei)
      slippage: '0.5',     // 0.1%
      userWalletAddress: process.env.EVM_WALLET_ADDRESS
    });

    console.log('Swap Data received:');
    console.log(JSON.stringify(swapData, null, 2));
    
    console.log(`Expected output amount: ${swapData.data[0].routerResult.toTokenAmount}`);
    console.log(`Price impact: ${swapData.data[0].routerResult.priceImpactPercentage}%`);
    console.log(`TX Data: ${swapData.data[0].tx?.data}`);
    return swapData;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error getting quote:', error.message);
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
  getSwapData()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });
}

export { getSwapData };
