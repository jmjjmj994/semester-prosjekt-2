import { singleProfile } from "../api/api.js";
import { createCardElement, localStorageItems } from "../utils/utils.js";
const navbar = document.querySelector("[data-type-component='navbar']")
const header = document.querySelector("header")
const openSearch = document.querySelector("[data-type-header='open-search']").onclick = () => navbarSearchInput(true)


const navbarListeners = () => {
    const hamburgerBtn = document.querySelector('[data-header="hamburger-menu"]');
    const closeNavbar = document.querySelector("[data-type-navbar='close-menu']")
    hamburgerBtn.onclick = () => navbarToggler(true);
    closeNavbar.onclick = () => navbarToggler(false);
}
const navbarLiEl = () => {
    const li = document.querySelectorAll("[data-type-component='navbar-child-ul'] > li")
    return li
}

const navbarToggler = (value, search) => {
    if (value) {
        navbar.classList.add("isActive")
        navbarLiEl().forEach((li, index) => {
            li.style.transform = `translateX(0%)`
            li.style.transition = `all 250ms linear ${index * 20}ms`
        })
    } else {
        navbar.classList.remove("isActive")
        navbarLiEl().forEach((li, index) => {
            li.style.transform = `translateX(-${105}%)`
        })
    }
}

const navbarSearchInput = (value) => {
    const searchFormInput = document.querySelector("[data-type-component='navbar-form-input']");
    if (value) {
        navbar.classList.add("isActive")
        navbarLiEl().forEach((li, index) => {
            li.style.transform = `translateX(0%)`
            li.style.transition = `all 250ms linear ${index * 20}ms`

        })
        searchFormInput.focus()
    }
}

document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && !header.contains(e.target)) {
        navbar.classList.remove('isActive');
        navbarLiEl().forEach((li, index) => {
            li.style.transform = `translateX(-${105}%)`
        })
    }

})

document.addEventListener("DOMContentLoaded", (e) => {
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navbar.classList.contains("isActive")) {
            navbar.classList.remove("isActive")
        }
    })
})


const userAvatar = async () => {
    const profileImage = document.querySelector("[data-type-user='avatar']")
    const avatarLink = document.querySelector("[data-type-user='avatar-link']")
    if (localStorageItems && localStorageItems.userData && localStorageItems.userData.name) {
        const data = await singleProfile(localStorageItems.userData.name);
        avatarLink.href = "/profile.html";
        avatarLink.ariaLabel = "Link to profile page";
        profileImage.src = data && data.avatar ? data.avatar : "src/assets/blank-avatar.png";
    } else {
        profileImage.src = "src/assets/default-avatar.png";
        avatarLink.href = "/login.html";
    }


}



const initializer = () => {
    navbarListeners()
    userAvatar()

}
initializer()