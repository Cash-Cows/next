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

export const currencies = [
  'eth', 'weth', 'usdc', 
  'link', 'uni', 'ape', 
  'sand', 'mana', 'gala'
];

export const quotes = [
  'I thought you loved moo.',
  'Moo! Don\'t do it!',
  'Do you want Sacowfice me?',
  'I thought we had something together.',
  'I thought we would grow old together.',
  'Bitch Im a cow. Moo0ooOoove!',
  'Moo. Get rich or die trying...',
  'Buh Bye.',
  'Let\'s get rich together?',
  'Moo. I dare you.',
  'Moo! Do not press that button.',
  'Why me?!?',
  'My milkshake brings all the ETH to the barn.',
  'I have special perks in the end.',
  'What did I do wrong?',
  'I\'m heart broken.',
  'No. Your not worthy.',
  'What did I do to you?',
  'You will not receive 1 steak.',
  'Burn me later for 2 steaks...'
];