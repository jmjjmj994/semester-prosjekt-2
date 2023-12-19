import { singleListing, singleProfile, options } from "../api/api.js";
import { createCardElement, localStorageItems, dateConverter,norwegianEndDate, validImgUrl } from "../utils/utils.js";
const queryString = document.location.search;
const param = new URLSearchParams(queryString)
const id = param.get("id")
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
                const slide = createCardElement("div", "flex-1 w-full h-full absolute");
                const slideImage = createCardElement("img", "absolute h-full w-full object-cover");
                slideImage.src = img;
                slideImage.alt = "Product image"
                slide.append(slideImage)
                slide.setAttribute("data-type-specific", "slide");
                const slidePreview = createCardElement("div", " relative max-w-[20rem] w-full h-[7rem]  border-inherit cursor-pointer")
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
    const slide = createCardElement("div", "flex-1 w-full h-full relative");
    const image = createCardElement("img", "absolute w-full h-full object-cover");
    image.src = img.media
    image.alt = "product image"
    slide.append(image);
    sliderContainer.append(slide);

}



const renderDescription = async () => {
    const data = await fetchData()
    const sellerHeader = document.querySelector("[data-type-specific='description-seller']")
    const sellerAvatar = document.querySelector("[data-type-specific='description-avatar']")
    const productDescription = document.querySelector("[data-type-specific='description']")

    const productEndDate = document.querySelector("[data-type-specific='description-end-date']")
    if (localStorageItems && localStorageItems.token) {
        sellerHeader.textContent = data.seller.name
        sellerAvatar.src = data.seller.avatar
        productDescription.textContent = data.description
        productEndDate.textContent = `${norwegianEndDate(data.endsAt)}`
        
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

     /*    const firstLiEl = ul.querySelector("li")
        if (firstLiEl) {
            firstLiEl.classList.add("highest-bidder")
        } */
    }



}

const clearProductStatus = () => {
    const ul = document.querySelector("[data-type-specific='product-status-ul']")
    if(ul) {
        ul.innerHTML =""
    }
}

const clearCredits = () => {
    const creditsContainer = document.querySelector("[data-type-navbar='user-credit-container']")
    creditsContainer.innerHTML = "";

}





const userCredits = async () => {
    clearCredits()

    const data = await singleProfile(localStorageItems.userData.name);
    const creditsContainer = document.querySelector("[data-type-navbar='user-credit-container']")
    if (localStorageItems.token) {
        creditsContainer.innerHTML = `<i class="fa-regular fa-credit-card"></i>`
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
            renderStatus()
            clearCredits()
            userCredits()

        } else {
            throw new Error("Ikke nok dekning på konto")
        }

    } catch (error) {
        inputError(error.message)

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

    }, 2000)}

    ; (() => {
        const formContainer = document.querySelector("[data-type-specific='form-container']")
        const form = document.querySelector("[data-type-specific='form']")
        const formInput = document.querySelector("[data-type-specific='bid-input']");
        const submitBidBtn = document.querySelector("[data-type-specific='submit-bid-btn']")
   console.log(localStorageItems)
 if(localStorageItems && localStorageItems.token) {

 } else {
  form.remove()
  formContainer.className ="flex items-center justify-center"
  formContainer.innerHTML = `
  
  <h3 class="text-center">
Vennligst <a aria-label="to login page" class=" text-purple-500 underline" href="/login.html">logg inn </a> eller <a aria-label="to register page" class="text-purple-500 underline" href="/signup.html">registrer </a> deg for å delta i budrunden


  </h3>
  
  
  
  `
 }


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
    renderStatus()
    renderDescription()
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

initializer()








