import { listings, singleProfile, listingsByDate } from "../api/api.js";
import { articleCard, skeletonCards, createCardElement, norwegianEndDate, localStorageItems } from "../utils/utils.js";

; (() => {
    const CTAHeaders = () => {
        const CTAWrapper = document.querySelector("[data-type-cta='wrapper']")
        const CTAHeader = createCardElement("h1", "text-custom-textDark lg:max-w-[45ch]")
        const CTAHeaderPrimary = createCardElement("span", "cta-header block")
        const CTAHeaderSecondary = createCardElement("span", "cta-header-secondary block text-wrap ")
        CTAWrapper.prepend(CTAHeader)
        CTAHeader.append(CTAHeaderPrimary, CTAHeaderSecondary)
        if (!localStorageItems.token) {
            CTAHeaderPrimary.innerHTML = "Utforsk spennende auksjoner nå!"
            CTAHeaderSecondary.innerHTML = "Logg inn eller registrer deg for å delta og by på unike varer."
        } else {
            CTAHeaderPrimary.innerHTML = `Velkommen tilbake, ${localStorageItems.userData.name}!`
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




; (async () => {
    const illustrations = {
        illustration_1: "src/assets/Search engines-amico.webp",
        illustration_2: "src/assets/Save the Earth-amico.webp",
    }
    const CTASecondaryContainer = document.querySelector("[data-type-cta='secondary-cta']")
    if (localStorageItems && localStorageItems.userData && localStorageItems.userData.name) {
        const fetchProfile = await singleProfile(localStorageItems.userData.name);
        const profileListings = Object.values(fetchProfile._count)[0]
        CTASecondaryContainer.className = " text-accent flex overflow-hidden   items-center justify-center h-[50vh]"
        CTASecondaryContainer.innerHTML = `
<div class="flex-1 h-full relative flex flex-col">
  <div class="bg-custom-secondary auto-slide-translate text-custom-textDark global-padding flex flex-col items-center justify-center w-full h-full absolute">
    <a class="h-[20rem] max-w-[20rem] w-full flex flex-col items-center justify-center right-0 bottom-[20px] text-xs" href="https://storyset.com/web">
      <img class="w-full h-full object-cover" src="${illustrations.illustration_1}" alt="Illustration">
      Web illustrations by Storyset
    </a>
  </div>
</div>
         `

    } else {
        CTASecondaryContainer.className = "bg-custom-ctaSecondary text-accent flex flex-col items-center justify-center h-[50vh]"
        CTASecondaryContainer.innerHTML = `
          <h2 class="text-custom-textWhite cta-header text-center">Bli med! Legg inn ett  bud.</h2>
                <a href="/bidding.html"
                    class="bg-custom-btnBgSpecial ring-comp text-accent cta-btn-sm md:cta-btn-md lg:cta-btn-lg mt-5 rounded uppercase flex items-center justify-center cursor-pointer">
                    Utforsk
                </a>`
    }
})();




; (async () => {
    const featuredSection = document.querySelector("[data-featured-section='grid-container']");
    const featuredListings = await listingsByDate("asc", 33);
    const sortListingsByBids = () => {
        const items = featuredListings;
        const featuredItems = items
            .filter(item =>
                item.title && item.media && item._count && item._count.bids &&
                item.bids && Array.isArray(item.bids)
            )
            .map(({ title, media, endsAt, id, bids }) => ({
                title,
                media,
                bids,
                endsAt,
                id
            }));
        return featuredItems;
    }


    const renderFeaturedCards = async () => {
        const items = sortListingsByBids();
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < items.length; i++) {
            fragment.appendChild(skeletonCards())
        }
        featuredSection.appendChild(fragment)
        try {
            if (Array.isArray(items)) {
                const cardPromises = items.map(async (item) => {
                    const { media, title, bids, endsAt, id } = item;
                    const createBidArray = bids.map(bid => bid.amount)
                    const highestBid = createBidArray.length > 0 ? Math.max(...createBidArray) : 0;
                    const card = articleCard(media, title, highestBid, endsAt, id);
                    return card
                })
                const cards = await Promise.all(cardPromises);
                featuredSection.innerHTML = ""
                cards.forEach(card => featuredSection.appendChild(card));
            } else {

                throw new Error("Problem med å hente dataen")

            }

        } catch (error) {
            featuredSection.innerHTML = "<p> Vi har problemer med å hente dataen. Vennligst prøv igjen</p>"
        }
    }
    renderFeaturedCards()
})();



; (() => {
    const carouselSlides = document.querySelectorAll("[data-carousel-slide]");
    const carouselPrevBtn = document.querySelector("[data-prev-btn]");
    const carouselNextBtn = document.querySelector("[data-next-btn]");
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
})();



