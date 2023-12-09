import { localStorageItems, createCardElement } from "./js/utils/utils.js";
import { singleProfile } from "./js/api/api.js";


console.log(localStorageItems.token)



/* 
window.addEventListener('storage', function (e) {
  console.log("something")
}); */


const userAvatar = () => {
    const profileImage = document.querySelector("[data-type-navbar='profile-avatar']")
    if (localStorageItems.userData && localStorageItems.userData.userAvatar) {
        profileImage.src = localStorageItems.userData.userAvatar;
    } else {
        profileImage.src = "src/assets/blank-avatar.png";
    }
}

const navbarLinks = () => {
    const logInLogOut = document.querySelector("[data-type-navbar='login-logout-link']")
    const listingLink = document.querySelector("[data-type-navbar='listing-link']")
    const profileLink = document.querySelector("[data-type-navbar='profile-link']")
    if (localStorageItems.token ) {
      logInLogOut.textContent ="Logg ut"
      logInLogOut.href ="/index.html"
      logInLogOut.onclick = () => clearToken()
    } else {
       logInLogOut.textContent = "Logg inn"
        logInLogOut.href = "/login.html"
    }

}

function clearToken () {
    localStorage.removeItem("user-data")
    localStorage.removeItem("user-token")
}

const initializer = () => {
    navbarLinks()
  userAvatar()
}
initializer()



/* 
const profileAvatar = document.querySelectorAll("[data-avatar]");
const profileCredit = document.querySelector("[data-credit]");
const loginLogout = document.querySelectorAll("[data-login-logout ]")
const navbarName = document.querySelector("[data-navbar-name]")
export const register = document.querySelectorAll("[data-signup ]")


const modalProfile = document.querySelector("[data-profile-modal]");
const closeProfileModal = document.querySelector("[data-profile-modal-close]");
const profileModalSettings = document.querySelector("[data-profile-modal-settings]");





const hasToken = () => {

    if (localStorageItems.token) {
        loginLogout[0].textContent = "Logg ut"
        loginLogout[0].href = "./login.html"
        loginLogout[1].textContent = "Logg ut"
        loginLogout[1].href = "./login.html"
        register[0].textContent = "Min profil"
        register[0].href = "/profile.html"
        register[0].role = "button"
        register[1].textContent = "Min profil"
        register[1].href = "/profile.html"
        register[1].role = "button"


        profileCredit.textContent = `${localStorageItems.userData.credits}`

    }


    if (localStorageItems.userData.avatar) {
        profileAvatar[0].src = localStorageItems.userData.avatar
        profileAvatar[1].src = localStorageItems.userData.avatar
        profileAvatar[0].alt = "";
        profileAvatar[1].alt = "";
        navbarName.textContent = localStorageItems.userData.name

    }


}




const noToken = () => {
    navbarName.textContent = "Lag en konto"
    profileAvatar[0].src = "dist/assets/blank-avatar.png"
    profileAvatar[1].src = "dist/assets/blank-avatar.png"
    profileAvatar[0].alt = "";
    profileAvatar[1].alt = "";
    loginLogout[0].textContent = "Logg inn"
    loginLogout[0].href = "./login.html"
    loginLogout[1].textContent = "Logg inn"
    loginLogout[1].href = "./login.html"
    register[0].textContent = "Registrer"
    register[1].textContent = "Registrer"

}



const determineState = () => {
    if (localStorageItems.token) {
        hasToken()
    } else {
        noToken()
    }
}



determineState()



const monitorPage = () => {
    if (window.location.pathname === "/login.html") {
        loginLogout.textContent = "";
    } else if (window.location.pathname === "/signup.html") {
        loginLogout.href = "/login.html"
    }

}
monitorPage()
loginLogout[0].addEventListener("click", (e) => {
    localStorage.removeItem("user-token")
})
loginLogout[1].addEventListener("click", (e) => {
    localStorage.removeItem("user-token")
})









 */






//https://api.noroff.dev/api/v1/auction/listings?_tag=test


