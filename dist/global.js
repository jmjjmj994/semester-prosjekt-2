import { localStorageItems } from "./js/utils/utils.js";
const profileAvatar = document.querySelector("[data-avatar]");
const profileCredit = document.querySelector("[data-credit]");

const loginLogout = document.querySelector("[data-login-logout ]")
const register = document.querySelector("[data-signup ]")

console.log(loginLogout)





console.log(localStorageItems.userData.avatar)


const hasToken = () => {
    if (localStorageItems.userData.avatar) {
        profileAvatar.src = localStorageItems.userData.avatar
        profileAvatar.alt = "";
    } else {
        profileAvatar.src = "dist/assets/blank-avatar.png"
        profileAvatar.alt = "";
    }
    profileCredit.textContent = `Kreddit: ${localStorageItems.userData.credits}`
    loginLogout.textContent = "Logg ut"
    loginLogout.href = "./login.html"
    register.textContent = "Min profil"
    register.href = ""

}



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
    if (window.location.pathname === "/login.html" ) {
    loginLogout.textContent = "";
} else if(window.location.pathname === "/signup.html") {
    loginLogout.href = "/login.html"
} 

}
monitorPage()

loginLogout.addEventListener("click", (e) => {
    localStorage.removeItem("user-token")
})