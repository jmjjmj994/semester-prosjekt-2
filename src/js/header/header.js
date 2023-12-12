import { singleProfile } from "../api/api.js";
import { localStorageItems } from "../utils/utils.js";
const navbar = document.querySelector("[data-type-component='navbar']")
const header = document.querySelector("header")
 const navbarListeners = () => {
    const hamburgerBtn = document.querySelector('[data-header="hamburger-menu"]');
    const closeNavbar = document.querySelector("[data-type-navbar='close-menu']")
    hamburgerBtn.onclick = () => navbarToggler(true);
    closeNavbar.onclick = () => navbarToggler(false);
}

const navbarToggler = (value) => {
    if(value) {
        navbar.classList.add("isActive")
    } else {
        navbar.classList.remove("isActive")
    }
}



const userAvatar =  async () => {
    const data = await singleProfile(localStorageItems.userData.name)
    console.log(data)
    const profileImage = document.querySelectorAll("[data-type-user='avatar']")
    if (localStorageItems && localStorageItems.token) {
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