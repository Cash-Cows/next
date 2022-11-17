import { useState, useEffect } from 'react'; 
import { useConnectModal, useContract } from '@web3modal/react';
import { useAccount } from '@web3modal/react';
import { ethers } from 'ethers';
import axios from 'axios';

import GoerliConfig from 'data/ethereum.json';
import EthereumConfig from 'data/ethereum.json';
import { web3modalConfig } from 'project.config';

import {
  NetworkNames,
  MenuStates,
  Web3States,
  CrewDetailFormat
} from 'modules/ui/types';

export function usePanelMenus(): MenuStates {
  //remember main meny open/close states
  const [ mainMenuOpened, openMainMenu ] = useState(false);
  //remember user meny open/close states
  const [ userMenuOpened, openUserMenu ] = useState(false);
  //open or close the main menu
  const toggleMainMenu = () => {
    //open or close the main menu
    openMainMenu(!mainMenuOpened);
    //if the main menu is open
    if (!mainMenuOpened) {
      //close the user menu
      openUserMenu(false);
    }
  };
  //open or close the user menu
  const toggleUserMenu = () => {
    //open or close the user menu
    openUserMenu(!userMenuOpened);
    //if the user menu is open
    if (!userMenuOpened) {
      //close the main menu
      openMainMenu(false);
    }
  };

  return {
    main: {
      opened: mainMenuOpened,
      toggle: toggleMainMenu
    },
    user: {
      opened: userMenuOpened,
      toggle: toggleUserMenu
    }
  };
};

const networks = { goerli: GoerliConfig, ethereum: EthereumConfig };

export function useWeb3(
  network: NetworkNames = NetworkNames.ETHEREUM
): Web3States {
  //Hook: if the network changes update the network configs
  const [ networkConfig, setNetworkConfig ] = useState(networks[network]);
  //Hook: updates whenever the account changes, connected or disconnected
  const { account, isReady: accountReady } = useAccount();
  //Hook: CUSTOM: the current user tokens
  const [ tokens, setTokens ] = useState(null as CrewDetailFormat[]|null);
  //Hook: CUSTOM: loads the contract to get a users tokens
  const { contract } = useContract({
    address: networkConfig.contracts.index.address,
    abi: networkConfig.contracts.index.abi,
    signerOrProvider: new ethers.providers.JsonRpcProvider(
      networkConfig.chain_uri
    )
  });
  //states for the wallet modal connector thing..
  const { 
    isOpen: web3ModalIsOpen, 
    open: web3ModalOpen, 
    close: web3ModalClose 
  } = useConnectModal();

  //callback to change network configs based on the network name
  const changeNetwork = (network: NetworkNames) => {
    setNetworkConfig(networks[network]);
  };

  //regulate how often we are retrieving a user's tokens
  useEffect(() => {
    if (account?.address 
      && contract?.address 
      && networkConfig?.chain_name
    ) {
      axios.get(
        `/api/session/crew?address=${account.address}&network=${networkConfig.chain_name}`
      ).then(response => {
        if (response.data.error) {
          //TODO
          return;
        }

        setTokens(response.data.results);
      })
    } else {
      setTokens([]);
    }
  //only call this if the address, contract or network config has changed
  }, [ account.address, contract?.address, networkConfig.chain_name ]);

  return {
    network: {
      config: networkConfig,
      change: changeNetwork
    },
    modal: {
      config: web3modalConfig,
      opened: web3ModalIsOpen,
      open: web3ModalOpen,
      close: web3ModalClose
    },
    account: {
      info: account,
      ready: accountReady,
      crew: tokens
    }
  };
}