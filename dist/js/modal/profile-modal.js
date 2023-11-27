import { register } from "../../global.js";
import { localStorageItems, blockElements } from "../utils/utils.js";
import { updateMedia } from "../api/api.js";
const modalProfile = document.querySelector("[data-profile-modal]");
const avatarForm = document.querySelector("[data-avatar-form]")
const avatarFormInput = document.querySelector("[data-avatar-form-input]")
const avatarFormBtn = document.querySelector("[data-avatar-form-btn]")
const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
const profileModalSettings = document.querySelector("[data-profile-modal-settings]");
const modalProfileSecondary = document.querySelector("[data-profile-modal-secondary]")
const closeProfileModalInput = document.querySelector("[data-profile-modal-input-close]")




const profileModal = () => {
    const button = register
    localStorageItems.token && openProfileModal(button)
}

function openProfileModal(btn) {
    btn.addEventListener("click", (e) => {
        e.preventDefault()
        modalProfile.className = "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary w-[25rem] transition-all h-[35rem]  rounded-md shadow "
        blockElements.header.style.cssText = "background-color: rgba(0, 0, 0, 0.65) "
        blockElements.main.style.cssText = "background-color: rgba(0, 0, 0, 0.65) "
    })
}

function closeModal() {
    const closeProfileModal = document.querySelector("[data-profile-modal-close]");
    closeProfileModal.addEventListener("click", (e) => {
        modalProfile.className = "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary w-[25rem] transition-all h-[35rem]  rounded-md shadow hidden"
        blockElements.header.style.cssText = " "
        blockElements.main.style.cssText = ""
    })
}

const renderModalContent = () => {
    const image = document.querySelector("[data-profile-modal-img]");
    const name = document.querySelector("[data-profile-modal-name]");
    const email = document.querySelector("[data-profile-modal-email]");
    const credits = document.querySelector("[data-profile-modal-credits]");

    if (localStorageItems.userData.avatar) {
        image.src = localStorageItems.media;
    } else {
        image.src = "dist/assets/blank-avatar.png";
    }

    name.textContent = localStorageItems.userData.name;
    email.textContent = localStorageItems.userData.email;
    credits.textContent = `${localStorageItems.userData.credits},-`;



}

/* 
 */





profileModalSettings.onclick = () => displaySecondaryModal(true)
closeProfileModalInput.onclick = () => displaySecondaryModal(false)



const displaySecondaryModal = (value) => {

    if (value) {
        modalProfileSecondary.classList.add("isActive")
    } else {
        modalProfileSecondary.classList.remove("isActive")
    }


}



    avatarForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const avatarInputValue = avatarFormInput.value.trim();
        if (urlRegex.test(avatarInputValue)) {
        changeUserAvatar(avatarInputValue)
        avatarFormInput.value = ""
        displaySecondaryModal(false)
        } else {
            console.log("blank")
        }
        return avatarInputValue
    })






const changeUserAvatar = async (imageUrl) => {
    const smLoader = document.querySelector("[data-loader-sm]");
    const imageContainer = document.querySelector("[data-profile-modal-image-container]");
    if (image) {
        image.style.cssText = "opacity:0;"
        try {
            const changeMedia = await updateMedia("NeonNebula", imageUrl);
            smLoader.classList.add("isActive")
            await new Promise((resolve => setTimeout(resolve, 3000)))
            image.src = localStorage.getItem("new-media");
            image.style.cssText = "opacity:1;"
        } finally {
            smLoader.classList.remove("isActive")
        }
    }




}






(() => { //initializer
    renderModalContent()
    profileModal()
    closeModal()

})();


