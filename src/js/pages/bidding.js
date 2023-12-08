import { createCardElement, createButtonElement, dateConverter } from "../utils/utils.js";



const params = new URLSearchParams(window.location.search);
console.log(params)
const currentPage = params.get("page")
let getPageNum;

if(!isNaN(parseInt(currentPage))) {
getPageNum = parseInt(currentPage);

} else {
    getPageNum = 0;
}



const fetchListings = async () => {
    const url =
        `https://api.noroff.dev/api/v1/auction/listings?_seller=true&_active=true&limit=10&offset=${getPageNum * 10}`;
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            const data = await res.json();
            return data;

        } else {
            throw new Error("Failed to fetch data")
        }


    } catch (error) {
        console.log(error.message)
    }
}






const listeners = async (end) => {
    console.log(end)
    const buttonContainer = document.querySelector("[data-type-section='pagination-buttons']")
    const nextButton = document.querySelector("[data-type-section='pagination-next-btn']");
    const prevButton = document.querySelector("[data-type-section='pagination-prev-btn']");

 /*    const nextButton = createCardElement("a", "bg-blue p-2");
    const prevButton = createCardElement("a", "bg-red p-2"); */

    if(getPageNum === 0) {
        prevButton.style.display ="none"
    }

    if(end) {
        prevButton.style.display ="none"
        nextButton.style.display ="none"
    }
    nextButton.addEventListener("click",async (e) => {
        e.target.href = `/bidding.html?page=${getPageNum + 1}`
    })

    prevButton.addEventListener("click", async (e) => {
        e.target.href = `/bidding.html?page=${getPageNum - 1}`
    })

}




 function createCards(media) {
        const article = createCardElement("article")
    const articleHeader = createCardElement("div", "relative h-full w-full")
    const articleImage = createCardElement("img")
    articleImage.src = media;
    articleImage.loading = "lazy"
    articleHeader.append(articleImage)
    const articleBody = createCardElement("div")
    const articleFooter = createCardElement("div")
    article.append(articleHeader)
    return article
}


const renderListings =  async () =>  {
    let end = false;
    const listingsContainer = document.querySelector("[data-type-section='listings']")
    const listingData = await fetchListings() 
    console.log(listingData)
    listingsContainer.innerHTML = "";

    if(listingData.length === 0) {
        listingsContainer.innerHTML = "No listings"
        end = true;
        listeners(end)

    } else {
        listingData.forEach(item => {
            const { media } = item;
            const cards = createCards(media)
            listingsContainer.append(cards)

        }) 
    }
  
}
 







const initializer = ()  => {
    fetchListings()
    listeners()
    renderListings()
}
initializer()