import { singleListing } from "../api/api.js";
import { createCardElement } from "../utils/utils.js";
const queryString = document.location.search;
const param = new URLSearchParams(queryString)
const id = param.get("id")












const prevBtn = document.querySelector("[data-type-specific='prev-btn']")
const nextBtn = document.querySelector("[data-type-specific='next-btn']")
const sliderContainer = document.querySelector("[data-type-specific='slider']")
const previewContainer = document.querySelector("[data-type-specific='preview-container']")
/* const slide = document.querySelectorAll("[data-type-specific='slide']") */
const previewSlide = document.querySelectorAll("[data-type-specific='slide-preview']")





const fetchData = async (callback) => {


    const res = await singleListing(id)
    const specificData = {
        id: res.id,
        title: res.title,
        description: res.description,
        bids: res.bids,
        media: res.media,
        seller: res.seller,
        tags: res.tags,
    }

    return specificData;


}







const handleData = async () => {
    const object = await fetchData();
    const id = object.id
    const title = object.title
    const description = object.description
    const bids = object.bids;
    const media = object.media;




    renderSlides(id, title, description, bids, media)


}

handleData()







const renderSlides = (id, title, description, bids, media) => {
    let curSlide = 0;
    let maxSlide = media.length - 1;
    const slideArray = [];
    const slidePreviewArray = [];
    const mediaArray = [];
    mediaArray.push(media);
    const slides = () => {
        for (let i = 0; i <= maxSlide; i++) {
            const slide = createCardElement("div", "flex-1 w-full h-full absolute");
            const slideImage = createCardElement("img", "w-full h-full absolute object-cover");
          
            console.log()
            slideImage.src = media[i];
            slide.append(slideImage)
            slide.setAttribute("data-type-specific", "slide");
          
            const slidePreview = createCardElement("div", "flex-1 relative")
            const previewImage = createCardElement("img", "absolute h-full w-full object-cover")
            previewImage.src = media[i]
            slidePreview.append(previewImage)
            slidePreview.setAttribute("data-type-specific", "slide-preview")
            slidePreviewArray.push(slidePreview);
            slideArray.push(slide)
        }

    }


    slides()




    //Append slides/
    slideArray.forEach(slide => {
        sliderContainer.append(slide)
    })
    slidePreviewArray.forEach(preview => {
    previewContainer.append(preview)
    })/*  */
    //Append slides/






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
        slide.style.cssText = "transition:0.2s ease-in-out; opacity:0.5s;";
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












