import { articleCard, createButtonElement, skeletonCards } from "../utils/utils.js"
const params = new URLSearchParams(window.location.search)
const results = params.get("results");
let sortOrder = params.get("sort") || "asc";
const ascFilter = document.querySelector("[data-type-bidding-sort='asc']");
const descFilter = document.querySelector("[data-type-bidding-sort='desc']");


const updateFilterColors = () => {
    if (sortOrder === "asc") {
        ascFilter.style.color = "#ccccff";
        descFilter.style.color = "";
    } else {
        descFilter.style.color = "#ccccff";
        ascFilter.style.color = "";
    }
};

; (() => {
    window.addEventListener('load', () => {
        if (!sortOrder || sortOrder === "asc") {
            ascFilter.style.color = "#ccccff";
            descFilter.style.color = "";
        } else {
            descFilter.style.color = "#ccccff";
            ascFilter.style.color = "";
        }
    });
});
; (() => {
    const details = document.querySelector("[data-type-bidding='details']")
   details.addEventListener("mouseleave", () => {
    details.open = false
   })


})();



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


const setUrl = async () => {
    const pageNumber = pageParams();
    const sortOrder = params.get("sort");
    const defaultUrl = `https://api.noroff.dev/api/v1/auction/listings?_seller=true&_active=true&_bids=true&sort=endsAt&sortOrder=asc&limit=42&offset=${pageNumber * 42}`;
    let url = defaultUrl;
    if (results) {
        url = `https://api.noroff.dev/api/v1/auction/listings?_seller=true&_active=true&_bids=true&_tag=${results}&limit42&offset=${pageNumber * 42}`;
    }
    if (sortOrder) {
        url = `https://api.noroff.dev/api/v1/auction/listings?sort=endsAt&sortOrder=${sortOrder}&_seller=true&_active=true&_bids=true&limit42&offset=${pageNumber * 42}`;
    }
    await listings(url);
    pagination(results, sortOrder);
};



const updateURL = (option, param) => {
    const pageNumber = currentPage(params.get("page"));
    param = param || "asc"; 
    window.history.pushState({}, "", `/bidding.html?${option ? `results=${option}&` : ''}sort=${param}&page=${pageNumber}`);
};









ascFilter.addEventListener("click", async (e) => {
    e.preventDefault();
    sortOrder = "asc";
    updateFilterColors();
    params.set("sort", sortOrder);
    params.set("page", "0");
    updateURL(results, sortOrder);
    await setUrl();
});


descFilter.addEventListener("click", async (e) => {
    e.preventDefault();
    sortOrder = "desc";
    updateFilterColors();
    params.set("sort", sortOrder);
    params.set("page", "0");
    updateURL(results, sortOrder);
    await setUrl();
});







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
    } else if (data.length < 40) {
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
    const container = document.querySelector("[data-type-section='listings-container']");
    const scrollTopBtn = createButtonElement("w-[2rem] h-[2rem] rounded-full shadow-xl bg-white fixed right-[5px] custom-z-mid bg-custom-secondary hidden lg:block")
  scrollTopBtn.onclick = ()  => scrollTop()

    const details = document.querySelector("[data-type-bidding='details']")
    const loader = document.querySelector(".loader");
    if(loader) {
        loader.style.display = "block";
    }
   
    container.innerHTML = ""; 
    try {
        if (Array.isArray(data) && data.length > 0) {
        
            scrollTopBtn.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`
            container.append(scrollTopBtn)
            const cardPromises = data.map(async (item) => {
                const { media, title, bids, endsAt, id } = item;
                const highestBid = bids.length > 0 ? Math.max(...bids.map(bid => bid.amount)) : 0;
                return articleCard(media, title, highestBid, endsAt, id);
            });
            const cards = await Promise.all(cardPromises);
            cards.forEach(card => container.appendChild(card));
        } else {
            details.style.display = "none";
            scrollTopBtn.style.display = "none";
            container.innerHTML = ` <span class="absolute top-[35%] text-custom-textDark text-2xl text-center px-2 absolute-centered"> Ingen data tilgjengelig. Trykk <a class="text-purple-600 underline" href="/bidding.html">her</a> for å gå tilbake. </span> `;
        }
    } finally {
        loader.style.display = 'none';
    }
}



function scrollTop () {
    window.scrollTo(0, 0)
    const html = document.querySelector("html");
    
}


    ; (() => {
        window.addEventListener('load', () => {
            updateFilterColors();
            setUrl();
          

        });
    })();