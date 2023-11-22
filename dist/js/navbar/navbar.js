
const hamburger = document.querySelector("[data-hamburger]");
const buttonCloseNav = document.querySelector("[data-navbar-close]")
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
/* Navbar ^*/


const openSearchContainer = document.querySelector("[data-open-search-form]")
const searchContainer = document.querySelector(".search-container")
openSearchContainer.addEventListener("click", (e) => {

    searchContainer.classList.toggle("active")
})
/* btnSearchWrapper.addEventListener("click", (e) => {
searchWrapper.classList.add("active")

}) */