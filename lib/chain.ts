import { Chain } from 'viem';

export const blockdagPrimordial = {
  id: 1043,
  name: 'BlockDAG Primordial',
  nativeCurrency: {
    decimals: 18,
    name: 'BlockDAG',
    symbol: 'BDAG',
  },
  rpcUrls: {
    default: {
      http: ['https://relay.awakening.bdagscan.com'],
    }
  },
  blockExplorers: {
    default: {
      name: 'BDAGScan',
      url: 'https://primordial.bdagscan.com',
    },
  },
} as const satisfies Chain; 