import { createCardElement, createButtonElement,dateConverter } from "../utils/utils.js";

const listingsContainer = document.querySelector("[data-type-section='listings']")

const listings = async (pageNum) => {
   


    const url =
        `https://api.noroff.dev/api/v1/auction/listings?_seller=true&_active=true&limit=10&offset=${pageNum}`;

    


    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            const data = await res.json();
            renderListings(data)
        } else {
            throw new Error("Failed to fetch data")
        }


    } catch (error) {
        console.log(error.message)
    }
}



//1fd16e0d #ef788


const dynamicUrl =  (pageNum) => {
    const offset = (pageNum) * 10;
    const params = new URLSearchParams(window.location.search);
    params.set("offset", offset)
    const newUrl = `${window.location.pathname}?${params.toString()}`
    history.pushState(null, "", newUrl)
    return offset

}
/* const currentPage = renderListings(0); */


const updatePage = async () => {
    const params = new URLSearchParams(window.location.search)
    let num = Number(params.get("offset")) || 0;
    console.log(num)
    const buttonContainer = document.querySelector("[data-type-section='pagination-buttons']")
    const buttonNext = createButtonElement("bg-primary-500 w-[1rem] h-[1rem]")
    const buttonPrev = createButtonElement("bg-primary-500 w-[1rem] h-[1rem]")
    buttonNext.textContent = "next"
    buttonPrev.textContent = "Previous"
    buttonContainer.append(buttonPrev, buttonNext)
    const currentPage = dynamicUrl;


    
    const listeners =  () => {
        buttonNext.addEventListener("click",  async (e) => {
            num++
            console.log(num)
           const currentPage = dynamicUrl(num)
           await listings(currentPage)
           
        })
        buttonPrev.addEventListener("click", async (e) => {
            num--
            console.log(num)
            const currentPage = dynamicUrl(num)
            await listings(currentPage)

        })

  

    }
   
    listeners()

}





updatePage()


function createCards (media)  {
const article = createCardElement("article", "w-[5rem] h-[5rem]")
const articleHeader = createCardElement("div", "relative h-full w-full")
const articleImage = createCardElement("img")
articleImage.src = media;
articleHeader.append(articleImage)
const articleBody = createCardElement("div")
const articleFooter = createCardElement("div")
article.append(articleHeader) 
return article
}

function renderListings(data) {
    console.log(data)
    listingsContainer.innerHTML ="";
data.forEach(item => {
    const {media} = item;
    const cards = createCards(media)
listingsContainer.append(cards)

}) 
}

/* 
window.addEventListener("popstate", async (e) => {
    
    const params = new URLSearchParams(window.location.search)
    let num = Number(params.get("offset")) / 10 || 0;
    listingsContainer.innerHTML ="";
   await listings(num)

})  */