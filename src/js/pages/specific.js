import { singleListing, singleProfile, options } from "../api/api.js";
import { createCardElement, localStorageItems, dateConverter, norwegianEndDate, validImgUrl } from "../utils/utils.js";
const queryString = document.location.search;
const param = new URLSearchParams(queryString)
const id = param.get("id")
const prevBtn = document.querySelector("[data-type-specific='prev-btn']")
const nextBtn = document.querySelector("[data-type-specific='next-btn']")
const sliderContainer = document.querySelector("[data-type-specific='slider']")
const previewContainer = document.querySelector("[data-type-specific='preview-container']")
let currSlide = 0
const MILLISECOND = 3000
const ERROR_CLR = "#FF6D4D"


const handleSliderData = async () => {
    try {
        const data = await singleListing(id)
        if (data && data.media.length > 1) {
            const sliderArray = await handleMultipleSlides(data.media.slice(0, 4))
            handleSlideGallery(data.media.slice(0, 4), sliderArray)
        } else if (data && data.media.length <= 1) {
            prevBtn.className = "hidden";
            nextBtn.className = "hidden";
            previewContainer.className = "hidden";
            handleSingleSlide(data.media)
        } else {
            console.log("error")
        }
    } catch (error) {
        console.error("error")
    }
}



const handleMultipleSlides = async (images) => {
    const maxSlide = images.length - 1
    const sliderArray = []
    images.forEach((img, index) => {
        const slide = createCardElement("div", "flex-1 w-full h-full absolute rounded-md");
        const slideImage = createCardElement("img", "absolute h-full w-full border-inherit object-cover");
        slideImage.src = img;
        slideImage.alt = "Product image"
        slide.append(slideImage)
        slide.setAttribute("data-type-specific", "slide");
        sliderArray.push(slide)
    })

    sliderArray.forEach((slide, index) => {
        sliderContainer.append(slide)
        slide.style.transform = `translateX(${index * 100}%)`;
        slide.style.cssText = "transition:0.1s ease-in-out; opacity:0.5s;";
    })


    const handleButtons = () => {
        nextBtn.addEventListener("click", (e) => {
            currSlide === maxSlide ? (currSlide = 0) : currSlide++;
            moveSlides(sliderArray, currSlide);
        });
        prevBtn.addEventListener("click", (e) => {
            currSlide === 0 ? (currSlide = maxSlide) : currSlide--;
            moveSlides(sliderArray, currSlide);
        });
    }

    handleButtons()
    return sliderArray
}
const handleSlideGallery = async (images, mainSliderArr) => {
    const previewArray = []
    images.forEach((img) => {
        const slideGalleryContainer = createCardElement("div", " relative max-w-[20rem] w-full h-[7rem] rounded-md   border-inherit cursor-pointer  preview-effect overflow-hidden custom-z-low")
        slideGalleryContainer.setAttribute("tabindex", "0");
        const slideGalleryImg = createCardElement("img", "absolute h-full w-full object-cover border-inherit")
        slideGalleryImg.src = img
        slideGalleryImg.alt = "Product image"
        slideGalleryContainer.append(slideGalleryImg)
        slideGalleryContainer.setAttribute("data-type-specific", "slide-preview")
        previewArray.push(slideGalleryContainer);

    })
    previewArray.forEach(img => {
        previewContainer.append(img)
    })
    previewArray.forEach((img, index) => {
        img.addEventListener("click", (e) => {
            currSlide = index
            moveSlidesOnClick(mainSliderArr, currSlide)
        })
    })

}

const moveSlides = (arr, currSlide) => {
    arr.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currSlide)}%)`;

    });
}

function moveSlidesOnClick(arr, num) {
    arr.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - num)}%)`;
    });

}



const handleSingleSlide = async (img) => {
    const slide = createCardElement("div", "flex-1 w-full h-full relative");
    const image = createCardElement("img", "absolute w-full h-full object-cover");
    if (img.length === 0) {
        image.src = "src/assets/no-image.jpg";
        image.alt = "Placeholder image"
        slide.append(image);
        sliderContainer.append(slide);
        
    } else {
        image.src = img
        image.alt = "product image"
    }
    slide.append(image);
    sliderContainer.append(slide);
}


