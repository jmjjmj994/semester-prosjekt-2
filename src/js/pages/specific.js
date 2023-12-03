import { singleListing } from "../api/api.js";
const queryString = document.location.search;
const param = new URLSearchParams(queryString)
const id = param.get("id")
console.log(id)

/* 
const res = await singleListing(id) */


const prevBtn = document.querySelector("[data-type-specific='prev-btn']")
const nextBtn = document.querySelector("[data-type-specific='next-btn']")
const sliderContainer = document.querySelector("[data-type-specific='slider']")
const slide = document.querySelectorAll("[data-type-specific='slide']")

let curSlide = 0;
let maxSlide = slide.length - 1;
console.log(maxSlide)
slide.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`;
    slide.style.cssText = "transition:0.2s ease-in-out; opacity:0.5s;";
})
const previewSlider = () => {

}



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


const previewSlide = document.querySelectorAll("[data-type-specific='slide-preview']")



previewSlide.forEach((preview, index) => {
    preview.addEventListener("click", (e) => {
       const currentIndex = index;
       curSlide = index
       moveSlidesOnClick(currentIndex)
    })
})



function moveSlidesOnClick (num) {
    slide.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - num)}%)`;

    });
    
}