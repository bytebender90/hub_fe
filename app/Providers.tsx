"use client"
import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { WalletConfig } from '@/config/config';

const injected = injectedModule()
const appMetadata = {
  name: 'Test Project',
  icon: '<svg>Test project</svg>',
  description: 'Test project',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
  ]
}

const web3Onboard = init({
  wallets: [ injected ],
  connect: { autoConnectLastWallet: true },
  chains: [{
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${WalletConfig.INFURA_KEY}`
  }],
  appMetadata,
})

export default function Providers({
  children
}: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient());

  return (
    <AppRouterCacheProvider>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <QueryClientProvider client={client}>
          { children }
        </QueryClientProvider>
      </Web3OnboardProvider>
    </AppRouterCacheProvider>
  )
} 