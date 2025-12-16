import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Address } from 'viem';
import { CategoricalMarketFactory } from '@/lib/abis/CategoricalMarketFactory';

export interface MarketSummary {
  market: Address;
  outcomeToken: Address;
  lpToken: Address;
  metadataURI: string;
  numOutcomes: bigint;
  resolutionTime: bigint;
  status: number;
  totalLiquidity: bigint;
  prices: bigint[];
}

export interface FactoryConfig {
  _marketImplementation: Address;
  _collateralToken: Address;
  _feeManager: Address;
  _socialPredictions: Address;
  _oracleResolver: Address;
  _admin: Address;
}

export interface CreateMarketResult {
  market: Address;
  outcomeTokenAddr: Address;
  lpTokenAddr: Address;
}

export const useCategoricalMarketFactory = (factoryAddress?: Address) => {
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // ============= READ FUNCTIONS - CONSTANTS =============

  const { data: maxOutcomes } = useReadContract({
    address: factoryAddress,
    abi: CategoricalMarketFactory,
    functionName: 'MAX_OUTCOMES',
    query: { enabled: !!factoryAddress },
  }) as { data: bigint | undefined };

  const { data: minInitialLiquidity } = useReadContract({
    address: factoryAddress,
    abi: CategoricalMarketFactory,
    functionName: 'MIN_INITIAL_LIQUIDITY',
    query: { enabled: !!factoryAddress },
  }) as { data: bigint | undefined };

  const { data: minMarketDuration } = useReadContract({
    address: factoryAddress,
    abi: CategoricalMarketFactory,
    functionName: 'MIN_MARKET_DURATION',
    query: { enabled: !!factoryAddress },
  }) as { data: bigint | undefined };

  // ============= READ FUNCTIONS - ADDRESSES =============

  const { data: admin } = useReadContract({
    address: factoryAddress,
    abi: CategoricalMarketFactory,
    functionName: 'admin',
    query: { enabled: !!factoryAddress },
  }) as { data: Address | undefined };

  const { data: collateralToken } = useReadContract({
    address: factoryAddress,
    abi: CategoricalMarketFactory,
    functionName: 'collateralToken',
    query: { enabled: !!factoryAddress },
  }) as { data: Address | undefined };

  const { data: feeManager } = useReadContract({
    address: factoryAddress,
    abi: CategoricalMarketFactory,
    functionName: 'feeManager',
    query: { enabled: !!factoryAddress },
  }) as { data: Address | undefined };

  const { data: marketImplementation } = useReadContract({
    address: factoryAddress,
    abi: CategoricalMarketFactory,
    functionName: 'marketImplementation',
    query: { enabled: !!factoryAddress },
  }) as { data: Address | undefined };

  const { data: oracleResolver } = useReadContract({
    address: factoryAddress,
    abi: CategoricalMarketFactory,
    functionName: 'oracleResolver',
    query: { enabled: !!factoryAddress },
  }) as { data: Address | undefined };

  const { data: owner } = useReadContract({
    address: factoryAddress,
    abi: CategoricalMarketFactory,
    functionName: 'owner',
    query: { enabled: !!factoryAddress },
  }) as { data: Address | undefined };

  const { data: socialPredictions } = useReadContract({
    address: factoryAddress,
    abi: CategoricalMarketFactory,
    functionName: 'socialPredictions',
    query: { enabled: !!factoryAddress },
  }) as { data: Address | undefined };

  // ============= READ FUNCTIONS - FACTORY CONFIG =============

  const { data: factoryConfig, refetch: refetchFactoryConfig } = useReadContract({
    address: factoryAddress,
    abi: CategoricalMarketFactory,
    functionName: 'getFactoryConfig',
    query: { enabled: !!factoryAddress },
  }) as { data: FactoryConfig | undefined; refetch: () => void };

  // ============= READ FUNCTIONS - MARKET QUERIES =============

  const { data: allMarkets, refetch: refetchAllMarkets } = useReadContract({
    address: factoryAddress,
    abi: CategoricalMarketFactory,
    functionName: 'getAllMarkets',
    query: { enabled: !!factoryAddress },
  }) as { data: Address[] | undefined; refetch: () => void };

  const { data: activeMarkets, refetch: refetchActiveMarkets } = useReadContract({
    address: factoryAddress,
    abi: CategoricalMarketFactory,
    functionName: 'getActiveMarkets',
    query: { enabled: !!factoryAddress },
  }) as { data: Address[] | undefined; refetch: () => void };

  const { data: marketCount, refetch: refetchMarketCount } = useReadContract({
    address: factoryAddress,
    abi: CategoricalMarketFactory,
    functionName: 'getMarketCount',
    query: { enabled: !!factoryAddress },
  }) as { data: bigint | undefined; refetch: () => void };

  // ============= CONDITIONAL READ HOOKS =============

  // Get market at specific index
  const useMarketAtIndex = (index: number) => {
    const { data: market, refetch } = useReadContract({
      address: factoryAddress,
      abi: CategoricalMarketFactory,
      functionName: 'allMarkets',
      args: [BigInt(index)],
      query: { enabled: !!factoryAddress && index >= 0 },
    }) as { data: Address | undefined; refetch: () => void };

    return { market, refetch };
  };

  // Check if address is a market
  const useIsMarket = (marketAddress?: Address) => {
    const { data: isMarket, refetch } = useReadContract({
      address: factoryAddress,
      abi: CategoricalMarketFactory,
      functionName: 'isMarket',
      args: marketAddress ? [marketAddress] : undefined,
      query: { enabled: !!factoryAddress && !!marketAddress },
    }) as { data: boolean | undefined; refetch: () => void };

    return { isMarket, refetch };
  };

  // Get outcome token for market
  const useOutcomeToken = (marketAddress?: Address) => {
    const { data: outcomeToken, refetch } = useReadContract({
      address: factoryAddress,
      abi: CategoricalMarketFactory,
      functionName: 'getOutcomeToken',
      args: marketAddress ? [marketAddress] : undefined,
      query: { enabled: !!factoryAddress && !!marketAddress },
    }) as { data: Address | undefined; refetch: () => void };

    return { outcomeToken, refetch };
  };

  // Get LP token for market
  const useLPToken = (marketAddress?: Address) => {
    const { data: lpToken, refetch } = useReadContract({
      address: factoryAddress,
      abi: CategoricalMarketFactory,
      functionName: 'getLPToken',
      args: marketAddress ? [marketAddress] : undefined,
      query: { enabled: !!factoryAddress && !!marketAddress },
    }) as { data: Address | undefined; refetch: () => void };

    return { lpToken, refetch };
  };

  // Get market summary
  const useMarketSummary = (marketAddress?: Address) => {
    const { data: summary, refetch } = useReadContract({
      address: factoryAddress,
      abi: CategoricalMarketFactory,
      functionName: 'getMarketSummary',
      args: marketAddress ? [marketAddress] : undefined,
      query: { enabled: !!factoryAddress && !!marketAddress },
    }) as { data: MarketSummary | undefined; refetch: () => void };

    return { summary, refetch };
  };

  // Get markets by status
  const useMarketsByStatus = (status: number) => {
    const { data: markets, refetch } = useReadContract({
      address: factoryAddress,
      abi: CategoricalMarketFactory,
      functionName: 'getMarketsByStatus',
      args: [status],
      query: { enabled: !!factoryAddress },
    }) as { data: Address[] | undefined; refetch: () => void };

    return { markets, refetch };
  };

  // Get recent markets
  const useRecentMarkets = (count: number) => {
    const { data: markets, refetch } = useReadContract({
      address: factoryAddress,
      abi: CategoricalMarketFactory,
      functionName: 'getRecentMarkets',
      args: [BigInt(count)],
      query: { enabled: !!factoryAddress && count > 0 },
    }) as { data: Address[] | undefined; refetch: () => void };

    return { markets, refetch };
  };

  // Get market summaries with pagination
  const useMarketSummaries = (offset: number, limit: number) => {
    const { data: summaries, refetch } = useReadContract({
      address: factoryAddress,
      abi: CategoricalMarketFactory,
      functionName: 'getMarketSummaries',
      args: [BigInt(offset), BigInt(limit)],
      query: { enabled: !!factoryAddress && limit > 0 },
    }) as { data: MarketSummary[] | undefined; refetch: () => void };

    return { summaries, refetch };
  };

  // Get outcome token from mapping
  const useMarketToOutcomeToken = (marketAddress?: Address) => {
    const { data: outcomeToken, refetch } = useReadContract({
      address: factoryAddress,
      abi: CategoricalMarketFactory,
      functionName: 'marketToOutcomeToken',
      args: marketAddress ? [marketAddress] : undefined,
      query: { enabled: !!factoryAddress && !!marketAddress },
    }) as { data: Address | undefined; refetch: () => void };

    return { outcomeToken, refetch };
  };

  // Get LP token from mapping
  const useMarketToLPToken = (marketAddress?: Address) => {
    const { data: lpToken, refetch } = useReadContract({
      address: factoryAddress,
      abi: CategoricalMarketFactory,
      functionName: 'marketToLPToken',
      args: marketAddress ? [marketAddress] : undefined,
      query: { enabled: !!factoryAddress && !!marketAddress },
    }) as { data: Address | undefined; refetch: () => void };

    return { lpToken, refetch };
  };

  // ============= WRITE FUNCTIONS =============

  // Create market
  const createMarket = async (
    metadataURI: string,
    numOutcomes: bigint,
    resolutionTime: bigint,
    initialLiquidity: bigint
  ) => {
    if (!factoryAddress) throw new Error('Factory address required');
    
    writeContract({
      address: factoryAddress,
      abi: CategoricalMarketFactory,
      functionName: 'createMarket',
      args: [
        metadataURI as `0x${string}`,
        numOutcomes,
        resolutionTime,
        initialLiquidity,
      ],
    });
  };

  // Set admin
  const setAdmin = async (newAdmin: Address) => {
    if (!factoryAddress) throw new Error('Factory address required');
    
    writeContract({
      address: factoryAddress,
      abi: CategoricalMarketFactory,
      functionName: 'setAdmin',
      args: [newAdmin],
    });
  };

  // Set oracle
  const setOracle = async (newOracle: Address) => {
    if (!factoryAddress) throw new Error('Factory address required');
    
    writeContract({
      address: factoryAddress,
      abi: CategoricalMarketFactory,
      functionName: 'setOracle',
      args: [newOracle],
    });
  };

  // Transfer ownership
  const transferOwnership = async (newOwner: Address) => {
    if (!factoryAddress) throw new Error('Factory address required');
    
    writeContract({
      address: factoryAddress,
      abi: CategoricalMarketFactory,
      functionName: 'transferOwnership',
      args: [newOwner],
    });
  };

  // Renounce ownership
  const renounceOwnership = async () => {
    if (!factoryAddress) throw new Error('Factory address required');
    
    writeContract({
      address: factoryAddress,
      abi: CategoricalMarketFactory,
      functionName: 'renounceOwnership',
    });
  };

  return {
    // Constants
    maxOutcomes,
    minInitialLiquidity,
    minMarketDuration,

    // Addresses
    admin,
    collateralToken,
    feeManager,
    marketImplementation,
    oracleResolver,
    owner,
    socialPredictions,

    // Factory config
    factoryConfig,

    // Market lists
    allMarkets,
    activeMarkets,
    marketCount,

    // Conditional read hooks
    useMarketAtIndex,
    useIsMarket,
    useOutcomeToken,
    useLPToken,
    useMarketSummary,
    useMarketsByStatus,
    useRecentMarkets,
    useMarketSummaries,
    useMarketToOutcomeToken,
    useMarketToLPToken,

    // Write functions
    createMarket,
    setAdmin,
    setOracle,
    transferOwnership,
    renounceOwnership,

    // Refetch functions
    refetchFactoryConfig,
    refetchAllMarkets,
    refetchActiveMarkets,
    refetchMarketCount,

    // Transaction state
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    writeError,
  };
};