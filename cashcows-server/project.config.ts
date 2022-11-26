import GoerliConfig from 'data/goerli.json';
import EthereumConfig from 'data/ethereum.json';

export const host = 'www.cashcows.club';
export const api = 'api.cashcows.club';
export const cdn = 'cdn.cashcows.club';

export const networks = {
  goerli: GoerliConfig,
  ethereum: EthereumConfig
};

export const connectors = {
  coinbase: { appName: 'CashCowsClub' },
  walletconnect: { qrcode: true },
  injected: {
    name: 'MetaMask',
    shimDisconnect: true,
  }
};

export const toast = {
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
};