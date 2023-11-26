import { listings } from "../api/api.js";
import {createCardElement, createButtonElement } from "../utils/utils.js";






const featuredListings = await listings(100);
const emptyObj = {};

const sortListingsByBids = () => {
 const items = featuredListings;
 const itemsByBids = items.filter(item => {
    const {media, _count} = item;
    return media && _count.bids >= 5
 })

 console.log(itemsByBids)
 return itemsByBids;
}



const featuredCards = (image, bids) => {
    const article = createCardElement("article", "text-white  flex flex-col p-1  h-auto w-auto");
    const articleDivHeader = createCardElement("div", "rounded-md bg-white relative h-[10rem] w-[10rem] md:h-[15rem] md:w-[15rem]")
    const articleDivHeaderImg = document.createElement("img")
    articleDivHeaderImg.src = image
    const articleDivFooter = createCardElement("div", "flex flex-col  items-center justify-center h-auto bg-accent") 
    const span = createCardElement("span");
    span.textContent ="Bids:"
    const spanBid = createCardElement("span");
    spanBid.textContent = bids
    const button = createButtonElement("ring-1 bg-comp p-1 w-2/4  rounded-md");
    button.textContent = "Place bid"
    

    article.append(articleDivHeader, articleDivFooter)
    articleDivHeader.append(articleDivHeaderImg)
    articleDivFooter.append(span, button)
    span.append(spanBid)
  
    return article;
}

const test = featuredCards()


/* const renderFeaturedCards = () => {
const items = sortListingsByBids();
console.log(items)


}
renderFeaturedCards() */
/* featuredCards() */

//data-bid-count


