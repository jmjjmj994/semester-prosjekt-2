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
    "./test.html"
  ],

  theme: {
    extend: {
      screens: {
        "sm": "350px",
        "md": "768px",
        "lg": "1024px"
      },


      colors: {
        custom :{
          background: "var(--background)",
          secondary: "var(--secondary)",
          accent:"var(--accent)",
          special:"var(--special)",
          text:"var(--text)",
          
        
        },
       joker: {
         funny:"#cc6e32"
       }
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