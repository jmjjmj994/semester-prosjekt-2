import { singleListing, singleProfile, options } from "../api/api.js";
import { createCardElement } from "../utils/utils.js";
import { localStorageItems } from "../utils/utils.js";


const queryString = document.location.search;
const param = new URLSearchParams(queryString)
const id = param.get("id")
const prevBtnContainer = document.querySelector("[data-type-specific='prev-btn-container']")
const nextBtnContainer = document.querySelector("[data-type-specific='next-btn-container']")
const prevBtn = document.querySelector("[data-type-specific='prev-btn']")
const nextBtn = document.querySelector("[data-type-specific='next-btn']")
const sliderWrapper = document.querySelector("[ data-type-specific='slider-wrapper' ]")
const sliderContainer = document.querySelector("[data-type-specific='slider']")
const previewContainer = document.querySelector("[data-type-specific='preview-container']")
const loader = document.querySelector(".loader")


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

    return specificData;


}


const showLoader = () => {
    loader.style.display = "block";
}

const hideLoader = () => {
    loader.style.display = "none";
}


const delay = () => {
    const parentContainer = document.querySelector("[data-type-section='specific-parent-container']");
    const section = document.querySelector("[data-type-section='fade-in']");
    showLoader()
    section.className = "opacity-0";

    setTimeout(() => {
        section.className = "flex opacity-1   items-center flex-col w-full h-full my-8 px-2 gap-[3rem]";
        hideLoader()
    }, 550)

}

const handleSlides = async () => {
    const object = await fetchData();
    const media = object.media;
    renderSlides(media)
}




const renderSlides = (media) => {
    let curSlide = 0;
    let maxSlide = media.length - 1;
    const image = media.slice(0, 3)
    const slideArray = [];
    const slidePreviewArray = [];
    const mediaArray = [];
    mediaArray.push(image);
    const slides = () => {
        for (let i = 0; i <= maxSlide; i++) {
            const slide = createCardElement("div", "flex-1 w-full h-full absolute border-inherit");
            const slideImage = createCardElement("img", "h-full max-w-[100%] w-full  block object-cover md:absolute md:w-full border-inherit");
            slideImage.src = image[i];
            slideImage.alt = "Product image"
            slide.append(slideImage)
            slide.setAttribute("data-type-specific", "slide");
            const slidePreview = createCardElement("div", " relative h-[5rem] w-[5rem] md:w-[10rem] md:h-[5.5rem] lg:w-[11rem] bg-orange-500 border-inherit cursor-pointer")
            const previewImage = createCardElement("img", "absolute h-full w-full object-cover border-inherit")
            previewImage.src = image[i]
            previewImage.alt = "Product image"
            slidePreview.append(previewImage)
            slidePreview.setAttribute("data-type-specific", "slide-preview")
            slidePreviewArray.push(slidePreview);
            slideArray.push(slide)
        }

    }







    slideArray.forEach(slide => {
        sliderContainer.append(slide)
    })
    slidePreviewArray.forEach(preview => {
        previewContainer.append(preview)
    })







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

    slides()

}


const renderSingleSlide = async () => {
    const img = await fetchData()
    const slide = createCardElement("div", "flex flex-1 relative");
    const image = createCardElement("img", "h-full w-full absolute object-cover");
    image.src = img.media
    slide.append(image);
    sliderContainer.append(slide);

}




const renderDescription = async () => {
    const descriptionContainer = document.querySelector("[data-type-specific='description']");
    const seller = document.querySelector("[data-type-specific='seller']")
    const sellerContainer = createCardElement("div", "flex justify-between items-center py-2 w-[11.5rem] md:w-[13rem] lg:w-[14rem] ")
    const data = await fetchData();
    const header = createCardElement("h2")
    const productDescription = createCardElement("p");
    const sellerAvatar = createCardElement("img", "w-[3.5rem] h-[3.5rem] rounded-full")
    const sellerName = createCardElement("h1");
    header.textContent = data.title;
    productDescription.textContent = data.description;
    sellerAvatar.src = data.seller.avatar
    sellerAvatar.alt = "Avatar"
    sellerName.textContent = data.seller.name;
    sellerContainer.append(sellerAvatar, sellerName)
    seller.append(sellerContainer)
    descriptionContainer.append(header, productDescription)

}

