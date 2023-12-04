import { singleListing, options } from "../api/api.js";
import { createCardElement } from "../utils/utils.js";
const queryString = document.location.search;
const param = new URLSearchParams(queryString)
const id = param.get("id")

const prevBtnContainer = document.querySelector("[data-type-specific='prev-btn-container']")
const nextBtnContainer = document.querySelector("[data-type-specific='next-btn-container']")
const prevBtn = document.querySelector("[data-type-specific='prev-btn']")
const nextBtn = document.querySelector("[data-type-specific='next-btn']")
const sliderContainer = document.querySelector("[data-type-specific='slider']")
const previewContainer = document.querySelector("[data-type-specific='preview-container']")






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
/*             const slideImage = createCardElement("img", "w-full h-full  absolute object-cover");
 */
            slideImage.src = image[i];
            slide.append(slideImage)
            slide.setAttribute("data-type-specific", "slide");
            const slidePreview = createCardElement("div", " relative h-[5rem] w-[5rem]")
            const previewImage = createCardElement("img", "absolute h-full w-full object-cover")
            previewImage.src = image[i]
            slidePreview.append(previewImage)
            slidePreview.setAttribute("data-type-specific", "slide-preview")
            slidePreviewArray.push(slidePreview);
            slideArray.push(slide)
        }

    }


    slides()




    slideArray.forEach(slide => {
        sliderContainer.append(slide)
    })
    slidePreviewArray.forEach(preview => {
        previewContainer.append(preview)
    })/*  */







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
    const slide = createCardElement("div", "flex flex-1 relative");
    const image = createCardElement("img", "h-full w-full absolute object-cover");
    image.src = img.media
    slide.append(image);
    sliderContainer.append(slide);

}


const initializer = async () => {
    const data = await fetchData();
    const media = data.media.length;
    if (media <= 1) {
        prevBtnContainer.className = "hidden";
        nextBtnContainer.className = "hidden";
        previewContainer.className = "hidden"
        renderSingleSlide()
    } else if (media > 1) {
        handleSlides()
    }

}







//description
//title, description, tags, created, updated, endsAt, _count.bids, seller, 

const renderDescription = async () => {
    const descriptionContainer = document.querySelector("[data-type-specific='description']");
    const sellerContainer = createCardElement("div", "flex items-center")
    const data = await fetchData();
    const header = createCardElement("p")
    const productDescription = createCardElement("p");
    const sellerAvatar = createCardElement("img", "w-[5rem] h-[5rem] rounded-full")
    const sellerName = createCardElement("p");
    header.textContent = data.title;
    productDescription.textContent = data.description;
    sellerAvatar.src = data.seller.avatar
    sellerName.textContent = data.seller.name;
    sellerContainer.append(sellerAvatar, sellerName)
    descriptionContainer.append(sellerContainer, header, productDescription)

}

const renderProductStatus = async () => {
    const productStatusContainer = document.querySelector("[data-type-specific='product-status']")
    const data = await fetchData();
    const bids = data.bids;
    bids.sort((a, b) => b.amount - a.amount)
    bids.forEach((({ id, amount, bidderName }) => {
        const bidderContainer = createCardElement("div", "flex items-center gap-5 ring-1 max-w-[20rem]");
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




const createBid = async () => {
    let defaultBid = 0;
    const data = await fetchData();
    const allBids = data.bids.map(bid => bid.amount);
    const highestBid = Math.max(...allBids) + 1;
    const form = document.querySelector("[data-type-specific='form']");
    const formInput = document.querySelector("[data-type-specific='input']");
    const submitBidBtn = document.querySelector("[data-type-specific='submit-bid-btn']")
    const increaseBtn = document.querySelector("[data-type-specific='increase-bid-btn']");
    const decreaseBtn = document.querySelector("[data-type-specific='decrease-bid-btn']");
    const maxBidBtn = document.querySelector("[data-type-specific='max-bid-btn']");

    const bid = (number) => {
        defaultBid = number;
        formInput.value = defaultBid;
        if (defaultBid === 0) {
            decreaseBtn.removeEventListener("click", decreaseBid);
        } else {
            decreaseBtn.addEventListener("click", decreaseBid);
        }
        getInput(defaultBid);

    }

    const increaseBid = (e) => {
        defaultBid++;
        bid(defaultBid);
    }
    const decreaseBid = (e) => {
        defaultBid--;
        bid(defaultBid);
    }
    const maxBid = (e) => {
        defaultBid = highestBid;
        bid(defaultBid)
    }

    const alterBid = () => {
        increaseBtn.addEventListener("click", increaseBid)
        decreaseBtn.addEventListener("click", decreaseBid)
        maxBidBtn.addEventListener("click", maxBid)
    }



    const getInput = (bid) => {
        return bid;
    }

    bid(defaultBid);



    submitBidBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const finalBid = getInput(defaultBid);
        if (finalBid > 0) {
            await setBid(finalBid)
            clearProductStatus()
            renderProductStatus()
        }

    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

    });



    alterBid();

}



const setBid = async (amount) => {
    let url = `https://api.noroff.dev/api/v1/auction/listings/${id}/bids?_seller=true&_bids=true&_active=true`
    const requestOptions = {
        method: "POST",
        headers: options.headers,
        body: JSON.stringify({
            amount: amount
        })

    }
    try {
        const res = await fetch(url, requestOptions)
        const data = await res.json()
        console.log(data)


    }
    catch (error) {

    }



}

createBid();
renderDescription()
renderProductStatus()
initializer()  
