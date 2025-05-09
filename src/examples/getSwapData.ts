import { client } from '../DexClient';

/**
 * Example: Get a swap quote for SOL to USDC
 */
async function getSwapData() {
  try {
    const swapData = await client.dex.getSwapData({
      chainId: '501', // Solana chain ID
      fromTokenAddress: '11111111111111111111111111111111',
      toTokenAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      amount: '1000000000',
      slippage: '0.5',     // 0.1%
      userWalletAddress: process.env.SOLANA_WALLET_ADDRESS
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
