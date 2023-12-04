import { singleListing } from "../api/api.js";
import { createCardElement } from "../utils/utils.js";
const queryString = document.location.search;
const param = new URLSearchParams(queryString)
const id = param.get("id")


const prevBtn = document.querySelector("[data-type-specific='prev-btn']")
const nextBtn = document.querySelector("[data-type-specific='next-btn']")
const sliderContainer = document.querySelector("[data-type-specific='slider']")
const previewContainer = document.querySelector("[data-type-specific='preview-container']")

const test = await singleListing(id);
console.log(test)




const fetchData = async () => {


    const res = await singleListing(id)

    const specificData = {
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
            const slide = createCardElement("div", "flex-1 w-full h-full absolute");
            const slideImage = createCardElement("img", "w-full h-full absolute object-cover");
            slideImage.src = image[i];
            slide.append(slideImage)
            slide.setAttribute("data-type-specific", "slide");
            const slidePreview = createCardElement("div", "flex-1 relative")
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
console.log(media)

if(media <= 1) {
    prevBtn.className ="hidden";
    nextBtn.className ="hidden";
    previewContainer.className ="hidden"

renderSingleSlide()
} else if (media > 1) {
handleSlides()
}

}

initializer() 
 








