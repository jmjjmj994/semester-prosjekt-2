import { createCardElement, norwegianEndDate } from "../utils/utils.js"
const auctionContainer = document.querySelector("[data-type-section='listings']")
const auctionHeader = document.querySelector("[data-type-section='result-information']")
const buttonContainer = document.querySelector("[data-type-section='pagination-buttons']")

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
            console.log(data)
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
        auctionHeader.textContent = `Items matching "${resultsValue}"`;
        nextButton.addEventListener("click", (e) => {
            e.target.href = `/bidding.html?results=${resultsValue}&page=${getPageNum + 1}`;
        });
        prevButton.addEventListener("click", (e) => {
            e.target.href = `/bidding.html?results=${resultsValue}&page=${getPageNum - 1}`;
        });
        const data = await fetchListings(resultsValue);
        handleData(data);
    } else {
        auctionHeader.textContent = `All items`;
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

    if (data.length === 0) {
        console.log("Data length is 0");
        renderAuctionCards("No more data");
        buttonContainer.classList.add("hidden");
        nextButton.classList.add("hidden");
        prevButton.classList.add("hidden");
    } else if (data.length < 10) {
        nextButton.classList.add('hidden');
        prevButton.classList.remove('hidden');
       
    } else if (getPageNum === 0) {
        nextButton.classList.remove("hidden");
        prevButton.classList.add("hidden");
    } else {
        nextButton.classList.remove("hidden");
        prevButton.classList.remove("hidden");
    }

renderAuctionCards(data)
    

};







const auctionCards = async (title, image, bids, date, id) => {

     const createBidArray = bids.map(bid => bid.amount)
    const highestBid =  createBidArray.length > 0 ? Math.max(...createBidArray) : 0;
    const totalBids = createBidArray.reduce((accumulator, bidObj) => accumulator + bidObj,0)  
    const article = createCardElement("article", "flex flex-col  relative  bg-custom-card relative shadow-md text-custom-textGrey ");
    const articleLink = createCardElement("a", "absolute h-full w-full custom-z-low");
    articleLink.href = `/specific.html?id=${id}`
    const articleHeader = createCardElement("div", " h-[70%] relative")
    const articleHeaderImage = createCardElement("img", "absolute object-cover w-full h-full ");
    image.length === 0 ? articleHeaderImage.src = "src/assets/no-image.jpg" : articleHeaderImage.src = image;
    articleHeaderImage.alt = "Auksjons-produkt";
    articleHeader.append(articleHeaderImage)
    const articleBody = createCardElement("div", "basis-[auto] flex   p-1 overflow-hidden");
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
   
        if(typeof data === "string" || data.length === 0) {
            auctionContainer.innerHTML = `<span> Ingen data tilgjengelig. Trykk <a class="text-purple-600 underline" href="/bidding.html">her</a> for å gå tilbake. </span>`;
        } else {
            auctionContainer.innerHTML = "";
            const cardPromises = data.map(async (item) => {
                const { title, media, bids, endsAt, id } = item;
                const norwegianTime = norwegianEndDate(endsAt);
                return auctionCards(title, media, bids, norwegianTime, id);
            });

            const cards = await Promise.all(cardPromises);
            cards.forEach(card => auctionContainer.appendChild(card));
        }
        
    } finally{}
}


/* const renderAuctionCards = async (data) => {
    console.log(data)
    try {
        if (typeof data === "string") {
            auctionContainer.innerHTML = "No data available.";

        } else {
            const articleCard = auctionCards;
            auctionContainer.innerHTML = "";
        


          
            if (data.length > 0) {
                data.forEach(item => {
                    const {title, media, bids, endsAt, id} = item;
                    console.log(title)
                    const bidsArray = bids || [];
                     const norwegianTime = norwegianEndDate(endsAt);
                 auctionContainer.append(articleCard(title, media, bids, norwegianTime, id));  
                });
            } else {
                auctionContainer.innerHTML = "No data available.";
                buttonContainer.display = "none"

            }
        }
    } finally {

    }
};
 */


initializer();
