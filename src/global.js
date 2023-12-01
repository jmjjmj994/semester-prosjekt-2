import { localStorageItems, createCardElement } from "./js/utils/utils.js";
import { singleProfile, listings } from "./js/api/api.js";


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












searchForm.addEventListener("click", (e) => {
    e.preventDefault();
})




const searchValue = async () => {
    const closeSearch = document.querySelector("[data-search='search-container-close']")
    const inputValue = searchFormInput.value.trim();
    const searchFormContainer = document.querySelector("[data-search='search-container']");
    if(inputValue === "") {
        console.log(inputValue, "blank")
        searchFormContainer.className ="hidden"
    } else {
       await getData(inputValue) 
       searchFormContainer.className = "block"
    }
    closeSearch.addEventListener("click", () => {
        searchFormContainer.className ="hidden";
        searchFormInput.value = "";
        inputValue === "";
    })
 /*   await getData(inputValue) */
}


searchFormInput.addEventListener("keyup", searchValue)


let currentSearchresults = [];
async function getData (value) {
    const searchData1 = await listings(100, 0);
    const searchData2 = await listings(100, 100);
    const searchData3 = await listings(100, 200);
    const searchData4 = await listings(100, 300);
    const searchData5 = await listings(100, 400);
    const searchData6 = await listings(100, 500);
    const dataArray = [...searchData1, ...searchData2, ...searchData3, ...searchData4, ...searchData5, ...searchData6];
    const filterData = dataArray.filter(data => {
        const {title, media} = data;
       /*  if (title.toLowerCase().includes(value.toLowerCase())) {
          console.log(title)
           createSearchResults(title, media)
        } */
const use = title.toLowerCase() === value.toLowerCase()
createSearchResults(use)
      /*   return title.toLowerCase() === value.toLowerCase() */
    })


   
}







const createSearchResults = (title, media) => {
const article = createCardElement("article", "flex");
const articleImageContainer = createCardElement("div");
const articleImageImg = createCardElement("img", "w-[3rem] h-[3rem] rounded-full" );
articleImageImg.src = media;
articleImageContainer.append(articleImageImg);
const articleTitleContainer = createCardElement("div");
const articleTitleP = createCardElement("p");
articleTitleP.textContent = title;
articleTitleContainer.append(articleTitleP)
article.append(articleImageContainer, articleTitleContainer)
    renderSearchResults(article)


}




 const renderSearchResults = (cards) => {
/* const limitData = data.slice(0, 30)  */
/* const cards = createSearchResults() */


const searchFormContainerResults = document.querySelector("[data-search='search-container-results']");

searchFormContainerResults.appendChild(cards)
/* console.log(limitData)  */
}

 