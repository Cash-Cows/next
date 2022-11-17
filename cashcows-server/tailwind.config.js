/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './modules/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        courier: ['"Courier New"', 'Courier', 'monospace'],
        pixel: ['"Press Start 2P"', '"Courier New"', 'Courier', 'monospace'],
        awesome: ['"Font Awesome 5 Free"']
      },
      backgroundImage: {
        barn: 'url(/images/bg-barn.png)',
        market: 'url(/images/bg-market.png)',
        loot: 'url(/images/bg-loot.png)',
        hustle: 'url(/images/bg-hustle.png)',
        cribs: 'url(/images/bg-cribs.png)',
        leaderboard: 'url(/images/bg-leaderboard.png)',
        member: 'url(/images/bg-member.png)',
        soon: 'url(/images/bg-soon.png)'
      },
      backgroundPosition: {
        'center-left': 'center left'
      },
      backgroundSize: {
        'h-full': 'auto 100%'
      }
    },
  },
  plugins: [],
}
