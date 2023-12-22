import { singleListing, singleProfile, options } from "../api/api.js";
import { createCardElement, localStorageItems, dateConverter, norwegianEndDate, validImgUrl } from "../utils/utils.js";
const queryString = document.location.search;
const param = new URLSearchParams(queryString)
const id = param.get("id")
const prevBtn = document.querySelector("[data-type-specific='prev-btn']")
const nextBtn = document.querySelector("[data-type-specific='next-btn']")
const sliderWrapper = document.querySelector("[ data-type-specific='slider-wrapper' ]")
const sliderContainer = document.querySelector("[data-type-specific='slider']")
const previewContainer = document.querySelector("[data-type-specific='preview-container']")
const MILLISECOND = 3000
const ERROR_CLR = "#FF6D4D"



const fetchData = async () => {
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




const handleSlides = async () => {
    const object = await fetchData();
    const media = object.media;
    renderSlides(media)
}


const renderSlides = (media) => {
    let curSlide = 0;
    const image = media.slice(0, 4)
    let maxSlide = image.length - 1;
    const slideArray = [];
    const slidePreviewArray = [];
    const mediaArray = [];
    mediaArray.push(image);
    const slides = () => {
        mediaArray.forEach((img, index) => {
            img.forEach(img => {
                const slide = createCardElement("div", "flex-1 w-full h-full absolute rounded-md");
                const slideImage = createCardElement("img", "absolute h-full w-full border-inherit object-cover");
                slideImage.src = img;
                slideImage.alt = "Product image"
                slide.append(slideImage)
                slide.setAttribute("data-type-specific", "slide");
                const slidePreview = createCardElement("div", " relative max-w-[20rem] w-full h-[7rem] rounded-md   border-inherit cursor-pointer  preview-effect overflow-hidden custom-z-low")
                slidePreview.setAttribute("tabindex", "0");
                const previewImage = createCardElement("img", "absolute h-full w-full object-cover border-inherit")
                previewImage.src = img
                previewImage.alt = "Product image"
                slidePreview.append(previewImage)
                slidePreview.setAttribute("data-type-specific", "slide-preview")
                slidePreviewArray.push(slidePreview);
                slideArray.push(slide)

            })



        })

        slideArray.forEach(slide => {
            sliderContainer.append(slide)
        })
        slidePreviewArray.forEach(preview => {
            previewContainer.append(preview)
        })

    }
    slides()










    nextBtn.addEventListener("click", (e) => {
        curSlide === maxSlide ? (curSlide = 0) : curSlide++;
        moveSlides();
    });

    prevBtn.addEventListener("click", (e) => {
        curSlide === 0 ? (curSlide = maxSlide) : curSlide--;
        moveSlides();
    });


    function moveSlides() {
        slideArray.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
        });
    }




    slideArray.forEach((slide, index) => {
        slide.style.transform = `translateX(${index * 100}%)`;
        slide.style.cssText = "transition:0.1s ease-in-out; opacity:0.5s;";
    })
    slidePreviewArray.forEach((preview, index) => {
        preview.addEventListener("click", (e) => {

            const currentIndex = index;
            curSlide = index
            moveSlidesOnClick(currentIndex)
        })
    })



    function moveSlidesOnClick(num) {
        slideArray.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - num)}%)`;

        });

    }



}


const renderSingleSlide = async () => {
    const img = await fetchData()
    console.log(img)
    const slide = createCardElement("div", "flex-1 w-full h-full relative");
    const image = createCardElement("img", "absolute w-full h-full object-cover");
    if (img.media.length === 0) {
        console.log(img)
        image.src = "src/assets/no-image.jpg";
        image.alt = "Placeholder image"
        slide.append(image);
        sliderContainer.append(slide);
    } else {

        image.src = img.media
        image.alt = "product image"
        slide.append(image);
        sliderContainer.append(slide);
    }

}



const renderDescription = async () => {
    const data = await fetchData()
    const sellerHeader = document.querySelector("[data-type-specific='description-seller']")
    const sellerAvatar = document.querySelector("[data-type-specific='description-avatar']")
    const productDescription = document.querySelector("[data-type-specific='description']")
    const productEndDate = document.querySelector("[data-type-specific='description-end-date']")
    productEndDate.textContent = `${norwegianEndDate(data.endsAt)}`
    productDescription.textContent = data.description
    if (localStorageItems && localStorageItems.token) {
        sellerHeader.textContent = data.seller.name
        sellerAvatar.src = data.seller.avatar
        sellerAvatar.alt = "Profile avatar"

    } else {
        sellerHeader.textContent = "Logg inn for å se informasjon om selger"
        sellerAvatar.src = "src/assets/blank-avatar.png"
        sellerAvatar.alt = "Profile placeholder"

    }


    if (!data.description) {
        productDescription.textContent = "Ingen tilgjengelig beskrivelse"
    }




}

const renderStatus = async () => {
    clearProductStatus()
    const data = await fetchData()
    const productStatusContainer = document.querySelector("[data-type-specific='product-status']")
    const ul = document.querySelector("[data-type-specific='product-status-ul']")
    const bids = data.bids


    if (bids.length === 0) {
        productStatusContainer.innerHTML = `<h3> Ingen aktive bud! Vær den første til å legge inn ett bud </h3>`
    } else {
        bids.sort((a, b) => b.amount - a.amount)
        bids.forEach(({ id, amount, bidderName }) => {
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
    return bids


}

const clearProductStatus = () => {
    const ul = document.querySelector("[data-type-specific='product-status-ul']")
    if (ul) {
        ul.innerHTML = ""
    }
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
    if (!localStorageItems.token) {
        creditsContainer.innerHTML = ""
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
        console.log(data)
        renderStatus()
        clearCredits()
        userCredits()
        clearBid()

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
    submitBidBtn.style.transition = `all 130ms ease-in-out`
    submitBidBtn.style.transition = `all 130ms ease-in-out`
    setTimeout(() => {
        formInput.style.transition = `all 130ms ease-in-out`
        formInput.style.transition = `all 130ms ease-in-out`
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
        const submitBidBtn = document.querySelector("[data-type-specific='submit-bid-btn']")
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
            const highestBid = bidArray.length > 0 ? bidArray[0] : 0 //6
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


        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const value = parseInt(formInput.value.trim())
            if (isNaN(value) || value === "") {
                inputFeedback("Vennligst legg inn ett bud", ERROR_CLR, MILLISECOND)
                return
            } else {
                inputFeedback("", "green", MILLISECOND)
                setBid(value)


            }
        })


        formInput.addEventListener("input", (e) => {
            validateInput(e.target.value)
        })
    })();





; (async () => {
    const loader = document.querySelector(".loader")
    const initializer = async () => {
        renderStatus()
        renderDescription()
        userCredits()
        const data = await fetchData();
        const media = data.media.length;
        if (media <= 1) {
            prevBtn.className = "hidden";
            nextBtn.className = "hidden";
            previewContainer.className = "hidden";
            renderSingleSlide()
        } else if (media > 1) {
            handleSlides()
        }

    }

    async function loadContent() {
        const wrapper = document.querySelector("[data-type-specific='wrapper']")
        if (loader) {
            loader.style.display = "block"
            wrapper.style.display = "none"

        }
        try {

            if (id) {
                await initializer()
            } else {
                throw new Error("Problem loading content")
            }

        } finally {
            if (loader) {
                loader.style.display = "none";
            }

            wrapper.style.display = "flex"


        }


    }

    loadContent()



})();











