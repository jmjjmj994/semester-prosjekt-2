import { localStorageItems, createCardElement, createButtonElement } from "./js/utils/utils.js";
import { singleProfile } from "./js/api/api.js";


console.log(localStorageItems.token)




    ;(function () {
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
                listingLink.href = "/bidding.html"
                profileLink.href = "/profile.html"
                logInLogOut.onclick = () => clearToken()
            } else {
                listingLink.href = "/login.html"
                profileLink.href = "/login.html"
                logInLogOut.href = "/login.html"
                logInLogOut.textContent = "Logg inn"

            }

        }

        const CTAButtons = () => {
            const CTABtnContainer = document.querySelector("[data-type-cta='btn-container']")
            const CTALoginBtn = createCardElement("a", "bg-custom-btnBgAccent text-custom-textWhite uppercase  flex justify-center items-center cta-btn-sm md:cta-btn-md lg:cta-btn-lg")
            CTALoginBtn.textContent = "Logg inn"
            CTALoginBtn.href ="/login.html"
            CTALoginBtn.role ="button"
            CTALoginBtn.ariaLabel ="Logg inn"
            const CTARegisterBtn = createCardElement("a", "bg-custom-btnBgSpecial text-custom-textDark uppercase  flex justify-center items-center cta-btn-sm md:cta-btn-md lg:cta-btn-lg")
            CTARegisterBtn.textContent = "Registrer"
            CTARegisterBtn.href = "/signup.html"
            CTARegisterBtn.role = "button"
            CTARegisterBtn.ariaLabel = "Registrer"
           

            if(!localStorageItems.token) {
                CTABtnContainer.append(CTALoginBtn, CTARegisterBtn)
            }
      /*       const CTALoginBtn = document.querySelector("[data-type-cta='log-in-btn' ]")
            const CTARegisterBtn = document.querySelector("[data-type-cta='register-btn']")

            if(localStorageItems.token) {
                CTALoginBtn.remove();
                CTARegisterBtn.remove();
            } else {

            } */
        }

        function clearToken() {
            localStorage.removeItem("user-data")
            localStorage.removeItem("user-token")
        }
        CTAButtons()
        userAvatar()
        navbarLinks()



    }());

