import { register } from "../../global.js";
import { localStorageItems, createLoader } from "../utils/utils.js";
import { updateMedia, singleProfile } from "../api/api.js";
const avatarOverlayOpenBtn = document.querySelector("[data-open-avatar-overlay]");
const avatarOverlayCloseBtn = document.querySelector("[data-close-avatar-overlay]");
const avatarOverlay = document.querySelector("[data-avatar-overlay]");
const avatarOverlayForm = document.querySelector("[data-avatar-overlay-form ]");
const avatarOverlayFormInput = document.querySelector("[data-avatar-overlay-form--input ]");



const getUserData = async () => {
    const data = await singleProfile(localStorageItems.userData.name);
    const dataObj = { ...data }
    return dataObj;
}

const injectLoader = (active) => {
    const loaderContainer = document.querySelector(".inject-loader");
    const spinner = createLoader("20px", "20px",);


    loaderContainer.appendChild(spinner);
};





const renderUserInformation = async (data) => {
    const usernameEl = document.querySelector("[data-username]");
    const emailEl = document.querySelector("[data-email]");
    const creditEl = document.querySelector("[data-profile-credit]");
    const listingsEl = document.querySelector("[data-listings]");
    const winningsEl = document.querySelector("[data-wins]")
    usernameEl.textContent = data.name;
    emailEl.textContent = data.email;
    creditEl.textContent = `${data.credits},-`
    listingsEl.textContent = data._count.listings;
    winningsEl.textContent = data.wins.length === 0 ? "0" : userData.wins

}







const overlayListeners = () => {
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


    try {

        const changeMedia = await updateMedia(localStorageItems.userData.name, imageUrl);
        updateAvatarImage()
    } finally {



    }


}
const updateAvatarImage = () => {
    const imageEl = document.querySelector("[data-avatar-image]")
    imageEl.src = localStorage.getItem("new-media");
}




async function init() {
    overlayListeners();
    const userData = await getUserData()
    updateAvatarImage()
    renderUserInformation(userData)
}

init()

