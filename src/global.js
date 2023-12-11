import { localStorageItems, createCardElement, createButtonElement } from "./js/utils/utils.js";
import { singleProfile } from "./js/api/api.js";



const creditIcon = {
    icon: `
  <svg  height="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                xml:space="preserve" stroke="#000" stroke-width=".005">
                                <path
                                    d="M256 510.855c34.487 7.027 74.08-6.604 99.86-30.566 26.278-24.424 23.24-66.863 39.414-98.886 12.028-23.81 29.555-43.374 43.829-65.91 17.759-28.037 46.88-51.214 51.203-84.12 4.33-32.954-13.234-64.731-27.717-94.647-15.073-31.134-29.306-66.075-58.824-84.107C374.28 34.605 336.62 35.903 302.182 38.73c-30.56 2.51-58.475 16.07-86.135 29.303-23.786 11.38-42.316 30.165-65.273 43.135-25.798 14.575-58.201 17.397-79.08 38.421-21.946 22.097-33.675 52.491-41.216 82.707-8.026 32.157-15.36 67.145-3.952 98.264 11.384 31.055 40.227 52.067 66.45 72.227 23.866 18.35 54.682 23.56 79.775 40.193 30.172 20.001 47.778 60.647 83.249 67.874"
                                    fill="#444" stroke="none" stroke-width="0" />
                                <path style="fill:#8e6ef0" d="M225.944 117.335H337.68l-27.936-48.383z" />
                                <path style="fill:#8e6ef0"
                                    d="m225.944 117.335 83.8-48.383 27.936 48.383h49.267L325.364 10.668 140.613 117.335zM394.668 245.333h-145.78c-7.821 0-14.22 6.398-14.22 14.221v99.558c0 7.822 6.398 14.221 14.22 14.221H465.78c7.821 0 14.222-6.398 14.222-14.221v-99.558c0-7.822-6.4-14.221-14.222-14.221h-71.112zM298.667 288c11.782 0 21.333 9.551 21.333 21.333 0 11.781-9.551 21.335-21.333 21.335-11.784 0-21.335-9.554-21.335-21.335 0-11.782 9.551-21.333 21.335-21.333z" />
                                <circle style="fill:#8e6ef0" cx="298.669" cy="309.336" r="21.334" />
                                <path style="fill:#fcd051"
                                    d="M234.668 359.112v-99.558c0-7.822 6.398-14.221 14.22-14.221H437.332V160c0-23.463-19.197-42.665-42.664-42.665H74.667c-23.466 0-42.666 19.197-42.666 42.665v298.667c0 23.468 19.199 42.667 42.666 42.667h320.002c23.464 0 42.664-19.202 42.664-42.667v-85.334H248.888c-7.821-.001-14.22-6.399-14.22-14.221z" />
                                <path style="fill:#010101"
                                    d="M465.779 234.666h-17.781V160c0-29.407-23.925-53.332-53.331-53.332h-1.563L334.602 5.335a10.67 10.67 0 0 0-6.477-4.971 10.654 10.654 0 0 0-8.094 1.066L137.754 106.668H74.666c-29.408 0-53.333 23.925-53.333 53.332v298.667c0 29.408 23.925 53.334 53.333 53.334h320.002c29.406 0 53.331-23.926 53.331-53.334v-74.666h17.781c13.724 0 24.889-11.165 24.889-24.888v-99.558c0-13.725-11.166-24.889-24.89-24.889zM321.46 25.241l47.009 81.426h-24.631l-24.856-43.05a10.667 10.667 0 0 0-14.572-3.904l-81.325 46.954h-42.661L321.46 25.241zm-2.256 81.427h-53.451l40.086-23.144 13.365 23.144zm107.46 351.998c0 17.645-14.353 31.999-31.996 31.999H74.666c-17.645 0-31.998-14.354-31.998-31.999V160c0-17.643 14.353-31.997 31.998-31.997h65.933l.022.002.025-.002h197.019l.023.002.025-.002h56.955c17.643 0 31.996 14.354 31.996 31.997v74.666h-21.329v-43.768c0-5.892-4.778-10.667-10.667-10.667-5.892 0-10.667 4.776-10.667 10.667v43.768H248.888c-13.724 0-24.887 11.165-24.887 24.888v99.558c0 13.724 11.164 24.888 24.887 24.888H384v43.768c0 5.892 4.776 10.667 10.667 10.667 5.89 0 10.668-4.776 10.668-10.667V384h21.329v74.666zm42.67-99.554c0 1.927-1.627 3.553-3.554 3.553H248.888c-1.925 0-3.552-1.627-3.552-3.553v-99.558c0-1.927 1.627-3.553 3.552-3.553h216.891c1.928 0 3.554 1.627 3.554 3.553v99.558z" />
                                <path style="fill:#010101"
                                    d="M298.667 277.333c-17.645 0-32 14.355-32 32 0 17.646 14.355 32.002 32 32.002s32.002-14.356 32.002-32.002c0-17.645-14.357-32-32.002-32zm0 42.667c-5.882 0-10.665-4.785-10.665-10.667 0-5.881 4.783-10.665 10.665-10.665 5.882 0 10.667 4.784 10.667 10.665 0 5.882-4.786 10.667-10.667 10.667zM394.672 447.745c-5.892 0-10.667 4.776-10.667 10.667v.254c0 5.892 4.776 10.667 10.667 10.667 5.89 0 10.667-4.776 10.667-10.667v-.254c.001-5.892-4.777-10.667-10.667-10.667zM394.672 170.921c5.89 0 10.667-4.776 10.667-10.667V160c0-5.892-4.778-10.667-10.667-10.667-5.892 0-10.667 4.776-10.667 10.667v.254c0 5.891 4.774 10.667 10.667 10.667z" />
                            </svg>

`
}




    ; (function () {
        const userAvatar = () => {
            const profileImage = document.querySelectorAll("[data-type-user='avatar']")
            if (localStorageItems.userData && localStorageItems.media) {
                profileImage.forEach(img => {
                    img.src = localStorageItems.media
                })
            } else {

                profileImage.forEach(img => {
                    img.src = "src/assets/blank-avatar.png"
                })

            }
        }

        const userCredits =  async () => {
            const data = await singleProfile(localStorageItems.userData.name);
        
            const creditsContainer = document.querySelector("[data-type-navbar='user-credit-container']")
            if (localStorageItems.token) {
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
            } }

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


        function clearToken() {
            localStorage.removeItem("user-data")
            localStorage.removeItem("user-token")
        }

        userAvatar()
        userCredits()
        navbarLinks()



    }());

