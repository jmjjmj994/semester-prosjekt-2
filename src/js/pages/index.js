import { listings } from "../api/api.js";
import { createCardElement, createButtonElement, dateConverter} from "../utils/utils.js";

const featuredSection = document.querySelector("[data-featured-section]");
const carouselContainer = document.querySelector("[data-carousel-container]");
const carouselSlides = document.querySelectorAll("[data-carousel-slide]");
const carouselPrevBtn = document.querySelector("[data-prev-btn]");
const carouselNextBtn = document.querySelector("[data-next-btn]");
const featuredListings = await listings(20);


const sortListingsByBids = () => {
    const items = featuredListings;
    const itemsByBids = items
        .filter(item => item.media && item._count && item._count.bids >= 5 )
        .map(({ media, _count, endsAt, id }) => ({ media, bids: _count.bids, endsAt, id }))

    return itemsByBids
}




const featuredCards = (image, bids, date, id) => {
console.log(id)
    const article = createCardElement("article", "text-white   flex flex-col items-center relative   bg-custom-secondary rounded-md py-2 cursor-pointer");
    const linkHref = createCardElement("a", "absolute h-full w-full bg-orange-500")
    linkHref.href = `/specific.html?id=${id}`
    const articleDivHeader = createCardElement("div", "rounded-md  bg-white relative h-full w-full ")
    const articleDivHeaderImg = document.createElement("img")
    articleDivHeaderImg.src = image
    articleDivHeaderImg.className = "h-full w-full object-cover rounded-md border-2 "
    const articleDivFooter = createCardElement("div", "flex  w-full flex-col items-center justify-center h-auto gap-4 text-typography-standard")
    const articleDivFooterTop = createCardElement("div", "flex flex-col text-sm ring-1 items-center" );
    const spanBid = createCardElement("span");
    const spanDateRemaining = createCardElement("span");
    spanDateRemaining.textContent = "Slutter:"
    spanBid.className = "text-black"
    spanBid.textContent = "Antall bud:"
    const spanDateRemainingTime = createCardElement("span");
    spanDateRemainingTime.textContent = date
    const spanBidCount = createCardElement("span");
    spanBidCount.textContent = bids;
    spanDateRemaining.append(spanDateRemainingTime)
    spanBid.append(spanBidCount)
    articleDivFooterTop.append(spanDateRemaining, spanBid)

    const button = createButtonElement("border-2 border-accent  text-accent p-1 w-2/4  rounded-md ");
    button.textContent = "Place bid"
    article.append(articleDivHeader, articleDivFooter, linkHref)
    articleDivHeader.append(articleDivHeaderImg)
    articleDivFooter.append(articleDivFooterTop, button)
 
    return article;
}
const featuredSkeletonCards = () => {
    const article = createCardElement("article", "animate-pulse text-white  flex flex-col p-1  h-auto w-auto relative ")
    const divHeader = createCardElement("div", "rounded-md bg-white relative h-[10rem] w-[10rem] md:h-[15rem] md:w-[15rem]")
    const divFooter = createCardElement("div", "flex flex-col  items-center justify-center h-auto bg-accent")
    const span = createCardElement("span", "bg-white opacity-0")
    span.textContent = "399";
    const button = createButtonElement("border-1 border-accent ring-comp p-1 w-2/4  rounded-md")
    button.textContent = "Place bid"
  
    article.append(divHeader, divFooter)
    divFooter.append(span, button)
    return article
}





const renderFeaturedCards = async () => {
    const items = sortListingsByBids();
    const norwegianDate = dateConverter;
    
    const articleCard = featuredCards;
    featuredSection.innerHTML = "";
    for (let i = 0; i < items.length; i++) {
        const skeletonCard = featuredSkeletonCards();
        featuredSection.append(skeletonCard);
    }

    try {




      /*    await new Promise((resolve => setTimeout(resolve, 3000)))  */
        featuredSection.innerHTML = ""
        items.forEach(item => {
       
            
            
            featuredSection.append(articleCard(item.media, item.bids, norwegianDate(item.endsAt), item.id))
        })
    } catch (error) {

    }



}
 renderFeaturedCards()     







carouselSlides.forEach((slide, index) => {
    slide.style.cssText = "transition:0.2s ease-in-out; opacity:0.5s;";
    slide.style.transform = `translateX(${index * 100}%)`;

});
let curSlide = 0;
let maxSlide = carouselSlides.length - 1;
carouselNextBtn.addEventListener("click", (e) => {
    curSlide === maxSlide ? (curSlide = 0) : curSlide++;
    moveSlides();
});

carouselPrevBtn.addEventListener("click", (e) => {
    curSlide === 0 ? (curSlide = maxSlide) : curSlide--;
        moveSlides();
});


function moveSlides() {
    carouselSlides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
    });
}

