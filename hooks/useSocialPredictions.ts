import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Address } from 'viem';
import { SocialPredictions } from '@/lib/abis/SocialPredictions';

export interface UserPrediction {
  user: Address;
  market: Address;
  predictedOutcome: number;
  metadataURI: string;
  timestamp: bigint;
  confidence: bigint;
}

export interface Comment {
  author: Address;
  market: Address;
  metadataURI: string;
  timestamp: bigint;
  upvotes: bigint;
  downvotes: bigint;
}

export interface UserStats {
  totalPredictions: bigint;
  correctPredictions: bigint;
  totalProfit: bigint;
  totalLoss: bigint;
  reputation: bigint;
  streak: bigint;
}

export interface UserStatsWithRank {
  stats: UserStats;
  winRate: bigint;
  rank: bigint;
}

export interface LeaderboardData {
  users: Address[];
  reputations: bigint[];
  winRates: bigint[];
}

export const useSocialPredictions = (contractAddress?: Address) => {
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // ============= READ FUNCTIONS - CONSTANTS =============

  const { data: maxLeaderboardSize } = useReadContract({
    address: contractAddress,
    abi: SocialPredictions,
    functionName: 'MAX_LEADERBOARD_SIZE',
    query: { enabled: !!contractAddress },
  }) as { data: bigint | undefined };

  const { data: owner } = useReadContract({
    address: contractAddress,
    abi: SocialPredictions,
    functionName: 'owner',
    query: { enabled: !!contractAddress },
  }) as { data: Address | undefined };

  // ============= READ FUNCTIONS - LEADERBOARD =============

  const useLeaderboard = (limit: number) => {
    const { data: leaderboard, refetch } = useReadContract({
      address: contractAddress,
      abi: SocialPredictions,
      functionName: 'getLeaderboard',
      args: [BigInt(limit)],
      query: { enabled: !!contractAddress && limit > 0 },
    }) as { data: LeaderboardData | undefined; refetch: () => void };

    return { leaderboard, refetch };
  };

  const useLeaderboardPosition = (index: number) => {
    const { data: userAddress, refetch } = useReadContract({
      address: contractAddress,
      abi: SocialPredictions,
      functionName: 'leaderboard',
      args: [BigInt(index)],
      query: { enabled: !!contractAddress && index >= 0 },
    }) as { data: Address | undefined; refetch: () => void };

    return { userAddress, refetch };
  };

  // ============= READ FUNCTIONS - USER DATA =============

  const useUserStats = (userAddress?: Address) => {
    const { data: userStatsData, refetch } = useReadContract({
      address: contractAddress,
      abi: SocialPredictions,
      functionName: 'getUserStats',
      args: userAddress ? [userAddress] : undefined,
      query: { enabled: !!contractAddress && !!userAddress },
    }) as { data: UserStatsWithRank | undefined; refetch: () => void };

    return { userStatsData, refetch };
  };

  const useUserStatsRaw = (userAddress?: Address) => {
    const { data: stats, refetch } = useReadContract({
      address: contractAddress,
      abi: SocialPredictions,
      functionName: 'userStats',
      args: userAddress ? [userAddress] : undefined,
      query: { enabled: !!contractAddress && !!userAddress },
    }) as { data: UserStats | undefined; refetch: () => void };

    return { stats, refetch };
  };

  const useUserPrediction = (userAddress?: Address, marketAddress?: Address) => {
    const { data: prediction, refetch } = useReadContract({
      address: contractAddress,
      abi: SocialPredictions,
      functionName: 'getUserPrediction',
      args: userAddress && marketAddress ? [userAddress, marketAddress] : undefined,
      query: { enabled: !!contractAddress && !!userAddress && !!marketAddress },
    }) as { data: UserPrediction | undefined; refetch: () => void };

    return { prediction, refetch };
  };

  const useUserPredictionRaw = (userAddress?: Address, marketAddress?: Address) => {
    const { data: prediction, refetch } = useReadContract({
      address: contractAddress,
      abi: SocialPredictions,
      functionName: 'userPredictions',
      args: userAddress && marketAddress ? [userAddress, marketAddress] : undefined,
      query: { enabled: !!contractAddress && !!userAddress && !!marketAddress },
    }) as { data: UserPrediction | undefined; refetch: () => void };

    return { prediction, refetch };
  };

  const useUserPredictionHistory = (userAddress?: Address, limit?: number) => {
    const { data: predictions, refetch } = useReadContract({
      address: contractAddress,
      abi: SocialPredictions,
      functionName: 'getUserPredictionHistory',
      args: userAddress && limit ? [userAddress, BigInt(limit)] : undefined,
      query: { enabled: !!contractAddress && !!userAddress && !!limit },
    }) as { data: UserPrediction[] | undefined; refetch: () => void };

    return { predictions, refetch };
  };

  const useUserPredictionHistoryRaw = (userAddress?: Address, index?: number) => {
    const { data: prediction, refetch } = useReadContract({
      address: contractAddress,
      abi: SocialPredictions,
      functionName: 'userPredictionHistory',
      args: userAddress && index !== undefined ? [userAddress, BigInt(index)] : undefined,
      query: { enabled: !!contractAddress && !!userAddress && index !== undefined },
    }) as { data: UserPrediction | undefined; refetch: () => void };

    return { prediction, refetch };
  };

  // ============= READ FUNCTIONS - COMMENTS =============

  const useMarketComments = (marketAddress?: Address, offset?: number, limit?: number) => {
    const { data: comments, refetch } = useReadContract({
      address: contractAddress,
      abi: SocialPredictions,
      functionName: 'getMarketComments',
      args: marketAddress && offset !== undefined && limit ? [marketAddress, BigInt(offset), BigInt(limit)] : undefined,
      query: { enabled: !!contractAddress && !!marketAddress && offset !== undefined && !!limit },
    }) as { data: Comment[] | undefined; refetch: () => void };

    return { comments, refetch };
  };

  const useMarketCommentRaw = (marketAddress?: Address, commentId?: number) => {
    const { data: comment, refetch } = useReadContract({
      address: contractAddress,
      abi: SocialPredictions,
      functionName: 'marketComments',
      args: marketAddress && commentId !== undefined ? [marketAddress, BigInt(commentId)] : undefined,
      query: { enabled: !!contractAddress && !!marketAddress && commentId !== undefined },
    }) as { data: Comment | undefined; refetch: () => void };

    return { comment, refetch };
  };

  const useHasVoted = (voteKey?: string) => {
    const { data: hasVoted, refetch } = useReadContract({
      address: contractAddress,
      abi: SocialPredictions,
      functionName: 'hasVoted',
      args: voteKey ? [voteKey as `0x${string}`] : undefined,
      query: { enabled: !!contractAddress && !!voteKey },
    }) as { data: boolean | undefined; refetch: () => void };

    return { hasVoted, refetch };
  };

  // ============= WRITE FUNCTIONS =============

  // Make prediction
  const makePrediction = async (
    market: Address,
    outcomeIndex: number,
    confidence: bigint,
    metadataURI: string
  ) => {
    if (!contractAddress) throw new Error('Contract address required');
    
    writeContract({
      address: contractAddress,
      abi: SocialPredictions,
      functionName: 'makePrediction',
      args: [market, outcomeIndex, confidence, metadataURI as `0x${string}`],
    });
  };

  // Post comment
  const postComment = async (
    market: Address,
    metadataURI: string
  ) => {
    if (!contractAddress) throw new Error('Contract address required');
    
    writeContract({
      address: contractAddress,
      abi: SocialPredictions,
      functionName: 'postComment',
      args: [market, metadataURI as `0x${string}`],
    });
  };

  // Vote on comment
  const voteOnComment = async (
    market: Address,
    commentId: bigint,
    isUpvote: boolean
  ) => {
    if (!contractAddress) throw new Error('Contract address required');
    
    writeContract({
      address: contractAddress,
      abi: SocialPredictions,
      functionName: 'voteOnComment',
      args: [market, commentId, isUpvote],
    });
  };

  // Update prediction result (owner only)
  const updatePredictionResult = async (
    user: Address,
    market: Address,
    winningOutcome: number,
    profit: bigint
  ) => {
    if (!contractAddress) throw new Error('Contract address required');
    
    writeContract({
      address: contractAddress,
      abi: SocialPredictions,
      functionName: 'updatePredictionResult',
      args: [user, market, winningOutcome, profit],
    });
  };

  // Transfer ownership
  const transferOwnership = async (newOwner: Address) => {
    if (!contractAddress) throw new Error('Contract address required');
    
    writeContract({
      address: contractAddress,
      abi: SocialPredictions,
      functionName: 'transferOwnership',
      args: [newOwner],
    });
  };

  // Renounce ownership
  const renounceOwnership = async () => {
    if (!contractAddress) throw new Error('Contract address required');
    
    writeContract({
      address: contractAddress,
      abi: SocialPredictions,
      functionName: 'renounceOwnership',
    });
  };

  return {
    // Constants
    maxLeaderboardSize,
    owner,

    // Conditional read hooks - Leaderboard
    useLeaderboard,
    useLeaderboardPosition,

    // Conditional read hooks - User data
    useUserStats,
    useUserStatsRaw,
    useUserPrediction,
    useUserPredictionRaw,
    useUserPredictionHistory,
    useUserPredictionHistoryRaw,

    // Conditional read hooks - Comments
    useMarketComments,
    useMarketCommentRaw,
    useHasVoted,

    // Write functions
    makePrediction,
    postComment,
    voteOnComment,
    updatePredictionResult,
    transferOwnership,
    renounceOwnership,

    // Transaction state
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    writeError,
  };
};