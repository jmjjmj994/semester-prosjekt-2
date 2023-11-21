
const hamburger = document.querySelector("[data-hamburger]");
const buttonCloseNav = document.querySelector("[data-navbar-close]")
/* const searchWrapper = document.querySelector("[data-search-wrapper]")
const btnSearchWrapper = document.querySelector("[data-open-search-btn]") */


/* hamburger.addEventListener("click", (e) => {
    let menuOpen = false;
    if (!menuOpen) {
        navbar.classList.toggle("active")
        hamburger.classList.toggle("active")
    }

}) */
const navbar = document.querySelector("[data-navbar]");

hamburger.onclick = () => toggleNavbar(true)
buttonCloseNav.onclick = () => toggleNavbar(false)


function toggleNavbar (status) {

 if(status) {
    navbar.classList.add("active");
 }  else {
    navbar.classList.remove("active");
 }

}


console.log(navbar)


/* btnSearchWrapper.addEventListener("click", (e) => {
searchWrapper.classList.add("active")

}) */