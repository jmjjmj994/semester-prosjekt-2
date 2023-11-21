/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './dist/**/*.js',
    './components/**/*.{html,js}',
    './index.html'
  ],

 theme:{
 screens: {
  "sm": "350px",
  "md": "768px",
  "lg" :"1024px"
 },


    colors:{
     "primary": "	hsl(270, 6%, 6%)",
     "secondary": "hsl(257, 7%, 19%)",
      "accent": "hsl(78%, 88%, 67%)",
      "comp" : "hsl(249, 91%, 68%)",
      "accent": "	hsl(78, 88%, 67%)"

    }

  } 

}