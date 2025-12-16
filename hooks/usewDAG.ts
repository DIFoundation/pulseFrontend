import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Address } from 'viem';
import { wDAG } from '@/lib/abis/wDAG';

export const useWDAG = (tokenAddress?: Address) => {
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // ============= READ FUNCTIONS - TOKEN INFO =============

  const { data: name } = useReadContract({
    address: tokenAddress,
    abi: wDAG,
    functionName: 'name',
    query: { enabled: !!tokenAddress },
  }) as { data: string | undefined };

  const { data: symbol } = useReadContract({
    address: tokenAddress,
    abi: wDAG,
    functionName: 'symbol',
    query: { enabled: !!tokenAddress },
  }) as { data: string | undefined };

  const { data: decimals } = useReadContract({
    address: tokenAddress,
    abi: wDAG,
    functionName: 'decimals',
    query: { enabled: !!tokenAddress },
  }) as { data: number | undefined };

  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    address: tokenAddress,
    abi: wDAG,
    functionName: 'totalSupply',
    query: { enabled: !!tokenAddress },
  }) as { data: bigint | undefined; refetch: () => void };

  const { data: owner } = useReadContract({
    address: tokenAddress,
    abi: wDAG,
    functionName: 'owner',
    query: { enabled: !!tokenAddress },
  }) as { data: Address | undefined };

  // ============= CONDITIONAL READ HOOKS =============

  // Get balance of address
  const useBalanceOf = (account?: Address) => {
    const { data: balance, refetch } = useReadContract({
      address: tokenAddress,
      abi: wDAG,
      functionName: 'balanceOf',
      args: account ? [account] : undefined,
      query: { enabled: !!tokenAddress && !!account },
    }) as { data: bigint | undefined; refetch: () => void };

    return { balance, refetch };
  };

  // Get allowance
  const useAllowance = (ownerAddress?: Address, spenderAddress?: Address) => {
    const { data: allowance, refetch } = useReadContract({
      address: tokenAddress,
      abi: wDAG,
      functionName: 'allowance',
      args: ownerAddress && spenderAddress ? [ownerAddress, spenderAddress] : undefined,
      query: { enabled: !!tokenAddress && !!ownerAddress && !!spenderAddress },
    }) as { data: bigint | undefined; refetch: () => void };

    return { allowance, refetch };
  };

  // ============= WRITE FUNCTIONS =============

  // Transfer tokens
  const transfer = async (to: Address, value: bigint) => {
    if (!tokenAddress) throw new Error('Token address required');
    
    writeContract({
      address: tokenAddress,
      abi: wDAG,
      functionName: 'transfer',
      args: [to, value],
    });
  };

  // Transfer from
  const transferFrom = async (from: Address, to: Address, value: bigint) => {
    if (!tokenAddress) throw new Error('Token address required');
    
    writeContract({
      address: tokenAddress,
      abi: wDAG,
      functionName: 'transferFrom',
      args: [from, to, value],
    });
  };

  // Approve spender
  const approve = async (spender: Address, value: bigint) => {
    if (!tokenAddress) throw new Error('Token address required');
    
    writeContract({
      address: tokenAddress,
      abi: wDAG,
      functionName: 'approve',
      args: [spender, value],
    });
  };

  // Mint tokens (owner only)
  const mint = async (to: Address, amount: bigint) => {
    if (!tokenAddress) throw new Error('Token address required');
    
    writeContract({
      address: tokenAddress,
      abi: wDAG,
      functionName: 'mint',
      args: [to, amount],
    });
  };

  // Burn tokens
  const burn = async (amount: bigint) => {
    if (!tokenAddress) throw new Error('Token address required');
    
    writeContract({
      address: tokenAddress,
      abi: wDAG,
      functionName: 'burn',
      args: [amount],
    });
  };

  // Transfer ownership
  const transferOwnership = async (newOwner: Address) => {
    if (!tokenAddress) throw new Error('Token address required');
    
    writeContract({
      address: tokenAddress,
      abi: wDAG,
      functionName: 'transferOwnership',
      args: [newOwner],
    });
  };

  // Renounce ownership
  const renounceOwnership = async () => {
    if (!tokenAddress) throw new Error('Token address required');
    
    writeContract({
      address: tokenAddress,
      abi: wDAG,
      functionName: 'renounceOwnership',
    });
  };

  return {
    // Token info
    name,
    symbol,
    decimals,
    totalSupply,
    owner,

    // Conditional read hooks
    useBalanceOf,
    useAllowance,

    // Write functions
    transfer,
    transferFrom,
    approve,
    mint,
    burn,
    transferOwnership,
    renounceOwnership,

    // Refetch functions
    refetchTotalSupply,

    // Transaction state
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    writeError,
  };
};