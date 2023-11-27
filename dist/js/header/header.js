import { blockElements } from "../utils/utils.js";
/* ==== Search modal ==== */
const openSearchContainer = document.querySelector("[data-open-search]");
const closeSearchContainer = document.querySelector("[data-close-search]");
const searchContainer = document.querySelector(".search-container")
const searchInput = document.getElementById("search-input")
const clearSearchInput = document.querySelector("[data-clear-search")

openSearchContainer.onclick = () => searchContainerToggler(true);
closeSearchContainer.onclick = () => searchContainerToggler(false);
const searchContainerToggler = (value) => {
    if (value) {
        searchContainer.classList.add("isActive");
        searchInput.focus()

    } else {
        searchContainer.classList.remove("isActive");


    }
}





searchInput.addEventListener("input", (e) => {
    clearSearchInput.onclick = () => clearValue(true)

})
const clearValue = (state) => {
    if (state) {
        searchInput.value = "";
    }
}

/* ==== Search modal ==== */



const hamburger = document.querySelector("[data-hamburger]")
const navClose = document.querySelector("[data-close-nav]")

hamburger.onclick = () => navbarToggler(true);
navClose.onclick = () => navbarToggler(false)


const navbarToggler = (value) => {
    const navbar = document.querySelector("[data-navbar]")
    if(value) {
        navbar.classList.add("isActive")

        
    } else {
        navbar.classList.remove("isActive")
    }
}



const navbarDropdownButton = document.querySelector("[data-navbar-dropdown-toggler]")

navbarDropdownButton.onclick = () => navbarDropdownToggler()

const navbarDropDownMenuItems = document.querySelectorAll("[data-navbar-dropdown-menu] > li")
console.log(navbarDropDownMenuItems)



const navbarDropdownToggler = (value) => {
    const navbarDropdownMenu = document.querySelector("[data-navbar-dropdown-menu]");
    const navbarDropdownMenuAngle = document.querySelector("[data-navbar-dropdown-angle]");
 
    navbarDropdownMenu.classList.toggle("isActive")
   navbarDropdownMenuAngle.classList.toggle("isActive")

 /*    const navbarDropdownMenu = document.querySelector("[data-navbar-dropdown-menu]");
    const navbarDropdownMenuAngle = document.querySelector("[data-navbar-dropdown-angle]");
    navbarDropdownMenu.className ="pl-1"
    console.log("Hih") */
}