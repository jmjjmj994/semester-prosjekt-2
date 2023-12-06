import { createCardElement } from "./src/js/utils/utils.js";
const limit = 10;
let pageNumber = window.location.search;
const getPageNum = parseInt(pageNumber.split("=")[1])
console.log(getPageNum)
const listings = async () => {
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
            console.log(data)
          
        } else {
            throw new Error("Failed to fetch data")
        }


    } catch (error) {
        console.log(error.message)
    }
}

listings()





const listeners = () => {
    const buttonContainer = document.querySelector("[data-type-section='pagination-buttons']")
    const nextButton = createCardElement("a", "bg-blue p-2");
    const prevButton = createCardElement("a", "bg-red p-2");
    nextButton.textContent = "Next";
    prevButton.textContent ="Previous"
    buttonContainer.append(prevButton, nextButton)

    
nextButton.addEventListener("click",(e) => {
    e.target.href = `/bidding.html?page=${getPageNum +1}`
})

prevButton.addEventListener("click", (e) => {
    e.target.href = `/bidding.html?page=${getPageNum - 1}`
})

}
listeners()


/* const load = () => {
    getUrlParam
}

const displayFirstRender = (data) => {

}

displayFirstRender("data")

 */






const next = () => {
/*     <a href="./?page=2"></a> */
}





