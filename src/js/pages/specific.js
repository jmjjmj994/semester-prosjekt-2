import { singleListing } from "../api/api.js";
import { createCardElement } from "../utils/utils.js";
const queryString = document.location.search;
const param = new URLSearchParams(queryString)
const id = param.get("id")












const prevBtn = document.querySelector("[data-type-specific='prev-btn']")
const nextBtn = document.querySelector("[data-type-specific='next-btn']")
const sliderContainer = document.querySelector("[data-type-specific='slider']")
const slide = document.querySelectorAll("[data-type-specific='slide']")
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







const renderItem =  async () => {
    const object = await fetchData();
    console.log(object)
    const media = object.media.forEach(img =>  {
   /*      const imageContainer = createCardElement("div", "flex-1 w-full h-full relative");
        imageContainer.setAttribute("data-type-specific", "slide");
        const image = createCardElement("img", "absolute w-full h-full object-cover" );
        console.log(imageContainer)
        image.src = img;
        imageContainer.append(image)
        console.log(image)
 sliderContainer.append(imageContainer)
         */

    })

}
renderItem()





let curSlide = 0;
let maxSlide = slide.length - 1;














nextBtn.addEventListener("click", (e) => {
    curSlide === maxSlide ? (curSlide = 0) : curSlide++;
    moveSlides();
});

prevBtn.addEventListener("click", (e) => {
    curSlide === 0 ? (curSlide = maxSlide) : curSlide--;
    moveSlides();
});


function moveSlides() {
    slide.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
    });
}




slide.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`;
    slide.style.cssText = "transition:0.2s ease-in-out; opacity:0.5s;";
})
previewSlide.forEach((preview, index) => {
    preview.addEventListener("click", (e) => {
        const currentIndex = index;
        curSlide = index
        moveSlidesOnClick(currentIndex)
    })
})



function moveSlidesOnClick(num) {
    slide.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - num)}%)`;

    });

}