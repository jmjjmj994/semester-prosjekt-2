import { listings } from "../api/api.js";
import { createCardElement, createButtonElement, dateConverter, norwegianEndDate, localStorageItems } from "../utils/utils.js";

const featuredSection = document.querySelector("[data-featured-section='grid-container']");
const carouselContainer = document.querySelector("[data-carousel-container]");
const carouselSlides = document.querySelectorAll("[data-carousel-slide]");
const carouselPrevBtn = document.querySelector("[data-prev-btn]");
const carouselNextBtn = document.querySelector("[data-next-btn]");
const featuredListings = await listings(20);


const sortListingsByBids = () => {
    const items = featuredListings;
    const featuredItems = items
        .filter(item =>
            item.title && item.media && item._count && item._count.bids &&
            item.bids && Array.isArray(item.bids)
        )
        .map(({ title, media, _count, endsAt, id, bids }) => ({
            title,
            media,
            bids,
            endsAt,
            id
        }));

    return featuredItems;
}




const featuredCards = (title, image, bids, date, id) => {
    const createBidArray = bids.map(bid => bid.amount)
    const highestBid = Math.max(...createBidArray);
    const totalBids = createBidArray.reduce((accumulator, bidObj) => accumulator + bidObj)
    const article = createCardElement("article", "flex flex-col  relative  bg-custom-card relative shadow-md text-custom-textGrey");
    const articleLink = createCardElement("a", "absolute h-full w-full custom-z-low");
    articleLink.href = `/specific.html?id=${id}`
    const articleHeader = createCardElement("div", " h-[70%] relative")
    const articleHeaderImage = createCardElement("img", "absolute object-cover w-full h-full ");
    image.length === 0 ? articleHeaderImage.src = "src/assets/no-image.jpg" : articleHeaderImage.src = image;
    articleHeaderImage.alt = "Auksjons-produkt";
    articleHeader.append(articleHeaderImage)
    const articleBody = createCardElement("div", "basis-[auto] flex   p-1");
    const articleBodyTitle = createCardElement("span", "card-title-typography mt-6");
    articleBodyTitle.textContent = title;
    articleBody.append(articleBodyTitle)
    const articleFooter = createCardElement("div", "flex basis-[auto] py-3 justify-between items-end p-1 ");
    const articleFooterCol1 = createCardElement("div", "flex flex-col ")
    const articleFooterCol1TotalBids = createCardElement("span", "mb-3")
    articleFooterCol1TotalBids.textContent = `Totale bud:${totalBids}`
    const articleFooterCol1HighestBid = createCardElement("span", "")
    articleFooterCol1HighestBid.textContent = `Høyeste bud:${highestBid}`
    articleFooterCol1.append(articleFooterCol1TotalBids, articleFooterCol1HighestBid)
    const articleFooterCol2 = createCardElement("div", "");
    const articleFooterCol2Icon = createCardElement("i", "fa-regular fa-clock")
    const articleFooterCol2EndDate = createCardElement("span")
    articleFooterCol2EndDate.textContent = date
    articleFooterCol2.append(articleFooterCol2Icon, articleFooterCol2EndDate)
    articleFooter.append(articleFooterCol1, articleFooterCol2)
    article.append(articleLink)
    article.append(articleHeader, articleBody, articleFooter)
    return article;



}
const featuredSkeletonCards = () => {
    const skeletonArticle = createCardElement("article", "flex flex-col relative bg-custom-secondary relative shadow-md animate-pulse");

    const skeletonArticleHeader = createCardElement("div", "flex flex-col  relative  bg-custom-secondary relative shadow-md text-custom-textDark");
    const skeletonArticleHeaderDiv = createCardElement("div", "h-[70%] bg-orange-500")
    skeletonArticleHeader.append(skeletonArticleHeaderDiv)
    const skeletonArticleBody = createCardElement("div", "basis-full flex items-center text-custom-textDark");
    const skeletonArticleBodyTitle = createCardElement("span", "bg-white opacity-0 card-title-typography");
    const skeletonArticleFooter = createCardElement("div", "flex justify-between items-end pb-2");
    const skeletonArticleFooterCol1 = createCardElement("div", "flex flex-col text-custom-textDark");
    const skeletonArticleFooterCol1TotalBids = createCardElement("span", "bg-white opacity-0");
    const skeletonArticleFooterCol1HighestBid = createCardElement("span", "bg-white opacity-0");
    const skeletonArticleFooterCol2 = createCardElement("div", "text-custom-textDark");
    const skeletonArticleFooterCol2Icon = createCardElement("i", "fa-regular fa-clock bg-white opacity-0");
    const skeletonArticleFooterCol2EndDate = createCardElement("span", "bg-white opacity-0");

    skeletonArticle.append(skeletonArticleHeader, skeletonArticleBody, skeletonArticleFooter);
    skeletonArticleBody.append(skeletonArticleBodyTitle);
    skeletonArticleFooterCol1.append(skeletonArticleFooterCol1TotalBids, skeletonArticleFooterCol1HighestBid);
    skeletonArticleFooterCol2.append(skeletonArticleFooterCol2Icon, skeletonArticleFooterCol2EndDate);
    skeletonArticleFooter.append(skeletonArticleFooterCol1, skeletonArticleFooterCol2);

    return skeletonArticle

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
        featuredSection.innerHTML = "";
        items.forEach(item => {
            const norwegianTime = norwegianEndDate(item.endsAt);
            featuredSection.append(articleCard(item.title, item.media, item.bids, norwegianTime, item.id));
        });
    } catch (error) {
        console.error(error);
    }


}








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


 
renderFeaturedCards() 


; (() => {
    const CTAButtons = () => {
        const CTABtnContainer = document.querySelector("[data-type-cta='btn-container']")
        const CTALoginBtn = createCardElement("a", "bg-custom-btnBgAccent text-custom-textWhite uppercase  flex justify-center items-center cta-btn-sm md:cta-btn-md lg:cta-btn-lg")
        CTALoginBtn.textContent = "Logg inn"
        CTALoginBtn.href = "/login.html"
        CTALoginBtn.role = "button"
        CTALoginBtn.ariaLabel = "Logg inn"
        const CTARegisterBtn = createCardElement("a", "bg-custom-btnBgSpecial text-custom-textDark uppercase  flex justify-center items-center cta-btn-sm md:cta-btn-md lg:cta-btn-lg")
        CTARegisterBtn.textContent = "Registrer"
        CTARegisterBtn.href = "/signup.html"
        CTARegisterBtn.role = "button"
        CTARegisterBtn.ariaLabel = "Registrer"


        if (!localStorageItems.token) {
            CTABtnContainer.append(CTALoginBtn, CTARegisterBtn)
        }

    }
    CTAButtons()
})();