import { localStorageItems, createCardElement } from "./js/utils/utils.js";
import { singleProfile , listingsByTags} from "./js/api/api.js";


const profileAvatar = document.querySelectorAll("[data-avatar]");
const profileCredit = document.querySelector("[data-credit]");
const loginLogout = document.querySelectorAll("[data-login-logout ]")
const navbarName = document.querySelector("[data-navbar-name]")
export const register = document.querySelectorAll("[data-signup ]")

//Modal
const modalProfile = document.querySelector("[data-profile-modal]");
const closeProfileModal = document.querySelector("[data-profile-modal-close]");
const profileModalSettings = document.querySelector("[data-profile-modal-settings]");





const hasToken = () => {

    if (localStorageItems.token) {
        loginLogout[0].textContent = "Logg ut"
        loginLogout[0].href = "./login.html"
        loginLogout[1].textContent = "Logg ut"
        loginLogout[1].href = "./login.html"
        register[0].textContent = "Min profil"
        register[0].href = "/profile.html"
        register[0].role = "button"
        register[1].textContent = "Min profil"
        register[1].href = "/profile.html"
        register[1].role = "button"


        profileCredit.textContent = `${localStorageItems.userData.credits}`

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
    loginLogout[0].textContent = "Logg inn"
    loginLogout[0].href = "./login.html"
    loginLogout[1].textContent = "Logg inn"
    loginLogout[1].href = "./login.html"
    register[0].textContent = "Registrer"
    register[1].textContent = "Registrer"

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
loginLogout[0].addEventListener("click", (e) => {
    localStorage.removeItem("user-token")
})
loginLogout[1].addEventListener("click", (e) => {
    localStorage.removeItem("user-token")
})









const searchForm = document.querySelector("[data-search='search-form']");
const searchFormInput = document.querySelector("[data-search='search-form-input']");
const searchFormButton = document.querySelector("[data-search='search-form-button']");
searchFormInput.value = "";


const redirectUser = async (value) => {
   
    if(fetchListings === 0) {
    console.log("emptry array")
    searchFormInput.placeholder ="such empty"
    } else {
        console.log("data", fetchListings)
    }
}

const fetchData = async () => {
    const inputValue = searchFormInput.value.trim();
    const fetchListings = await listingsByTags(inputValue, 0)
 
    if (inputValue === "") {
        displayError("Søkefeltet kan ikke være tomt", "Søk...")
        return;
    } else if (fetchListings.length === 0) {
        searchFormInput.value = ""
        displayError("Søket ga ingen resultater", "Søk...")
        return;
    } else {
        return fetchListings;
    }
}

const displayError = (error, placeholder) => {
 searchFormInput.placeholder = error


   setTimeout(() => {
       searchFormInput.placeholder = placeholder;
   }, 4000)

}


searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data =  await fetchData();

  if(data) {
   console.log(data)
  } else {
    console.log("no")
  }

   
})








//https://api.noroff.dev/api/v1/auction/listings?_tag=test


