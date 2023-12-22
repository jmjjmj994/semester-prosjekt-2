import { singleProfile } from "../api/api.js";
import { createCardElement, localStorageItems } from "../utils/utils.js";
const navbar = document.querySelector("[data-type-component='navbar']")
const header = document.querySelector("header")
const profileImage = document.querySelector("[data-type-user='avatar']")

const userContainer = document.querySelector("[data-type-navbar='user-container']")
const searchFormInput = document.querySelector("[data-type-component='navbar-form-input']");
const openSearch = document.querySelector("[data-type-header='open-search']")
const navbarUlLi = document.querySelectorAll("[data-type-component='navbar-child-ul'] > li")



openSearch.onclick = () => navbarSearchInput(true)
const navbarListeners = () => {
    const hamburgerBtn = document.querySelector('[data-header="hamburger-menu"]');
    const closeNavbar = document.querySelector("[data-type-navbar='close-menu']")
    hamburgerBtn.onclick = () => navbarToggler(true);
    closeNavbar.onclick = () => navbarToggler(false);
}
/* navbarUlLi.forEach((li, index) => {
    li.style.transform = `translateX(-${105}%)`

}) */
const navbarToggler = (value, search) => {
    if (value) {
        navbar.classList.add("isActive")
        navbarUlLi.forEach((li, index) => {
            li.style.transform = `translateX(0%)`
            li.style.transition = `all 250ms linear ${index * 20}ms`
        })
    } else {
        navbar.classList.remove("isActive")
        navbarUlLi.forEach((li, index) => {
            li.style.transform = `translateX(-${105}%)`
        })
    }
}

const navbarSearchInput = (value) => {
    if(value) {
        navbar.classList.add("isActive")
        navbarUlLi.forEach((li, index) => {
            li.style.transform = `translateX(0%)`
            li.style.transition = `all 250ms linear ${index * 20}ms`

        })
        searchFormInput.focus()
    }
}




document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && !header.contains(e.target)) {
        navbar.classList.remove('isActive');
        navbarUlLi.forEach((li, index) => {
            li.style.transform = `translateX(-${105}%)`
        })
    }
 
})

document.addEventListener("DOMContentLoaded", (e) => {
   document.addEventListener("keydown", (e) =>{
    if(e.key === "Escape" && navbar.classList.contains("isActive")) {
      navbar.classList.remove("isActive")
    }
   })
})


const userAvatar = async () => {
    const avatarLink = document.querySelector("[data-type-user='avatar-link']")

    const data = await singleProfile(localStorageItems.userData.name)
  
    if(localStorageItems) {
        avatarLink.href = "/profile.html"
        avatarLink.ariaLabel = "Link to profile page"
        profileImage.src = data.avatar
    } else {
        profileImage.src = "src/assets/blank-avatar.png"
        avatarLink.href = "/profile.html"
    }

    

}





const initializer = () => {
    navbarListeners()
userAvatar()

}
initializer()