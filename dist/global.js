import { localStorageItems, blockElements } from "./js/utils/utils.js";
import { singleProfile } from "./js/api/api.js";

const profileAvatar = document.querySelector("[data-avatar]");
const profileCredit = document.querySelector("[data-credit]");
const loginLogout = document.querySelector("[data-login-logout ]")
export const register = document.querySelector("[data-signup ]")

//Modal
const modalProfile = document.querySelector("[data-profile-modal]");
const closeProfileModal = document.querySelector("[data-profile-modal-close]");
const profileModalSettings = document.querySelector("[data-profile-modal-settings]");





const hasToken = () => {




   /*  let registerActive = false; */
    if (localStorageItems.token) {
        loginLogout.textContent = "Logg ut"
        loginLogout.href = "./login.html"
        register.textContent = "Min profil"
        profileCredit.textContent = `Kreddit: ${localStorageItems.userData.credits}`
        register.href = ""
        register.role = "button"
       /*  registerActive = true;
        openProfileModal(register, registerActive) */
    }


    if (localStorageItems.userData.avatar) {
        profileAvatar.src = localStorageItems.userData.avatar
        profileAvatar.alt = "";

    } else {
        profileAvatar.src = "dist/assets/blank-avatar.png"
        profileAvatar.alt = "";
      /*   registerActive = false; */

    }


}


hasToken()

const noToken = () => {
    profileAvatar.src = "dist/assets/blank-avatar.png"
    loginLogout.textContent = "Logg inn"
    loginLogout.href = "./index.html"
    register.textContent = "Registrer"

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

loginLogout.addEventListener("click", (e) => {
    localStorage.removeItem("user-token")
})




//Profile



const profileData = localStorageItems.userData;


//Profile



