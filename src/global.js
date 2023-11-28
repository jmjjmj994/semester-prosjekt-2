import { localStorageItems } from "./js/utils/utils.js";
import { singleProfile } from "./js/api/api.js";

const profileAvatar = document.querySelectorAll("[data-avatar]");
const profileCredit = document.querySelector("[data-credit]");
const loginLogout = document.querySelector("[data-login-logout ]")
const navbarName = document.querySelector("[data-navbar-name]")
export const register = document.querySelector("[data-signup ]")

//Modal
const modalProfile = document.querySelector("[data-profile-modal]");
const closeProfileModal = document.querySelector("[data-profile-modal-close]");
const profileModalSettings = document.querySelector("[data-profile-modal-settings]");





const hasToken = () => {

    if (localStorageItems.token) {
        loginLogout.textContent = "Logg ut"
        loginLogout.href = "./login.html"
        register.textContent = "Min profil"
        profileCredit.textContent = `Kreddit: ${localStorageItems.userData.credits}`
        register.href = "/profile.html"
        register.role = "button"

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
    loginLogout.textContent = "Logg inn"
    loginLogout.href = "./login.html"
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







// Function to set the theme based on a given mode
function setThemeMode(mode) {
    const body = document.body;

    // Check the mode and apply the appropriate classes to the body
    if (mode === 'lightMode') {
        body.classList.remove('darkMode');
        body.classList.add('lightMode');
        localStorage.setItem('theme', 'lightMode'); // Store the selected theme in local storage
    } else if (mode === 'darkMode') {
        body.classList.remove('lightMode');
        body.classList.add('darkMode');
        localStorage.setItem('theme', 'darkMode'); // Store the selected theme in local storage
    }
}

// Check the local storage for the selected theme and apply it
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setThemeMode(savedTheme);
} else {
    // Default to lightMode mode if no theme is saved in local storage
    setThemeMode('lightMode');
}
