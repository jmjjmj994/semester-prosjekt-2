import { createCardElement } from "./src/js/utils/utils.js";

const params = new URLSearchParams(window.location.search);
const currentPage = params.get("page")
const currentResult = params.get("results")
let getPageNum;

if (!isNaN(parseInt(currentPage))) {
    getPageNum = parseInt(currentPage);

} else {
    getPageNum = 0;
}


async function fetchListings(tag) {
    const url =
        `https://api.noroff.dev/api/v1/auction/listings?_seller=true&_active=true&_tag=${tag}&limit=10&offset=${getPageNum * 10}`;
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            const data = await res.json()

            if (data.length > 0) {
                console.log(data)
                return data;
            } else {
                return "no more data";
            }

        } else {
            throw new Error("Failed to fetch data")
        }


    } catch (error) {
        console.log(error.message)
    }
}




const initializer = async () => {
    const nextButton = document.querySelector("[data-type-section='pagination-next-btn']");
    const prevButton = document.querySelector("[data-type-section='pagination-prev-btn']");
    if (getPageNum === 0) {
        prevButton.style.display = "none"
    }
    if (currentResult) {
        const resultsValue = currentResult.substring(" ");
        nextButton.addEventListener("click", async (e) => {
            e.target.href = `/bidding.html?results=${resultsValue}&page=${getPageNum + 1}`
        })
        prevButton.addEventListener("click", async (e) => {
            e.target.href = `/bidding.html?results=${resultsValue}&page=${getPageNum - 1}`
        })
    } else {
        nextButton.addEventListener("click", async (e) => {
            e.target.href = `/bidding.html?page=${getPageNum + 1}`
        })

        prevButton.addEventListener("click", async (e) => {
            e.target.href = `/bidding.html?page=${getPageNum - 1}`
        })

    }

  



}


if (currentResult) {
    const resultsValue = currentResult.substring(" ");
    fetchListings(resultsValue)
} else if (currentPage) {
    fetchListings("")
} else {
    fetchListings("")
}



initializer()






/* 




const listeners = async (end) => {
    console.log(end)
    const buttonContainer = document.querySelector("[data-type-section='pagination-buttons']")
    const nextButton = document.querySelector("[data-type-section='pagination-next-btn']");
    const prevButton = document.querySelector("[data-type-section='pagination-prev-btn']");



    if (getPageNum === 0) {
        prevButton.style.display = "none"
    }

    if (end) {
        prevButton.style.display = "none"
        nextButton.style.display = "none"
    }
    nextButton.addEventListener("click", async (e) => {
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


const renderListings = async () => {
    let end = false;
    const listingsContainer = document.querySelector("[data-type-section='listings']")
    const listingData = await fetchListings()
    console.log(listingData)
    listingsContainer.innerHTML = "";

    if (listingData.length === 0) {
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








const initializer = () => {
    fetchListings()
    listeners()
    renderListings()
}
initializer() */