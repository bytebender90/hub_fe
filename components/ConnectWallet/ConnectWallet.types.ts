export interface ConnectWalletTypes {
  onConnect?: (address: string) => void,
  onDisconnect?: () => void,
}