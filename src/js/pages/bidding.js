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


const container = document.querySelector("[data-type-section='listings']")


let num = 1;
let itemsPerPage = 10;
let offset = localStorage.getItem('offset') ? parseInt(localStorage.getItem('offset')) : 0;

const nextPage = document.querySelector("[data-type-pagination='next-page']");
const prevPage = document.querySelector("[data-type-pagination='prev-page']");

nextPage.addEventListener("click", (e) => {
    if (num < 5) {
        num++;
        paginationNumbers(num);
        offset += itemsPerPage;
        localStorage.setItem('offset', offset);
        hashNumber(num);
        container.innerHTML = ""
        fetchData(itemsPerPage, offset);
    }
});

prevPage.addEventListener("click", (e) => {
    if (num > 1) {
        num--;
        paginationNumbers(num);
        offset -= itemsPerPage;
        localStorage.setItem('offset', offset);
        hashNumber(num);
        container.innerHTML = "";
        fetchData(itemsPerPage, offset);
    }
});

const hashNumber = (num) => {
    location.hash = `?page=${num}`;
};

const paginationNumbers = (number) => {
    const numberBar = document.querySelectorAll("[data-type-pagination='numbers'] > span");
    numberBar.forEach((span) => {
        span.classList.remove("highlight");
        if (parseInt(span.textContent) === number) {
            span.classList.add("highlight");
        }
    });
};

const fetchData = async (offset, limit) => {

    const myData = await listings(offset, limit);

    
    const data = myData.map(item => {
if(item) {
    return item.title
} else {
    return "loading..."
}
      
    })
console.log(data)

    container.innerHTML += data

};


const initializePagination = () => {
    const currentPage = location.hash.split("=")[1];
    const currentNum = parseInt(currentPage);
    if (!isNaN(currentNum) && currentNum >= 1 && currentNum <= 5) {
        num = currentNum;
        paginationNumbers(num);
    }
};

window.addEventListener("DOMContentLoaded", () => {
    initializePagination();
    fetchData(offset, itemsPerPage);
});
