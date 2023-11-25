/* import { localStorageItems } from "./js/utils/utils.js";
console.log(localStorageItems)
const userData = { ...localStorageItems };
const avatar = document.querySelectorAll("[data-avatar]");
const credit = document.querySelectorAll("[data-credit]");
const signUp = document.querySelector("[data-signup]")
const loginLogout = document.querySelector("[data-login-logout]");



const userStatus = () => {
    if (!userData.token && window.location.pathname === "/login.html") {
        loginLogout.textContent = "Logg inn";
        signUp.textContent = "Registrer"
    }

    if (window.location.pathname === "/signup.html") {
        loginLogout.textContent = "Logg inn";
        signUp.textContent = "Registrer"
        avatar.forEach(img => {
            userData.userData.avatar ? img.src = userData.userData.avatar : img.src = "dist/assets/blank-profile-picture-973460_640.png"
        })
    }

    if (userData.token && window.location.pathname === "/index.html") {
        loginLogout.textContent = "Logg ut"
        loginLogout.addEventListener("click", (e) => {
        localStorage.removeItem("user-token");
      
        })
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
        loginLogout.textContent = "Logg inn";
        signUp.textContent = "Registrer"
    }


}


const tokenPresent = () => {


    const hasCheckedToken = localStorage.getItem('tokenChecked');
console.log(hasCheckedToken)
    console.log("Hei")


};


document.addEventListener('DOMContentLoaded', tokenPresent);
userStatus()
 */


/*    if (!hasCheckedToken && userData.token) {
       localStorage.setItem('tokenChecked', 'true');
       window.location.href = "/index.html";
   } else if (!userData.token && hasCheckedToken !== 'true') {
       localStorage.removeItem('tokenChecked'); 
   } */