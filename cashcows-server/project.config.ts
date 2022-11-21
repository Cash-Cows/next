import GoerliConfig from 'data/goerli.json';
import EthereumConfig from 'data/ethereum.json';

const host = 'www.cashcows.club';

const networks = {
  goerli: GoerliConfig,
  ethereum: EthereumConfig
};

const connectors = {
  coinbase: { appName: 'CashCowsClub' },
  walletconnect: { qrcode: true },
  injected: {
    name: 'MetaMask',
    shimDisconnect: true,
  }
};

const toast = {
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
};

export { host, networks, connectors, toast };