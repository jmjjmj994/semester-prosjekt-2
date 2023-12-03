import { createCardElement, createButtonElement,dateConverter } from "../utils/utils.js";


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
            testCallback(data)
        } else {
            throw new Error("Failed to fetch data")
        }


    } catch (error) {
        console.log(error.message)
    }
}

function testCallback (data) {
    console.log(data)
}

//1fd16e0d #ef788


const renderListings =  (pageNum) => {
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
    let num = Number(params.get("offset")) / 10 || 0;
  
    const buttonContainer = document.querySelector("[data-type-section='listings']")
    const buttonNext = createButtonElement("bg-primary-500 w-[1rem] h-[1rem]")
    const buttonPrev = createButtonElement("bg-primary-500 w-[1rem] h-[1rem]")
    buttonNext.textContent = "next"
    buttonContainer.append(buttonNext, buttonPrev)
    const currentPage = renderListings;

    const addListener = () => {
        buttonNext.addEventListener("click", (e) => {
            num++
            console.log(num)
         /*    fetchData(num) */
           const currentPage = renderListings(num)
        })

        const fetchData = async (page) => {
            //0 initializer
            await listings(page)
          


        }

    }
    addListener()

}




updatePage()

window.addEventListener("popstate", (e) => {
    window.location.reload()
})