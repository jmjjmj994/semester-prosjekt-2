
//Needed in several actions
import { register } from "../../global.js";
import { localStorageItems } from "../utils/utils.js";
import { updateMedia, singleProfile } from "../api/api.js";
const avatarOverlay = document.querySelector("[data-avatar-overlay]");
const avatarOverlayForm = document.querySelector("[data-avatar-overlay-form ]");
const avatarOverlayFormInput = document.querySelector("[data-avatar-overlay-form--input ]");
//Needed in several actions




const getUserData = async () => {
    if (localStorageItems.token) {
        const data = await singleProfile(localStorageItems.userData.name);
        const dataObj = { ...data }
        console.log(data)
        return dataObj;
    } else {
        return false;
    }

}



const renderUserInformation = async (data) => {
    console.log(data)
    const imageEl = document.querySelector("[data-avatar-image]")
    const usernameEl = document.querySelector("[data-username]");
    const emailEl = document.querySelector("[data-email]");
    const creditEl = document.querySelector("[data-profile-credit]");
    const listingsEl = document.querySelector("[data-listings]");
    const winningsEl = document.querySelector("[data-wins]")
    if (localStorageItems.token) {
        imageEl.src = data.avatar || "dist/assets/blank-avatar.png"
        usernameEl.textContent = data.name;
        emailEl.textContent = data.email;
        creditEl.textContent = `${data.credits},-`
        listingsEl.textContent = data._count.listings;
        winningsEl.textContent = data.wins.length === 0 ? "0" : userData.wins
    } else {

        usernameEl.textContent = "";
        emailEl.textContent = "";
        creditEl.textContent = "";
        listingsEl.textContent = "";
        winningsEl.textContent = "";
    }



}

const overlayListeners = () => {
    const avatarOverlayOpenBtn = document.querySelector("[data-open-avatar-overlay]");
    const avatarOverlayCloseBtn = document.querySelector("[data-close-avatar-overlay]");
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


