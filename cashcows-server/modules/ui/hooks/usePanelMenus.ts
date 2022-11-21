import { useState } from 'react'; 

export default function usePanelMenus() {
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