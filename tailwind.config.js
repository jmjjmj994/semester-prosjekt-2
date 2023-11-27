/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './dist/**/*.js',
    './components/**/*.{html,js}',
    './index.html',
    './signup.html',
    './login.html'
  ],

 theme:{
  extend: {
 screens: {
  "sm": "350px",
  "md": "768px",
  "lg" :"1024px"
 },
  

    colors:{
      "primary": "	hsl(37, 100%, 96%)",
      "secondary": "		hsl(0, 0%, 95%)",
      "accent": "hsl(22, 100%, 35%)",
      "secondary-cta": "	hsl(270, 6%, 6%)"
      
    

    },

    border: {
      "accent-border": "hsl(22, 100%, 35%)",
      
    }
  } 
},

}