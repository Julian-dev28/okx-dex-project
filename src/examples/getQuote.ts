import { client } from '../DexClient';

/**
 * Example: Get a swap quote for SOL to USDC
 */
async function getQuote() {
  try {
    const quote = await client.dex.getQuote({
      chainId: '501', 
      fromTokenAddress: 'So11111111111111111111111111111111111111112',
      toTokenAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      amount: '1000000000', // 0.1 ETH (in wei)
      slippage: '0.1'     // 0.1%
    });

    console.log('Quote received:');
    console.log(JSON.stringify(quote, null, 2));
    
    console.log(`Expected output amount: ${quote.data[0].toTokenAmount}`);
    console.log(`Price impact: ${quote.data[0].priceImpactPercentage}%`);
    
    return quote;
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
  getQuote()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });
}

export { getQuote };