const renderProductStatus = async () => {
    clearProductStatus()
    const productStatusContainer = document.querySelector("[data-type-specific='product-status']")
    const data = await fetchData();
    const bids = data.bids;
    bids.sort((a, b) => b.amount - a.amount)
    bids.forEach((({ id, amount, bidderName }) => {
        const bidderContainer = createCardElement("div", "flex items-center gap-5  max-w-[20rem]");
        const bidderColor = createCardElement("span", "bg-green-500 w-[0.3rem] h-[0.3rem] rounded-full");
        const sellerName = createCardElement("span");
        const sellerBid = createCardElement("span", "ml-auto");
        sellerName.textContent = bidderName;
        sellerBid.textContent = `${amount}`;
        bidderContainer.append(bidderColor, sellerName, sellerBid)
        productStatusContainer.append(bidderContainer)
    }))

}


const clearProductStatus = () => {
    const productStatusContainer = document.querySelector("[data-type-specific='product-status']");
    productStatusContainer.innerHTML = "";
}



const clearCredits = () => {
    const creditsContainer = document.querySelector("[data-type-navbar='user-credit-container']")
    creditsContainer.innerHTML = "";

}



const userCredits = async () => {
    clearCredits()
    const creditIcon = {
        icon: `
  <svg  height="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                xml:space="preserve" stroke="#000" stroke-width=".005">
                                <path
                                    d="M256 510.855c34.487 7.027 74.08-6.604 99.86-30.566 26.278-24.424 23.24-66.863 39.414-98.886 12.028-23.81 29.555-43.374 43.829-65.91 17.759-28.037 46.88-51.214 51.203-84.12 4.33-32.954-13.234-64.731-27.717-94.647-15.073-31.134-29.306-66.075-58.824-84.107C374.28 34.605 336.62 35.903 302.182 38.73c-30.56 2.51-58.475 16.07-86.135 29.303-23.786 11.38-42.316 30.165-65.273 43.135-25.798 14.575-58.201 17.397-79.08 38.421-21.946 22.097-33.675 52.491-41.216 82.707-8.026 32.157-15.36 67.145-3.952 98.264 11.384 31.055 40.227 52.067 66.45 72.227 23.866 18.35 54.682 23.56 79.775 40.193 30.172 20.001 47.778 60.647 83.249 67.874"
                                    fill="#444" stroke="none" stroke-width="0" />
                                <path style="fill:#8e6ef0" d="M225.944 117.335H337.68l-27.936-48.383z" />
                                <path style="fill:#8e6ef0"
                                    d="m225.944 117.335 83.8-48.383 27.936 48.383h49.267L325.364 10.668 140.613 117.335zM394.668 245.333h-145.78c-7.821 0-14.22 6.398-14.22 14.221v99.558c0 7.822 6.398 14.221 14.22 14.221H465.78c7.821 0 14.222-6.398 14.222-14.221v-99.558c0-7.822-6.4-14.221-14.222-14.221h-71.112zM298.667 288c11.782 0 21.333 9.551 21.333 21.333 0 11.781-9.551 21.335-21.333 21.335-11.784 0-21.335-9.554-21.335-21.335 0-11.782 9.551-21.333 21.335-21.333z" />
                                <circle style="fill:#8e6ef0" cx="298.669" cy="309.336" r="21.334" />
                                <path style="fill:#fcd051"
                                    d="M234.668 359.112v-99.558c0-7.822 6.398-14.221 14.22-14.221H437.332V160c0-23.463-19.197-42.665-42.664-42.665H74.667c-23.466 0-42.666 19.197-42.666 42.665v298.667c0 23.468 19.199 42.667 42.666 42.667h320.002c23.464 0 42.664-19.202 42.664-42.667v-85.334H248.888c-7.821-.001-14.22-6.399-14.22-14.221z" />
                                <path style="fill:#010101"
                                    d="M465.779 234.666h-17.781V160c0-29.407-23.925-53.332-53.331-53.332h-1.563L334.602 5.335a10.67 10.67 0 0 0-6.477-4.971 10.654 10.654 0 0 0-8.094 1.066L137.754 106.668H74.666c-29.408 0-53.333 23.925-53.333 53.332v298.667c0 29.408 23.925 53.334 53.333 53.334h320.002c29.406 0 53.331-23.926 53.331-53.334v-74.666h17.781c13.724 0 24.889-11.165 24.889-24.888v-99.558c0-13.725-11.166-24.889-24.89-24.889zM321.46 25.241l47.009 81.426h-24.631l-24.856-43.05a10.667 10.667 0 0 0-14.572-3.904l-81.325 46.954h-42.661L321.46 25.241zm-2.256 81.427h-53.451l40.086-23.144 13.365 23.144zm107.46 351.998c0 17.645-14.353 31.999-31.996 31.999H74.666c-17.645 0-31.998-14.354-31.998-31.999V160c0-17.643 14.353-31.997 31.998-31.997h65.933l.022.002.025-.002h197.019l.023.002.025-.002h56.955c17.643 0 31.996 14.354 31.996 31.997v74.666h-21.329v-43.768c0-5.892-4.778-10.667-10.667-10.667-5.892 0-10.667 4.776-10.667 10.667v43.768H248.888c-13.724 0-24.887 11.165-24.887 24.888v99.558c0 13.724 11.164 24.888 24.887 24.888H384v43.768c0 5.892 4.776 10.667 10.667 10.667 5.89 0 10.668-4.776 10.668-10.667V384h21.329v74.666zm42.67-99.554c0 1.927-1.627 3.553-3.554 3.553H248.888c-1.925 0-3.552-1.627-3.552-3.553v-99.558c0-1.927 1.627-3.553 3.552-3.553h216.891c1.928 0 3.554 1.627 3.554 3.553v99.558z" />
                                <path style="fill:#010101"
                                    d="M298.667 277.333c-17.645 0-32 14.355-32 32 0 17.646 14.355 32.002 32 32.002s32.002-14.356 32.002-32.002c0-17.645-14.357-32-32.002-32zm0 42.667c-5.882 0-10.665-4.785-10.665-10.667 0-5.881 4.783-10.665 10.665-10.665 5.882 0 10.667 4.784 10.667 10.665 0 5.882-4.786 10.667-10.667 10.667zM394.672 447.745c-5.892 0-10.667 4.776-10.667 10.667v.254c0 5.892 4.776 10.667 10.667 10.667 5.89 0 10.667-4.776 10.667-10.667v-.254c.001-5.892-4.777-10.667-10.667-10.667zM394.672 170.921c5.89 0 10.667-4.776 10.667-10.667V160c0-5.892-4.778-10.667-10.667-10.667-5.892 0-10.667 4.776-10.667 10.667v.254c0 5.891 4.774 10.667 10.667 10.667z" />
                            </svg>

`
    }
    const data = await singleProfile(localStorageItems.userData.name);

    const creditsContainer = document.querySelector("[data-type-navbar='user-credit-container']")
    if (localStorageItems.token) {
        creditsContainer.innerHTML = creditIcon.icon
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
}



const setBid = async (amount) => {
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
        if (res.ok) {
            const data = await res.json();
            renderProductStatus()
            clearCredits()
            userCredits()

        } else {
            const errorData = await res.json();
            /* const errorsArr = errorData.errors;
            const error = errorsArr[0].message; */
            throw new Error("Ikke nok dekning på konto")


        }




    } catch (error) {
        inputError(error.message)
        console.log(error.message)

    }
}





