import { localStorageItems } from "./js/utils/utils.js";
import { singleProfile } from "./js/api/api.js";
const profileAvatar = document.querySelector("[data-avatar]");
const profileCredit = document.querySelector("[data-credit]");
const loginLogout = document.querySelector("[data-login-logout ]")
const register = document.querySelector("[data-signup ]")
const modalProfile = document.querySelector("[data-modal-profile]");




console.log(localStorageItems)


const hasToken = () => {




    let registerActive = false;
    if (localStorageItems.token) {
        loginLogout.textContent = "Logg ut"
        loginLogout.href = "./login.html"
        register.textContent = "Min profil"
        profileCredit.textContent = `Kreddit: ${localStorageItems.userData.credits}`
        register.href = ""
        register.role = "button"
        registerActive = true;
        triggerModal(register, registerActive)
    }


    if (localStorageItems.userData.avatar) {
        profileAvatar.src = localStorageItems.userData.avatar
        profileAvatar.alt = "";

    } else {
        profileAvatar.src = "dist/assets/blank-avatar.png"
        profileAvatar.alt = "";
        registerActive = false;

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

function triggerModal(btn, value) {
    console.log(value)
    btn.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("cative")
        modalProfile.className = "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary w-auto h-auto flex"
    })
}


const profileData = localStorageItems.userData;
console.log(profileData)


//Profile



