import { localStorageItems, createCardElement } from "./js/utils/utils.js";
import { singleProfile } from "./js/api/api.js";






    ; (function () {
        //<i class="fa-regular fa-credit-card"></i>

        const userCredits = async () => {
            const creditsContainer = document.querySelector("[data-type-navbar='user-credit-container']")
            creditsContainer.innerHTML = `
                <i class="fa-regular fa-credit-card"></i>
                `
           
            if (localStorageItems.token) {
                const data = await singleProfile(localStorageItems.userData.name);
           
                const credits = createCardElement("span")
                credits.textContent = data.credits
              
                creditsContainer.append(credits)
            } else {
              
                const credits = createCardElement("span")
                credits.textContent = "0"
                creditsContainer.append(credits)
            }
            if (!localStorageItems.token) {
                creditsContainer.innerHTML = ""
            }
        }

        const navbarLinks = () => {
            const logInLogOut = document.querySelector("[data-type-navbar='login-logout-link']")
            const listingLink = document.querySelector("[data-type-navbar='listing-link']")
            const profileLink = document.querySelector("[data-type-navbar='profile-link']")
            const overviewLink = document.querySelector("[data-type-navbar='overview-link']")
            if (localStorageItems.token) {
                logInLogOut.textContent = "Logg ut"
                logInLogOut.href = "/index.html"
                listingLink.href = "/listing.html"
                profileLink.href = "/profile.html"
                overviewLink.href = "/overview.html"
                logInLogOut.onclick = () => clearToken()
            } else {
                overviewLink.href ="/login.html"
                listingLink.href = "/login.html"
                profileLink.href = "/login.html"
                logInLogOut.href = "/login.html"
                logInLogOut.textContent = "Logg inn"

            }

        }

        const footerLinks = () => {
            const footerListingLi = document.querySelector("[data-type-footer='listing-li']")
            const footerOverviewLi = document.querySelector("[data-type-footer='overview-li']")
            const footerProfileLi = document.querySelector("[data-type-footer='profile-li']")

            if (localStorageItems.token) {
                footerListingLi.style.display = "block";
                footerOverviewLi.style.display = "block";
                footerProfileLi.style.display = "block";

            } else {
                footerListingLi.style.display = "none";
                footerOverviewLi.style.display = "none";
                footerProfileLi.style.display = "none";

            }
        }


        function clearToken() {
            localStorage.removeItem("user-data")
            localStorage.removeItem("user-token")
        }


        userCredits()
        navbarLinks()
        footerLinks()


    }());

