import { createCardElement, norwegianEndDate } from "./src/js/utils/utils.js";
const auctionContainer = document.querySelector("[data-type-section='listings']")
const buttonContainer = document.querySelector("[data-type-section='pagination-buttons']")
console.log(buttonContainer)
console.log(auctionContainer)
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
        `https://api.noroff.dev/api/v1/auction/listings?_seller=true&_active=true&&_bids=true&_tag=${tag}&limit=10&offset=${getPageNum * 10}`;
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            const data = await res.json()
            return data;

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
    if (currentResult) {
        const resultsValue = currentResult.substring(" ");
        nextButton.addEventListener("click", (e) => {
            e.target.href = `/bidding.html?results=${resultsValue}&page=${getPageNum + 1}`;
        });
        prevButton.addEventListener("click", (e) => {
            e.target.href = `/bidding.html?results=${resultsValue}&page=${getPageNum - 1}`;
        });
        const data = await fetchListings(resultsValue);
        handleData(data);
    } else {
        nextButton.addEventListener("click", (e) => {
            e.target.href = `/bidding.html?page=${getPageNum + 1}`;
        });
        prevButton.addEventListener("click", (e) => {
            e.target.href = `/bidding.html?page=${getPageNum - 1}`;
        });
        const data = await fetchListings("");
        handleData(data);
    }
};

const handleData = (data) => {
    const nextButton = document.querySelector("[data-type-section='pagination-next-btn']");
    const prevButton = document.querySelector("[data-type-section='pagination-prev-btn']");


    if (data.length < 10) {
        nextButton.classList.add('hidden');
        buttonContainer.classList.add('hidden');
    } else {
        prevButton.classList.remove('hidden');
        nextButton.classList.remove('hidden');
    }

    if (data.length === 0) {
        prevButton.classList.add('hidden');
        nextButton.classList.add('hidden');
        renderAuctionCards("No more data");
    }

    if (getPageNum === 0) {
        prevButton.classList.add('hidden');
    }
    renderAuctionCards(data)
};







const auctionCards = (title, image, bids, date, id) => {
    console.log(title)
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


const renderAuctionCards = async (data) => {
    try {
        if (typeof data === "string") {
            auctionContainer.innerHTML = "No data available.";

        } else {
            const articleCard = auctionCards;
            auctionContainer.innerHTML = "";
            const auctionData = data.filter(item =>
                item.title && item.media && item._count && item._count.bids &&
                item.bids && Array.isArray(item.bids)
            ).map(({ title, media, _count, endsAt, id, bids }) => ({
                title,
                media,
                bids,
                endsAt,
                id
            }));

            if (auctionData.length > 0) {
                auctionData.forEach(item => {
                    const norwegianTime = norwegianEndDate(item.endsAt);
                    auctionContainer.append(articleCard(item.title, item.media, item.bids, norwegianTime, item.id));
                });
            } else {
                auctionContainer.innerHTML = "No data available.";
                buttonContainer.display = "none"

            }
        }
    } finally {

    }
};



initializer();



