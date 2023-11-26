import { listings } from "../api/api.js";
import { createCardElement, createButtonElement } from "../utils/utils.js";





const featuredSection = document.querySelector("[data-featured-section]");

const featuredListings = await listings(100);

const sortListingsByBids = () => {
    const items = featuredListings;
    const itemsByBids = items
        .filter(item => item.media && item._count && item._count.bids >= 5)
        .map(({ media, _count }) => ({ media, bids: _count.bids }))

    return itemsByBids
}




const featuredCards = (image, bids) => {
    const article = createCardElement("article", "text-white  flex flex-col p-1  h-auto w-auto");
    const articleDivHeader = createCardElement("div", "rounded-md bg-white relative h-[10rem] w-[10rem]  md:h-[15rem] md:w-[15rem] ")
    const articleDivHeaderImg = document.createElement("img")
    articleDivHeaderImg.src = image
    articleDivHeaderImg.className = "h-full w-full object-cover rounded-md border-4 border-comp"
    const articleDivFooter = createCardElement("div", "flex flex-col  items-center justify-center h-auto bg-accent")
    const span = createCardElement("span");
    span.textContent = "Bids:"
    const spanBid = createCardElement("span");
    spanBid.textContent = bids
    const button = createButtonElement("bg-comp p-1 w-2/4  rounded-md");
    button.textContent = "Place bid"
    article.append(articleDivHeader, articleDivFooter)
    articleDivHeader.append(articleDivHeaderImg)
    articleDivFooter.append(span, button)
    span.append(spanBid)
    return article;
}
const featuredSkeletonCards = () => {
    const article = createCardElement("article", "animate-pulse text-white  flex flex-col p-1  h-auto w-auto  ")
    const divHeader = createCardElement("div", "rounded-md bg-white relative h-[10rem] w-[10rem] md:h-[15rem] md:w-[15rem]")
    const divFooter = createCardElement("div", "flex flex-col  items-center justify-center h-auto bg-accent")
    const span = createCardElement("span", "bg-white opacity-0")
    span.textContent = "399";
    const button = createButtonElement("ring-1 p-1 w-2/4  rounded-md")
    button.textContent = "Place bid"
    article.append(divHeader, divFooter)
    divFooter.append(span, button)
    return article
}





const renderFeaturedCards = async () => {
    const items = sortListingsByBids();
    const articleCard = featuredCards;
    featuredSection.innerHTML = "";
    for (let i = 0; i < items.length; i++) {
        const skeletonCard = featuredSkeletonCards();
        featuredSection.append(skeletonCard);
    }

    try {




      await new Promise((resolve => setTimeout(resolve, 3000))) 
        featuredSection.innerHTML = ""
        items.forEach(item => {
            console.log(item)

            featuredSection.append(articleCard(item.media, item.bids))
        })
    } catch (error) {

    }



}
renderFeaturedCards()





