

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




/* Clear input value */
searchInput.addEventListener("input", (e) => {
    clearSearchInput.onclick = () => clearValue(true)

})
const clearValue = (state) => {
    if (state) {
        searchInput.value = "";
    }
}
/* Clear input value */

/* ==== Search modal ==== */



const hamburger = document.querySelector("[data-hamburger]")
const navClose = document.querySelector("[data-close-nav]")
const navbar = document.querySelector("[data-navbar]")
hamburger.onclick = () => navbarToggler(true);
navClose.onclick = () => navbarToggler(false)


const navbarToggler = (value) => {
    if(value) {
        navbar.classList.add("isActive")
    } else {
        navbar.classList.remove("isActive")
    }
}


/* const header = document.querySelector("[data-header]");


header.addEventListener("click", (e) => {
   if(e.target.tagName === "NAV") {
    console.log(e.target)
   }
}) */