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
const searchFormContainer = document.querySelector("[data-search='search-container']")
const searchFormInputClear = document.querySelector("[data-search='search-input-clear']")
searchFormInput.value = "";












searchForm.addEventListener("click", (e) => {
    e.preventDefault();

})




searchFormInput.addEventListener("input", (e) => {
    const inputValue = e.target.value.trim();
    if (inputValue === "") {
        console.log("no hit")
        searchFormContainer.className = "hidden"
        renderSearchResults([])
    } else {
     /*    getData(inputValue) */
searchInputValue(inputValue)
        searchFormContainer.className = "block"

    }


})

searchFormInputClear.addEventListener("click", (e) => {
    searchFormInput.value = "";
    searchFormContainer.className = "hidden "
    renderSearchResults([])
})




function searchInputValue (value) {
console.log(value)
    return value;
}


let currentSearchResults = [];
async function getData(value) {
  /*    const searchData1 = await listings(10, 0);  */
    /*   const searchData2 = await listings(100, 100);
      const searchData3 = await listings(100, 200);
      const searchData4 = await listings(100, 300);
      const searchData5 = await listings(100, 400);
      const searchData6 = await listings(100, 500); */
 /*      while({
        const data = await listings(100, x)
        currentSearchResults  = [currentSearchResults, ...data]
        if (data.length < 100) break
      }) */
    const dataArray = [...searchData1/* , ...searchData2, ...searchData3, ...searchData4, ...searchData5, ...searchData6 */];
    currentSearchResults = dataArray.filter(data => {
        const { title } = data;
        const lowerCaseTitle = title.toLowerCase();
        const lowerCaseValue = value.toLowerCase();
        return lowerCaseTitle.startsWith(lowerCaseValue) ;
    })

    renderSearchResults(currentSearchResults)

}










const renderSearchResults = async (result) => {
    const searchFormContainerResults = document.querySelector("[data-search='search-container-results']");
    searchFormContainerResults.innerHTML = "";
    result.forEach(item => {
        const { title, media, id } = item;
        console.log(id)
        const article = createCardElement("article", "flex relative");
        const articleImageContainer = createCardElement("div");
        const articleImageImg = createCardElement("img", "w-[3rem] h-[3rem] rounded-full");
        articleImageImg.src = media;
        articleImageContainer.append(articleImageImg);
        const articleTitleContainer = createCardElement("div");
        const articleTitleP = createCardElement("p");
        articleTitleP.textContent = title;
        articleTitleContainer.append(articleTitleP)
        const aHref = createCardElement("a", "absolute w-full h-full cursor-pointer")
        aHref.href = `/specific.html?id=${id}`
        console.log(aHref)
        
        article.append(aHref,articleImageContainer, articleTitleContainer)
        searchFormContainerResults.appendChild(article)
    })
}

