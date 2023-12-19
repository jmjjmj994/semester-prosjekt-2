import { singleProfile } from "../api/api.js";
import { localStorageItems } from "../utils/utils.js";
const navbar = document.querySelector("[data-type-component='navbar']")
const header = document.querySelector("header")
const headerOverlay = document.querySelector("[data-header='overlay']")
const openOverlay = document.querySelector("[data-type-header='open-overlay']")
const profileImage = document.querySelectorAll("[data-type-user='avatar']")
const userContainer = document.querySelector("[data-type-navbar='user-container']")
const searchFormInput = document.querySelector("[data-type-component='navbar-form-input']");
const openSearch = document.querySelector("[data-type-header='open-search']")

openOverlay.onclick = () => overlayToggler()

openSearch.onclick = () => navbarSearchInput(true)
const navbarListeners = () => {
    const hamburgerBtn = document.querySelector('[data-header="hamburger-menu"]');
    const closeNavbar = document.querySelector("[data-type-navbar='close-menu']")
    hamburgerBtn.onclick = () => navbarToggler(true);
    closeNavbar.onclick = () => navbarToggler(false);
}

const navbarToggler = (value, search) => {
    if (value) {
        navbar.classList.add("isActive")
    } else {
        navbar.classList.remove("isActive")
    }
}

const navbarSearchInput = (value) => {
    if(value) {
        navbar.classList.add("isActive")
        searchFormInput.focus()
    }
}

const overlayToggler = () => {
    headerOverlay.classList.toggle("isActive")
}


document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && !header.contains(e.target)) {
        navbar.classList.remove('isActive');
    }
    if (!headerOverlay.contains(e.target) && !userContainer.contains(e.target)) {
        headerOverlay.classList.remove("isActive")
    }
})


const userAvatar = async () => {
console.log(localStorageItems.userData)

    if (localStorageItems && localStorageItems.token &&localStorageItems.userData.avatar) {
        const data = await singleProfile(localStorageItems.userData.name)
        profileImage.forEach(img => {
            img.src = data.avatar
        })
    } else {
        profileImage.forEach(img => {
            img.src = "src/assets/blank-avatar.png"
        })
    }
    

}
userAvatar()







const initializer = () => {
    navbarListeners()


}
initializer()