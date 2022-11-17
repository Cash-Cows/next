const web3modalConfig = {
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  theme: 'dark' as 'dark',
  accentColor: 'default' as 'default',
  ethereum: {
    appName: 'CashCowsClub'
  }  
}

export { web3modalConfig }