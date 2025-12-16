import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Address } from 'viem';
import { CategoricalMarket } from '@/lib/abis/CategoricalMarket';

export interface MarketInfo {
  metadataURI: string;
  liquidityParameter: bigint;
  totalCollateral: bigint;
  liquidityPool: bigint;
  resolutionTime: bigint;
  createdAt: bigint;
  status: number;
  winningOutcome: number;
  oracleResolver: Address;
  totalVolume: bigint;
}

export interface MarketState {
  info: MarketInfo;
  prices: bigint[];
  quantities: bigint[];
}

export interface UserPosition {
  balances: bigint[];
  currentValue: bigint;
  potentialWinnings: bigint;
}

export interface SimulateBuyResult {
  shares: bigint;
  totalCost: bigint;
  priceImpact: bigint;
}

export interface SimulateSellResult {
  payout: bigint;
  priceImpact: bigint;
}

export interface ArbitrageCheck {
  hasArbitrage: boolean;
  costDifference: bigint;
}

export const useCategoricalMarket = (marketAddress?: Address) => {
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // ============= READ FUNCTIONS =============

  // Get market state (info, prices, quantities)
  const { data: marketState, refetch: refetchMarketState } = useReadContract({
    address: marketAddress,
    abi: CategoricalMarket,
    functionName: 'getMarketState',
    query: { enabled: !!marketAddress },
  }) as { data: MarketState | undefined; refetch: () => void };

  // Get outcome prices
  const { data: outcomePrices, refetch: refetchOutcomePrices } = useReadContract({
    address: marketAddress,
    abi: CategoricalMarket,
    functionName: 'getOutcomePrices',
    query: { enabled: !!marketAddress },
  }) as { data: bigint[] | undefined; refetch: () => void };

  // Get user position
  const useUserPosition = (userAddress?: Address) => {
    const { data: position, refetch } = useReadContract({
      address: marketAddress,
      abi: CategoricalMarket,
      functionName: 'getUserPosition',
      args: userAddress ? [userAddress] : undefined,
      query: { enabled: !!marketAddress && !!userAddress },
    }) as { data: UserPosition | undefined; refetch: () => void };

    return { position, refetch };
  };

  // Check if user has claimed
  const useHasClaimed = (userAddress?: Address) => {
    const { data: hasClaimed, refetch } = useReadContract({
      address: marketAddress,
      abi: CategoricalMarket,
      functionName: 'hasClaimed',
      args: userAddress ? [userAddress] : undefined,
      query: { enabled: !!marketAddress && !!userAddress },
    }) as { data: boolean | undefined; refetch: () => void };

    return { hasClaimed, refetch };
  };

  // Get market info
  const { data: market, refetch: refetchMarket } = useReadContract({
    address: marketAddress,
    abi: CategoricalMarket,
    functionName: 'market',
    query: { enabled: !!marketAddress },
  }) as { data: MarketInfo | undefined; refetch: () => void };

  // Get outcome quantities
  const useOutcomeQuantity = (outcomeIndex: number) => {
    const { data: quantity, refetch } = useReadContract({
      address: marketAddress,
      abi: CategoricalMarket,
      functionName: 'outcomeQuantities',
      args: [BigInt(outcomeIndex)],
      query: { enabled: !!marketAddress },
    }) as { data: bigint | undefined; refetch: () => void };

    return { quantity, refetch };
  };

  // Simulate buy
  const useSimulateBuy = (outcomeIndex: number, cost: bigint) => {
    const { data: simulation, refetch } = useReadContract({
      address: marketAddress,
      abi: CategoricalMarket,
      functionName: 'simulateBuy',
      args: [outcomeIndex, cost],
      query: { enabled: !!marketAddress && cost > 0n },
    }) as { data: SimulateBuyResult | undefined; refetch: () => void };

    return { simulation, refetch };
  };

  // Simulate sell
  const useSimulateSell = (outcomeIndex: number, sharesToSell: bigint) => {
    const { data: simulation, refetch } = useReadContract({
      address: marketAddress,
      abi: CategoricalMarket,
      functionName: 'simulateSell',
      args: [outcomeIndex, sharesToSell],
      query: { enabled: !!marketAddress && sharesToSell > 0n },
    }) as { data: SimulateSellResult | undefined; refetch: () => void };

    return { simulation, refetch };
  };

  // Check arbitrage
  const { data: arbitrageCheck, refetch: refetchArbitrage } = useReadContract({
    address: marketAddress,
    abi: CategoricalMarket,
    functionName: 'checkArbitrage',
    query: { enabled: !!marketAddress },
  }) as { data: ArbitrageCheck | undefined; refetch: () => void };

  // Get collateral token address
  const { data: collateralToken } = useReadContract({
    address: marketAddress,
    abi: CategoricalMarket,
    functionName: 'collateralToken',
    query: { enabled: !!marketAddress },
  }) as { data: Address | undefined };

  // Get outcome token address
  const { data: outcomeToken } = useReadContract({
    address: marketAddress,
    abi: CategoricalMarket,
    functionName: 'outcomeToken',
    query: { enabled: !!marketAddress },
  }) as { data: Address | undefined };

  // Get LP token address
  const { data: lpToken } = useReadContract({
    address: marketAddress,
    abi: CategoricalMarket,
    functionName: 'lpToken',
    query: { enabled: !!marketAddress },
  }) as { data: Address | undefined };

  // Get fee manager address
  const { data: feeManager } = useReadContract({
    address: marketAddress,
    abi: CategoricalMarket,
    functionName: 'feeManager',
    query: { enabled: !!marketAddress },
  }) as { data: Address | undefined };

  // Get social predictions address
  const { data: socialPredictions } = useReadContract({
    address: marketAddress,
    abi: CategoricalMarket,
    functionName: 'socialPredictions',
    query: { enabled: !!marketAddress },
  }) as { data: Address | undefined };

  // ============= WRITE FUNCTIONS =============

  // Initialize market
  const initialize = async (
    metadataURI: string,
    numOutcomes: bigint,
    resolutionTime: bigint,
    oracleResolver: Address,
    initialLiquidity: bigint,
    outcomeTokenAddress: Address,
    lpTokenAddress: Address
  ) => {
    if (!marketAddress) throw new Error('Market address required');
    
    writeContract({
      address: marketAddress,
      abi: CategoricalMarket,
      functionName: 'initialize',
      args: [
        metadataURI as `0x${string}`,
        numOutcomes,
        resolutionTime,
        oracleResolver,
        initialLiquidity,
        outcomeTokenAddress,
        lpTokenAddress,
      ],
    });
  };

  // Buy shares
  const buyShares = async (
    outcomeIndex: number,
    minShares: bigint,
    maxCost: bigint
  ) => {
    if (!marketAddress) throw new Error('Market address required');
    
    writeContract({
      address: marketAddress,
      abi: CategoricalMarket,
      functionName: 'buyShares',
      args: [outcomeIndex, minShares, maxCost],
    });
  };

  // Sell shares
  const sellShares = async (
    outcomeIndex: number,
    sharesToSell: bigint,
    minPayout: bigint
  ) => {
    if (!marketAddress) throw new Error('Market address required');
    
    writeContract({
      address: marketAddress,
      abi: CategoricalMarket,
      functionName: 'sellShares',
      args: [outcomeIndex, sharesToSell, minPayout],
    });
  };

  // Add liquidity
  const addLiquidity = async (amount: bigint) => {
    if (!marketAddress) throw new Error('Market address required');
    
    writeContract({
      address: marketAddress,
      abi: CategoricalMarket,
      functionName: 'addLiquidity',
      args: [amount],
    });
  };

  // Remove liquidity
  const removeLiquidity = async (lpTokensAmount: bigint) => {
    if (!marketAddress) throw new Error('Market address required');
    
    writeContract({
      address: marketAddress,
      abi: CategoricalMarket,
      functionName: 'removeLiquidity',
      args: [lpTokensAmount],
    });
  };

  // Mint complete set
  const mintCompleteSet = async (amount: bigint) => {
    if (!marketAddress) throw new Error('Market address required');
    
    writeContract({
      address: marketAddress,
      abi: CategoricalMarket,
      functionName: 'mintCompleteSet',
      args: [amount],
    });
  };

  // Burn complete set
  const burnCompleteSet = async (amount: bigint) => {
    if (!marketAddress) throw new Error('Market address required');
    
    writeContract({
      address: marketAddress,
      abi: CategoricalMarket,
      functionName: 'burnCompleteSet',
      args: [amount],
    });
  };

  // Resolve market
  const resolveMarket = async (winningOutcomeIndex: number) => {
    if (!marketAddress) throw new Error('Market address required');
    
    writeContract({
      address: marketAddress,
      abi: CategoricalMarket,
      functionName: 'resolveMarket',
      args: [winningOutcomeIndex],
    });
  };

  // Claim winnings
  const claimWinnings = async () => {
    if (!marketAddress) throw new Error('Market address required');
    
    writeContract({
      address: marketAddress,
      abi: CategoricalMarket,
      functionName: 'claimWinnings',
    });
  };

  return {
    // Read data
    marketState,
    outcomePrices,
    market,
    arbitrageCheck,
    collateralToken,
    outcomeToken,
    lpToken,
    feeManager,
    socialPredictions,
    
    // Read hooks
    useUserPosition,
    useHasClaimed,
    useOutcomeQuantity,
    useSimulateBuy,
    useSimulateSell,
    
    // Write functions
    initialize,
    buyShares,
    sellShares,
    addLiquidity,
    removeLiquidity,
    mintCompleteSet,
    burnCompleteSet,
    resolveMarket,
    claimWinnings,
    
    // Refetch functions
    refetchMarketState,
    refetchOutcomePrices,
    refetchMarket,
    refetchArbitrage,
    
    // Transaction state
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    writeError,
  };
};