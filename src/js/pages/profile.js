import { localStorageItems, validImgUrl } from "../utils/utils.js";
import { updateMedia, singleProfile } from "../api/api.js";
const avatarOverlay = document.querySelector("[data-type-overlay='overlay']");
const avatarOverlayForm = document.querySelector("[data-type-overlay='form']");
const avatarOverlayFormInput = document.querySelector("[data-avatar-overlay-form--input ]");



export const getUserData = async () => {
    if (localStorageItems.token) {
        const data = await singleProfile(localStorageItems.userData.name);
        const dataObj = { ...data }

        return dataObj;
    } else {
        return false;
    }

}



const renderUserInformation = async (data) => {
    const imageEl = document.querySelectorAll("[data-type-user='avatar']")
    const usernameEl = document.querySelector("[data-type-user='username']");
    const emailEl = document.querySelector("[data-type-user='email']");
    const creditEl = document.querySelector("[data-type-user='credit']");
    const listingsEl = document.querySelector("[data-type-user='listings']");
    const winningsEl = document.querySelector("[data-type-user='biddings-won']");
    if (data) {

        imageEl.forEach(img => {
            img.src = data.avatar

        })
    } else {
        imageEl.forEach(img => {
            img.src = "src/assets/blank-avatar.png"
        })

    }

    if (!data.avatar) {
        imageEl.forEach(img => {
            img.src = "src/assets/blank-avatar.png"
        })
    }

    if (localStorageItems.token) {
        usernameEl.textContent = `Navn: ${data.name}`;
        emailEl.textContent = `E-post: ${data.email}`;
        creditEl.textContent = `Kreditt: ${data.credits},-`
        listingsEl.textContent = `Oppføringer: ${data._count.listings}`;
        winningsEl.textContent = data.wins.length === 0 ? "Bud vunnet: 0" : `Bud vunnet: ${data.wins.length}`

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
    avatarOverlayOpenBtn.addEventListener("click", (e) => {
        toggleAriaHidden(true)
        toggleOverlay(true)
    })
    avatarOverlayCloseBtn.addEventListener("click", (e) => {
        toggleAriaHidden(false)
        toggleOverlay(false)
    })

}
const toggleOverlay = (value) => {
    if (value) {
        avatarOverlay.classList.add("isActive");
        avatarOverlayForm.querySelector("button [autofocus], input").focus()
    } else {
        avatarOverlay.classList.remove("isActive");
    }
}
function toggleAriaHidden(hide) {
    const elements = document.querySelectorAll('body > *:not([data-type-overlay="overlay"])');
    elements.forEach(function (elem) {
        if (hide) {
            elem.setAttribute('aria-hidden', 'true');
        } else {
            elem.removeAttribute('aria-hidden');
        }
    });
}


const displayError = (error, color) => {
    avatarOverlayFormInput.placeholder = error
    avatarOverlayFormInput.style.cssText = `border:1px solid ${color}`;


    setTimeout(() => {
        avatarOverlayFormInput.placeholder = "Legg til bilde url"
        avatarOverlayFormInput.style.cssText = "";

    }, 3000);
}





avatarOverlayForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    const avatarFormInputValue = avatarOverlayFormInput.value.trim();
    if (avatarFormInputValue === "") {
        displayError("Vennligst legg til en url", "red")
        return;
    }
    if (urlRegex.test(avatarFormInputValue)) {
        validImgUrl(avatarFormInputValue, async (isValid) => {
            if (isValid) {
                try {
                    await changeUserAvatar(avatarFormInputValue);
                    displayError("", "green")
                    avatarOverlayFormInput.value = "";
                    avatarOverlay.classList.remove("isActive");

                } catch (error) {
                    avatarOverlayFormInput.value = ""
                    console.error("Problemer med å bytte avatar:", error.message);
                }
            } else {
                avatarOverlayFormInput.value = ""
                displayError("Oops! Denne url-adressen er ikke gyldig. Prøv på nytt", "red");
            }
        });
    }
})


const changeUserAvatar = async (imageUrl) => {
    try {
        await updateMedia(localStorageItems.userData.name, imageUrl);
        const userData = await getUserData()
        renderUserInformation(userData)
    } catch (error) {
        throw new Error(error.message)
    }


}



async function init() {
    overlayListeners();
    const userData = await getUserData()
    renderUserInformation(userData)
}

init()


