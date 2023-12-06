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
          accent: 'hsl(var(--color-accent))',
          special: 'hsl(var(--color-special))',},

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