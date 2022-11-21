//connectors
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
//providers
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
//config
import { networks, connectors } from 'project.config';
import { defaultChains, configureChains, createClient } from 'wagmi';

//Configure chains & providers with whatever was set in the config.
const { chains, provider } = configureChains(defaultChains, [
  jsonRpcProvider({
    rpc: (chain) => {
      for (const network of Object.values(networks)) {
        if (network.id === chain.id) {
          return {
            http: network.rpc.http,
            webSocket: network.rpc.wss,
          };
        }
      }

      return null;
    }
  }),
  publicProvider()
]);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({ chains, options: connectors.coinbase }),
    new WalletConnectConnector({ chains, options: connectors.walletconnect })
  ],
  provider
});

export { networks, client };