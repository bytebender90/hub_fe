"use client"

import React, { useCallback } from 'react';
import { useEffect, useState } from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'
import type {
  TokenSymbol
} from '@web3-onboard/common'
import { Button } from '@mui/material';

import { ConnectWalletTypes } from './ConnectWallet.types';

interface Account {
  address: string,
  balance: Record<TokenSymbol, string> | null,
  ens: { name: string | undefined, avatar: string | undefined }
}

const ConnectWallet: React.FC<ConnectWalletTypes> = ({
  onConnect,
  onDisconnect,
}) => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [ethersProvider, setProvider] = useState<ethers.providers.Web3Provider | null>()
  const [account, setAccount] = useState<Account | null>(null)

  useEffect(() => {
    if (wallet?.provider) {
      const { name, avatar } = wallet?.accounts[0].ens ?? {}
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url }
      })
    }
  }, [wallet])

  useEffect(() => {
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    }
  }, [wallet])

  const onConnectWallet = useCallback(() => {
    connect()
    .then((value) => {
      if (onConnect) onConnect(value[0].accounts[0].address);
    })
  }, [connect, onConnect])

  const onDisconnectWallet = useCallback(() => {
    if (wallet?.label) {
      disconnect({ label: wallet?.label || '' })
      .then(() => {
        if (onDisconnect) onDisconnect();
      })
    }
  }, [disconnect, wallet, onDisconnect]);

  if (wallet?.provider && account) {
    return (
      <div>
        <div>{account.ens?.name ? account.ens.name : account.address}</div>
        <button onClick={() => { onDisconnectWallet }}>Disconnect</button>
      </div>
    )
  }

  return (
    <div>
      <Button
        disabled={connecting}
        onClick={onConnectWallet}>
        Connect
      </Button>
    </div>
  )
}

ConnectWallet.displayName = 'ConnectWallet';

export default ConnectWallet;