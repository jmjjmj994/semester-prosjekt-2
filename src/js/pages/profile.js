
//Needed in several actions
/* import { register } from "../../global.js"; */
import { localStorageItems } from "../utils/utils.js";
console.log(localStorageItems.userData.userAvatar)
import { updateMedia, singleProfile } from "../api/api.js";
const avatarOverlay = document.querySelector("[data-type-overlay='overlay']");
const avatarOverlayForm = document.querySelector("[data-avatar-overlay-form ]");
const avatarOverlayFormInput = document.querySelector("[data-avatar-overlay-form--input ]");
//Needed in several actions




const getUserData = async () => {
    if (localStorageItems.token) {
        const data = await singleProfile(localStorageItems.userData.name);
        const dataObj = { ...data }
        
        return dataObj;
    } else {
        return false;
    }

}



const renderUserInformation = async (data) => {

    const imageEl = document.querySelector("[data-type-user='avatar']")
    const usernameEl = document.querySelector("[data-type-user='username']");
    const emailEl = document.querySelector("[data-type-user='email']");
    const creditEl = document.querySelector("[data-type-user='credit']");
    const listingsEl = document.querySelector("[data-type-user='listings']");
    const winningsEl = document.querySelector("[data-type-user='biddings-won']");


     if (data) {
        imageEl.src = data.avatar
    } else {
        imageEl.src = "src/assets/blank-avatar.png"
    } 



    if (localStorageItems.token) {
        usernameEl.textContent = `Navn: ${data.name}`;
        emailEl.textContent = `E-post: ${data.email}`;
        creditEl.textContent = `Kreditt: ${data.credits},-`
        listingsEl.textContent = `Oppføringer: ${data._count.listings}`;
        winningsEl.textContent = data.wins.length === 0 ? "Vunnet: 0" : `Vunnet ${userData.wins}`
    } else {

        usernameEl.textContent = "";
        emailEl.textContent = "";
        creditEl.textContent = "";
        listingsEl.textContent = "";
        winningsEl.textContent = "";
    }





}

const overlayListeners = () => {
    const avatarOverlayOpenBtn = document.querySelector("[data-type-overlay='prompt-overlay'");
    const avatarOverlayCloseBtn = document.querySelector("[data-type-overlay='remove-overlay']");
    avatarOverlayOpenBtn.onclick = () => toggleOverlay(true);
    avatarOverlayCloseBtn.onclick = () => toggleOverlay(false);

}
const toggleOverlay = (value) => {
    if (value) {
        avatarOverlay.classList.add("isActive");
    } else {
        avatarOverlay.classList.remove("isActive");
    }


}


avatarOverlayForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    const avatarFormInputValue = avatarOverlayFormInput.value.trim();
    if (urlRegex.test(avatarFormInputValue)) {
        changeUserAvatar(avatarFormInputValue);
        avatarOverlayFormInput.value = "";
        avatarOverlay.classList.remove("isActive");
    }
})


const changeUserAvatar = async (imageUrl) => {
    await updateMedia(localStorageItems.userData.name, imageUrl);
    const userData = await getUserData()
    renderUserInformation(userData)

}



async function init() {
    overlayListeners();
    const userData = await getUserData()
    renderUserInformation(userData)
}

init()


