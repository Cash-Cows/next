/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './modules/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tint: 'rgba(0, 0, 0, 0.25)'
      },
      fontFamily: {
        courier: ['Courier', 'monospace'],
        pixel: ['"Press Start 2P"', 'Courier', 'monospace'],
        awesome: ['"Font Awesome 5 Free"']
      },
      backgroundImage: {
        barn: 'url(https://cdn.cashcows.club/website/background/bg-barn.png)',
        market: 'url(https://cdn.cashcows.club/website/background/bg-market.png)',
        loot: 'url(https://cdn.cashcows.club/website/background/bg-loot.png)',
        hustle: 'url(https://cdn.cashcows.club/website/background/bg-hustle.png)',
        cribs: 'url(https://cdn.cashcows.club/website/background/bg-cribs.png)',
        leaderboard: 'url(https://cdn.cashcows.club/website/background/bg-leader.gif)',
        member: 'url(https://cdn.cashcows.club/website/background/bg-member.png)',
        transblock: 'url(https://cdn.cashcows.club/website/background/bg-transparent.jpg)',
        soon: 'url(https://cdn.cashcows.club/website/background/bg-soon.png)',
        dirt1: 'url(https://cdn.cashcows.club/website/about/dirt-1.png)',
        dirt2: 'url(https://cdn.cashcows.club/website/about/dirt-2.png)',
        treasure: 'url(https://cdn.cashcows.club/website/about/about-bg-treasure.gif)',
        'pixel-btn-secondary-left': 'url(https://cdn.cashcows.club/website/button/btn-secondary-left.png)',
        'pixel-btn-secondary-right': 'url(https://cdn.cashcows.club/website/button/btn-secondary-right.png)',
        'pixel-btn-secondary-center': 'url(https://cdn.cashcows.club/website/button/btn-secondary-center.png)',
        'pixel-btn-warning-left': 'url(https://cdn.cashcows.club/website/button/btn-warning-left.png)',
        'pixel-btn-warning-right': 'url(https://cdn.cashcows.club/website/button/btn-warning-right.png)',
        'pixel-btn-warning-center': 'url(https://cdn.cashcows.club/website/button/btn-warning-center.png)',
        'pixel-btn-success-left': 'url(https://cdn.cashcows.club/website/button/btn-success-left.png)',
        'pixel-btn-success-right': 'url(https://cdn.cashcows.club/website/button/btn-success-right.png)',
        'pixel-btn-success-center': 'url(https://cdn.cashcows.club/website/button/btn-success-center.png)'
      },
      backgroundPosition: {
        'center-left': 'center left'
      },
      backgroundSize: {
        'h-full': 'auto 100%'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
