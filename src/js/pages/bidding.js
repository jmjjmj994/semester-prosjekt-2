import { articleCard, skeletonCards } from "../utils/utils.js"
const params = new URLSearchParams(window.location.search)
const results = params.get("results");
const ascDate = params.get("asc")
const descDate = params.get("desc")
const ascFilter = document.querySelector("[data-type-bidding-sort='asc']")
const descFilter = document.querySelector("[data-type-bidding-sort='desc']")
const titleFilter = document.querySelector("[data-type-bidding-sort='a-å']")
const pageParams = () => {
    const page = params.get("page")
    return currentPage(page)
}

const currentPage = (page) => {
    let getPageNum;
    if (!isNaN(parseInt(page))) {
        getPageNum = parseInt(page);
    } else {
        getPageNum = 0;
    }
    return getPageNum
}







const render = async () => {
    const pageNumber = pageParams();
    const sortOrder = params.get("sort");
    const defaultUrl = `https://api.noroff.dev/api/v1/auction/listings?_seller=true&_active=true&_bids=true&sort=endsAt&sortOrder=asc&limit=10&offset=${pageNumber * 10}`;
    let url = defaultUrl;
    if (results) {
        url = `https://api.noroff.dev/api/v1/auction/listings?_seller=true&_active=true&_bids=true&_tag=${results}&limit=10&offset=${pageNumber * 10}`;
    }
    if (sortOrder) {
        url = `https://api.noroff.dev/api/v1/auction/listings?sort=endsAt&sortOrder=${sortOrder}&_seller=true&_active=true&_bids=true&limit=10&offset=${pageNumber * 10}`;
    }
    await listings(url);
    pagination(results, sortOrder);
};



const updateURL = (option, param) => {
    console.log(option, param)
    const pageNumber = pageParams();
    if (option && param) {
        window.history.pushState({}, "", `/bidding.html?results=${option}&sort=${param}&page=${pageNumber}`);
    } else if (option) {
        window.history.pushState({}, "", `/bidding.html?results=${option}&page=${pageNumber}`);
    } else {
        window.history.pushState({}, "", `/bidding.html?page=${pageNumber}`);
    }
};









ascFilter.addEventListener("click", async (e) => {
    e.preventDefault()
    const queries = params.set("sort", "asc")
    params.set("sort", "asc");
    params.set("page", "0");
    updateURL(results, "asc");
    await render();

})






descFilter.addEventListener("click", async (e) => {
    e.preventDefault()
    const queries = params.set("sort", "desc")
    params.set("sort", "desc");
    params.set("page", "0");
    updateURL(results, "desc");
    await render();

})

/* titleFilter.addEventListener("click", async (e) => {
    e.preventDefault()
    updateURL("", "")
    await render()
}) */

const pagination = async (option, param) => {
    const pageNumber = pageParams();
    const prevBtn = document.querySelector("[data-type-section='pagination-prev-btn']");
    const nextBtn = document.querySelector("[data-type-section='pagination-next-btn']");

    prevBtn.href = (pageNumber > 0) ? `/bidding.html?page=${pageNumber - 1}` : `/bidding.html?page=0`;

    if (option) {
        nextBtn.href = `/bidding.html?results=${option}&page=${pageNumber + 1}`;
    } else {
        nextBtn.href = `/bidding.html?page=${pageNumber + 1}`;
    }

    if (option && param) {
        nextBtn.href = `/bidding.html?results=${option}&sort=${param}&page=${pageNumber + 1}`;
    }

    if (param) {
        nextBtn.href = `/bidding.html?sort=${param}&page=${pageNumber + 1}`;
    }
};





async function listings(url) {
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            const data = await res.json()
            handleData(data)
        } else {
            throw new Error("Failed to fetch data")
        }

    } catch (error) {
        console.log(error.message)
    }
}



render()




const handleData = async (data) => {
    const buttonContainer = document.querySelector("[data-type-section='pagination-buttons']")
    const prevBtn = document.querySelector("[data-type-section='pagination-prev-btn']");
    const nextBtn = document.querySelector("[data-type-section='pagination-next-btn']");
    const pageNumber = pageParams()
    if (data.length === 0) {
        console.log("Data length is 0");
        renderCards("No more data");

        nextBtn.classList.add("hidden");
        prevBtn.classList.add("hidden");
    } else if (data.length < 10) {
        nextBtn.classList.add('hidden');
        prevBtn.classList.remove('hidden');

    } else if (pageNumber === 0) {
        buttonContainer.className = " basis-[auto] w-full md:w-[20rem]   absolute bottom-0 flex justify-end lg:items-center left-[50%] transform -translate-x-1/2 -translate-y-1/2 px-1"
        nextBtn.classList.remove("hidden");
        prevBtn.classList.add("hidden");
    } else {
        buttonContainer.className = " basis-[auto] w-full md:w-[20rem]   absolute bottom-0 flex justify-between lg:items-center left-[50%] transform -translate-x-1/2 -translate-y-1/2 px-1"
        nextBtn.classList.remove("hidden");
        prevBtn.classList.remove("hidden");
    }


    renderCards(data)
}


const renderCards = async (data) => {
    console.log(data)
    const container = document.querySelector("[data-type-section='listings-container']")
    const skeleton = skeletonCards()
    for (let i = 0; i < data.length; i++) {
        container.innerHTML += skeleton
    }
    try {
        if (typeof data === "string" || data.length === 0) {
            container.innerHTML = `<span> Ingen data tilgjengelig. Trykk <a class="text-purple-600 underline" href="/bidding.html">her</a> for å gå tilbake. </span>`;
        } else {
            container.innerHTML = "";
            const cardPromises = data.map(async (item) => {
                const { media, title, bids, endsAt, id } = item;
                const createBidArray = bids.map(bid => bid.amount)
                const highestBid = createBidArray.length > 0 ? Math.max(...createBidArray) : 0;
                const card = articleCard(media, title, highestBid, endsAt, id);
                return card

            });

            const cards = await Promise.all(cardPromises);
            container.innerHTML = ""
            cards.forEach(card => container.appendChild(card));
        }

    } finally { }

}
