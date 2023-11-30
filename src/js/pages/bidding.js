import { createCardElement } from "../utils/utils.js";


const listings = async (limit, offset) => {
    const url =
        `https://api.noroff.dev/api/v1/auction/listings?_seller=true&_bids=true&_active=true&limit=${limit}&offset=${offset}`;

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

//1fd16e0d #ef788
const fetchButton = document.querySelector("[data-type-section='pagination']");








const setContent = (num) => {
    const container = document.querySelector("[data-type-section='listings']")
    location.hash = `?page=${num}`
    const currentPage = location.hash.split("#")[1];
    const currentNum = parseInt(currentPage.split("=")[1]);


    if (currentNum === 1) {
        console.log(currentNum, "current page")
        container.innerHTML = "Side1"

    } else if (currentNum === 2) {
        console.log(currentNum, "next page")
        container.innerHTML = "Side2"
    }

}

setContent(1)

