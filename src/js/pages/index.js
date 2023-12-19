import { listings } from "../api/api.js";
import { articleCard, skeletonCards,createCardElement, norwegianEndDate, localStorageItems } from "../utils/utils.js";

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









const renderFeaturedCards = async () => {
const skeleton = skeletonCards()
    const items = sortListingsByBids();
    for (let i = 0; i < items.length; i++) {
        featuredSection.innerHTML += skeleton
    }
    try {
    

        if (typeof items === "string" || items.length === 0) {
            featuredSection.innerHTML = `<span> Vi har problemet med å hente dataen. Vennligst prøv igjen </span>`;
        } else {
            featuredSection.innerHTML = "";
            const cardPromises = items.map(async (item) => {
                const { media, title, bids, endsAt, id } = item;
                const createBidArray = bids.map(bid => bid.amount)
                const highestBid = createBidArray.length > 0 ? Math.max(...createBidArray) : 0;
                const card = articleCard(media, title, highestBid, endsAt, id);
                return card

            });

            const cards = await Promise.all(cardPromises);
            featuredSection.innerHTML = ""
            cards.forEach(card => featuredSection.appendChild(card));
        }

    } finally { } 


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


        const CTAHeaders = () => {
            const primaryCTAText = document.querySelector("[data-type-cta='primary']");
            const secondaryCTAText = document.querySelector("[data-type-cta='secondary']");


            if (!localStorageItems.token) {
                primaryCTAText.innerHTML = "Utforsk spennende auksjoner nå!"
                secondaryCTAText.innerHTML = "Logg inn eller registrer deg for å delta og by på unike varer"
            } else {
                primaryCTAText.innerHTML = `Velkommen tilbake, ${localStorageItems.userData.name}!`
            }
        }




        const CTAButtons = () => {
            const CTABtnContainer = document.querySelector("[data-type-cta='btn-container']")
            const CTALoginBtn = createCardElement("a", "bg-custom-btnBgAccent text-custom-textWhite uppercase btn-bold flex justify-center items-center cta-btn-sm md:cta-btn-md lg:cta-btn-lg")
            CTALoginBtn.textContent = "Logg inn"
            CTALoginBtn.href = "/login.html"
            CTALoginBtn.role = "button"
            CTALoginBtn.ariaLabel = "Logg inn"
            const CTARegisterBtn = createCardElement("a", "bg-custom-btnBgSpecial text-black-500 uppercase  btn-bold flex justify-center items-center cta-btn-sm md:cta-btn-md lg:cta-btn-lg")
            CTARegisterBtn.textContent = "Registrer"
            CTARegisterBtn.href = "/signup.html"
            CTARegisterBtn.role = "button"
            CTARegisterBtn.ariaLabel = "Registrer"


            if (!localStorageItems.token) {
                CTABtnContainer.append(CTALoginBtn, CTARegisterBtn)
            }

        }
        CTAHeaders()
        CTAButtons()
    })();