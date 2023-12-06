import { listingsByTags } from "../api/api.js";
const searchForm = document.querySelector("[data-search='search-form']");
const searchFormInput = document.querySelector("[data-search='search-form-input']");
const searchFormButton = document.querySelector("[data-search='search-form-button']");
searchFormInput.value = "";


const redirectUser = async (value) => {

    if (fetchListings === 0) {
        console.log("emptry array")
        searchFormInput.placeholder = "such empty"
    } else {
        console.log("data", fetchListings)
    }
}

const fetchData = async () => {
    const inputValue = searchFormInput.value.trim();
    const fetchListings = await listingsByTags(inputValue, 0)

    if (inputValue === "") {
        displayError("Søkefeltet kan ikke være tomt", "Søk...")
        return;
    } else if (fetchListings.length === 0) {
        searchFormInput.value = ""
        displayError("Søket ga ingen resultater", "Søk...")
        return;
    } else {
        return fetchListings;
    }
}

const displayError = (error, placeholder) => {
    searchFormInput.placeholder = error


    setTimeout(() => {
        searchFormInput.placeholder = placeholder;
    }, 4000)

}


searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await fetchData();

    if (data) {
        console.log(data)
    } else {
        console.log("no")
    }


})