const contentData = async () => {
    const res = await singleListing(id)
    const specificData = {
        title: res.title,
        description: res.description,
        seller: res.seller,
        bids: res.bids,
        created: res.created,
        endsAt: res.endsAt,
        updated: res.updated,
        media: res.media,
    }
    document.title = `${res.title}`
    return specificData;
}



const renderDescription = async () => {
    const data = await contentData()
    const sellerHeader = document.querySelector("[data-type-specific='description-seller']")
    const sellerAvatar = document.querySelector("[data-type-specific='description-avatar']")
    const productDescription = document.querySelector("[data-type-specific='description']")
    const productEndDate = document.querySelector("[data-type-specific='description-end-date']")
    productEndDate.textContent = norwegianEndDate(data.endsAt)
    productDescription.textContent = data.description
    productDescription.textContent = data.description || "Ingen tilgjengelig beskrivelse"
    if (localStorageItems && localStorageItems.token) {
        sellerHeader.textContent = data.seller.name
        sellerAvatar.src = data.seller.avatar
        sellerAvatar.alt = "Profile avatar"
    } else {
        sellerHeader.textContent = "Logg inn for å se informasjon om selger"
        sellerAvatar.src = "src/assets/blank-avatar.png"
        sellerAvatar.alt = "Profile placeholder"
    }

}
const renderStatus = async () => {
    clearProductStatus()
    const data = await contentData()
    const productStatusContainer = document.querySelector("[data-type-specific='product-status']")
    const ul = document.querySelector("[data-type-specific='product-status-ul']")

    if (data.bids.length === 0) {
        productStatusContainer.innerHTML = `<h3> Ingen aktive bud! Vær den første til å legge inn ett bud </h3>`
    } else {
        data.bids.sort((a, b) => b.amount - a.amount)
        data.bids.forEach(({ id, amount, bidderName }) => {
            const li = createCardElement("li", "flex justify-between  px-2 border-b-[1px] border-custom-background")
            const primary = createCardElement("p", "")
            const secondary = createCardElement("p", "")
            primary.textContent = `${bidderName}`
            secondary.textContent = `${amount}`
            li.append(primary, secondary)
            ul.append(li)

        })
        const firstLiEl = ul.querySelector("li")
        if (firstLiEl) {
            firstLiEl.classList.add("highest-bidder")
        }
    }
    return data.bids
}


const clearProductStatus = () => {
    const ul = document.querySelector("[data-type-specific='product-status-ul']")
    if (ul) ul.innerHTML = ""
}
const clearCredits = () => {
    const creditsContainer = document.querySelector("[data-type-navbar='user-bid-credits']")
    creditsContainer.innerHTML = "";

}
const clearBid = () => {
    const formInput = document.querySelector("[data-type-specific='bid-input']");
    formInput.value = ""
}

