import { createCardElement, dateConverter } from "../utils/utils.js";


const listings = async (limit, offset) => {
    const url =
        `https://api.noroff.dev/api/v1/auction/listings?_seller=true&_active=true&limit=${limit}&offset=${offset}`;

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



const updateUrl = (pageNum) => {
    const offset = (pageNum) * 10;
    const params = new URLSearchParams(window.location.search); //search url
    params.set("offset", offset); //set offset=num as url 
    const url = `${window.location.pathname}?${params.toString()} ` //create url params and convert it to string
    history.pushState(null, "", url) //push state to browser history
    return offset;
 }

const pageNum = updateUrl(1);



const buttonPrev = document.querySelector("[data-type-section='listings-prev-btn']")
const buttonNext = document.querySelector("[data-type-section='listings-next-btn']")

buttonPrev.addEventListener("click", (e) => {

})

buttonNext.addEventListener("click", (e) => {
 
})

const listingsTest = await listings(10, pageNum);
console.log(listingsTest)


const test = () => {
    const params = new URLSearchParams(window.location.search);
    let curr = params.get("offset")
    console.log(curr)
}


window.addEventListener("load", (e) => {

    test()

})

window.addEventListener("popstate", () => { //remember 
    console.log("hei")
})