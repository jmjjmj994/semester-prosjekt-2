import { localStorageItems, createCardElement } from "./js/utils/utils.js";
import { singleProfile } from "./js/api/api.js";



const creditIcon = {
    icon: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-55.55 -55.55 616.1 616.1" xml:space="preserve" width="30" height="30" stroke="#000" stroke-width=".005"><rect x="-55.55" y="-55.55" width="616.1" height="616.1" rx="308.05" fill="#25b9f1" stroke="none" stroke-width="0" transform="matrix(.98 0 0 .98 5.05 5.05)"/><circle style="fill:#8e6ef0" cx="252.5" cy="252.5" r="252.5"/><path style="fill:#f5cb42" d="M383.2 372.9H108.9c-1.8 0-3.3-1.5-3.3-3.3V172.4c0-1.8 1.5-3.3 3.3-3.3h274.3c1.8 0 3.3 1.5 3.3 3.3v197.2c0 1.9-1.5 3.3-3.3 3.3z"/><path transform="scale(-1) rotate(34.958 590.98 -843.98)" style="fill:#ced5e0" d="M198.275 95.602H333.28v181.007H198.275z"/><path style="fill:#fff" d="m178.5 214 83.6-119.5c2.5 1.8 6 1.1 7.8-1.4l81.8 57.2c-1.8 2.5-1.1 6 1.4 7.8l-83.6 119.5c-2.5-1.8-6-1.1-7.8 1.4l-81.8-57.2c1.8-2.6 1.2-6-1.4-7.8z"/><circle style="fill:#e6e9ee" cx="265.8" cy="186" r="32.8"/><path transform="scale(-1) rotate(34.958 634.563 -718.693)" style="fill:#e6e9ee" d="M158.821 109.327h135.005v181.007H158.821z"/><path style="fill:#fff" d="m139 227.8 83.6-119.5c2.5 1.8 6 1.1 7.8-1.4l81.8 57.2c-1.8 2.5-1.1 6 1.4 7.8L230 291.4c-2.5-1.8-6-1.1-7.8 1.4l-81.8-57.3c1.8-2.5 1.2-6-1.4-7.7z"/><circle style="fill:#e6e9ee" cx="226.3" cy="199.8" r="32.8"/><path style="fill:#f5cb42" d="M383.2 398.2H108.9c-1.8 0-3.3-1.5-3.3-3.3V194.3h277.7c1.8 0 3.3 1.5 3.3 3.3v197.2c-.1 1.9-1.6 3.4-3.4 3.4zM105.5 181.6h12.7v12.7h-12.7z"/><path style="fill:#f5cb42" d="M118.2 194.4c-7 0-12.7-5.7-12.7-12.7 0-7 5.7-12.7 12.7-12.7 7 0 12.7 5.7 12.7 12.7 0 7-5.7 12.7-12.7 12.7zM386.5 256.1v.7-.7z"/><path style="fill:#4cdbc4" d="M399.4 252.1v46.3c0 2.4-1 4.6-2.5 6.1-1.6 1.6-3.8 2.5-6.1 2.5h-64.6c-12.8 0-23.2-10.4-23.2-23.2 0-6.4 2.6-12.2 6.8-16.4 4.2-4.2 10-6.8 16.4-6.8h64.6v-8.7h8.6v.2z"/><path style="fill:#f5cb42" d="M396.9 246c-1.6-1.6-3.7-2.6-6.1-2.6h-4.5v17.4h4.5c2.4 0 4.6-1 6.1-2.6 1.6-1.6 2.6-3.7 2.6-6.1 0-2.4-1-4.5-2.6-6.1z"/><circle style="fill:#2c9984" cx="326.6" cy="284" r="15.6"/><ellipse transform="rotate(-134.991 319.567 277.936)" style="fill:#fff" cx="319.566" cy="277.934" rx="2" ry="5.2"/></svg>

`
}




    ; (function () {


        const userCredits = async () => {

            const creditsContainer = document.querySelector("[data-type-navbar='user-credit-container']")
            if (localStorageItems.token) {
                const data = await singleProfile(localStorageItems.userData.name);
                creditsContainer.innerHTML = creditIcon.icon
                const credits = createCardElement("span")
                credits.textContent = data.credits
                creditsContainer.append(credits)
            } else {
                creditsContainer.innerHTML = creditIcon.icon
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
            if (localStorageItems.token) {
                logInLogOut.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i>`
                logInLogOut.href = "/index.html"
                listingLink.href = "/listing.html"
                profileLink.href = "/profile.html"
                logInLogOut.onclick = () => clearToken()
            } else {
                listingLink.href = "/login.html"
                profileLink.href = "/login.html"
                logInLogOut.href = "/login.html"
                logInLogOut.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i>`

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