const userCredits = async () => {
    clearCredits()
    const data = await singleProfile(localStorageItems.userData.name);
    const creditsContainer = document.querySelector("[data-type-navbar='user-bid-credits']")
    creditsContainer.innerHTML = ""

    if (localStorageItems.token) {
        creditsContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 -3.5 30 30"><defs><linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#FFC923"/><stop offset="100%" stop-color="#FFAD41"/></linearGradient></defs><g fill="none" fill-rule="nonzero"><path fill="url(#a)" d="M15.002 0c8.244 0 15.026 3.845 15 8.898a5.777 5.777 0 0 1-.635 2.583c.417.825.64 1.708.634 2.63-.027 5.046-6.805 8.889-15 8.889-8.194 0-14.972-3.843-15-8.889a5.727 5.727 0 0 1 .634-2.63 5.786 5.786 0 0 1-.633-2.583C-.025 3.845 6.757 0 15.002 0Z"/><path fill="#DF960A" d="m30.001 8.882.001 4.776c-2.829 3.56-8.555 5.904-15 5.904-6.51 0-12.234-2.25-15.002-5.792l.001-4.864 30-.024Zm0 .026-30-.01c.028 5.046 6.806 8.89 15 8.89 8.195 0 14.973-3.834 15-8.88Z"/></g></svg>`
        const credits = createCardElement("span")
        credits.textContent = data.credits
        creditsContainer.append(credits)
    } else {
        creditsContainer.innerHTML = creditIcon.icon
        const credits = createCardElement("span")
        credits.textContent = "0"
        creditsContainer.append(credits)
    }
    return data.credits
}



const setBid = async (amount) => {
    const formInput = document.querySelector("[data-type-specific='bid-input']");
    let url = `https://api.noroff.dev/api/v1/auction/listings/${id}/bids?_seller=true&_bids=true&_active=true`
    const requestOptions = {
        method: "POST",
        headers: options.headers,
        body: JSON.stringify({
            "amount": amount
        })
    };
    try {
        const res = await fetch(url, requestOptions);
        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.message || "Du kan ikke by under det høyeste budet")
        }
        const data = await res.json();
        renderStatus()
        clearCredits()
        userCredits()
        clearBid()
        inputFeedback("Bud lagt til", "green", MILLISECOND);
    } catch (error) {
        inputFeedback(error.message, ERROR_CLR, MILLISECOND)
    }
}
const inputFeedback = (msg, color, time) => {
    const formInput = document.querySelector("[data-type-specific='bid-input']");
    const submitBidBtn = document.querySelector("[data-type-specific='submit-bid-btn']")


    submitBidBtn.style.backgroundColor = color
    submitBidBtn.style.color = "white"
    formInput.placeholder = msg
    formInput.value = ""
    formInput.style.outline = `1px solid ${color}`
    submitBidBtn.style.transition = `all 100ms linear`
    formInput.style.transition = `all 100ms linear`
    setTimeout(() => {
        submitBidBtn.style.backgroundColor = ""
        submitBidBtn.style.color = ""
        formInput.placeholder = "Legg til bud"
        formInput.style.outline = ""

    }, time)
}


    ; (() => {
        const formContainer = document.querySelector("[data-type-specific='form-container']")
        const form = document.querySelector("[data-type-specific='form']")
        const formInput = document.querySelector("[data-type-specific='bid-input']");
        if (!localStorageItems || !localStorageItems.token) {
            formContainer.className = "flex items-center justify-center  bg-custom-secondary px-[1rem] md:px-[10rem] rounded-md shadow-md  py-4"
            formContainer.innerHTML = `
  <h3 class="text-center text-custom-textDark">
Vennligst <a aria-label="to login page" class=" text-purple-500 underline" href="/login.html">logg inn </a> eller <a aria-label="to register page" class="text-purple-500 underline" href="/signup.html">registrer </a> deg for å delta i budrunden
  </h3>`
        }
        const validateInput = async (value) => {
            const fetchBids = await renderStatus()
            const bidArray = fetchBids.map(bid => bid.amount)
            const highestBid = bidArray.length > 0 ? bidArray[0] : 0
            const currentCredit = await userCredits()
            if (isNaN(value)) {
                inputFeedback("Vennligst skriv inn kun tall", ERROR_CLR, 3000)
                return
            }
            if (highestBid > currentCredit) {
                inputFeedback("Du har ikke nok kredit", ERROR_CLR, MILLISECOND)
                return
            }
        }

        const handleFormSubmit = async (e) => {
            e.preventDefault();
            const value = parseInt(formInput.value.trim());
            if (isNaN(value) || value === "") {
                inputFeedback("Vennligst legg inn ett bud", ERROR_CLR, MILLISECOND);
                return;
            }
            await setBid(value);

        }
        const handleFormInput = async (e) => {
            await validateInput(e.target.value)
        }
        form.addEventListener("submit", handleFormSubmit);
        formInput.addEventListener("input", handleFormInput);

    })();






(async () => {
    const loader = document.querySelector(".loader");
    const wrapper = document.querySelector("[data-type-specific='wrapper']");

    const initializer = async () => {
        await renderStatus();
        await renderDescription();
        await userCredits();
        handleSliderData()
    };

    async function loadContent() {
        if (loader) loader.style.display = "block";
        wrapper.style.display = "none";

        try {
            if (id) {
                await initializer();
            } else {
                throw new Error("Problem loading content: ID is missing");
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (loader) loader.style.display = "none";
            wrapper.style.display = "flex";
        }
    }

    await loadContent();
})();






