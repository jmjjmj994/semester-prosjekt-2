import { localStorageItems, createCardElement } from "./js/utils/utils.js";
import { singleProfile } from "./js/api/api.js";


console.log(localStorageItems.token)




    (function () {
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
            if (localStorageItems.token) {
        
                logInLogOut.textContent = "Logg ut"
                logInLogOut.href = "/index.html"
                listingLink.href ="/bidding.html"
                profileLink.href = "/profile.html"
                logInLogOut.onclick = () => clearToken()
            } else {
                listingLink.href = "/login.html"
                profileLink.href = "/login.html"
                logInLogOut.href = "/login.html"
                logInLogOut.textContent = "Logg inn"
          
            }

        }

        function clearToken() {
            localStorage.removeItem("user-data")
            localStorage.removeItem("user-token")
        }

        userAvatar()
        navbarLinks()



    }())

