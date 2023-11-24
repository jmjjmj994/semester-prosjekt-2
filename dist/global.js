import { localStorageItems } from "./js/utils/utils.js";
const userData = { ...localStorageItems };
const avatar = document.querySelectorAll("[data-avatar]");
const credit = document.querySelectorAll("[data-credit]");
const signUp = document.querySelector("[data-signup]")
const loginLogout = document.querySelector("[data-login-logout]");
const userStatus = () => {

    if (userData.token) {
        loginLogout.textContent = "Logg ut"
        avatar.forEach(img => {
            userData.userData.avatar ? img.src = userData.userData.avatar : img.src = "dist/assets/blank-profile-picture-973460_640.png"
        })

        credit.forEach(credit => {
            credit.textContent = `Kreditt: ${userData.userData.credits}.- NOK`
        })
        signUp.textContent = "";
    } else {
        avatar.forEach(img => {
            img.src = "dist/assets/blank-profile-picture-973460_640.png"

        })
        avatar.alt = "";
        credit.textContent = "";
        loginLogout.textContent = "Logg inn"
        signUp.textContent ="Registrer"

    }

}

const logOut = () => {
loginLogout.addEventListener("click", (e) => {
localStorage.removeItem("user-token");

})

}
logOut()
userStatus()





if (window.location.pathname === "/signup.html") {
    console.log("URL pathname matches '/login.html'");
    console.log(window.location.pathname);
} else {
    console.log("URL pathname does not match '/login.html'");
    console.log("false");
}
/* 
const isLoggedIn = () => {
    return !!userdata.token
}
*/