const inputError = (msg) => {
    const formInput = document.querySelector("[data-type-specific='bid-input']");
    formInput.placeholder = msg
    formInput.value = ""
    formInput.style.border = "1px solid red"
    setTimeout(() => {
        formInput.placeholder = "Legg til bud"
        formInput.style.border = ""

    }, 2000)


}

    ; (() => {
        const form = document.querySelector("[data-type-specific='bid-form']");
        const formInput = document.querySelector("[data-type-specific='bid-input']");
        const submitBidBtn = document.querySelector("[data-type-specific='submit-bid-btn']")
        const validateInput = (value) => {
            if (isNaN(value)) {
                inputError("Kun tall")

            }

        }


        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const value = parseInt(formInput.value.trim())
            if (isNaN(value) || value === "") {
                return
            } else {
                setBid(value)


            }
        })


        formInput.addEventListener("input", (e) => {
            validateInput(e.target.value)
        })
    })();


const initializer = async () => {
    renderDescription()
    renderProductStatus()
    delay()
    const data = await fetchData();
    const media = data.media.length;
    if (media <= 1) {
        sliderWrapper.className = "flex flex-col shadow-sm    h-[25rem]  w-full md:w-[80%] md:h-[35rem] lg:w-[50%] lg:h-[40rem] p-2 bg-custom-secondary rounded-md"
        prevBtnContainer.className = "hidden";
        nextBtnContainer.className = "hidden";
        previewContainer.className = "hidden";
        renderSingleSlide()
    } else if (media > 1) {
        sliderWrapper.className = "flex flex-col shadow-sm    h-[35rem]  w-full md:w-[80%] md:h-[40rem] lg:w-[50%] lg:h-[45rem] p-2 bg-custom-secondary rounded-md"

        handleSlides()
    }

}

initializer()








