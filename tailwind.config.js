/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',

  content: [
    './src/**/*.js',
    './index.html',
    './signup.html',
    './login.html',
    './profile.html',
    './listing.html',
    "./bidding.html",
    "./specific.html",
    "./overview.html",
    "./edit.html"

  ],

  theme: {
    extend: {
      screens: {
       
        "sm": "375px",
        "md": "768px",
        "lg": "1024px"
      },


      colors: {

        custom: {
          background: 'hsl(var(--color-background))',
          secondary: 'hsl(var(--color-secondary))',
          tertiary: 'hsl(var(--color-tertiary))',
          btnBgAccent: 'hsl(var(--color-btn-bg--accent))',
          btnBgSpecial: 'hsl(var(--color-btn-bg--special))',
          btnBgSmall: 'hsl(var(--color-btn-bg--small))',
          textHeaders: 'hsl(var(--color-text-headers))',
          textRegular: 'hsl(var(--color-text))',},

        typography:{
          primary: 'hsl(var(--color-text-primary))',
          accent:`hsl(var(--color-text-accent))`
        },



      },

      border: {
        "accent-border": "hsl(22, 100%, 35%)",

      }
    }
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],

}