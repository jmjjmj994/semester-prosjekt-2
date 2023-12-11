import { listingsByTags } from "../api/api.js";
const searchForm = document.querySelector("[data-type-component='navbar-form']");
const searchFormInput = document.querySelector("[data-type-component='navbar-form-input']");
const searchFormButton = document.querySelector("[data-type-component='navbar-form-submit-btn']");
searchFormInput.value = "";



const fetchData = async () => {
    const inputValue = searchFormInput.value.trim().toLowerCase();
    const fetchListings = await listingsByTags(inputValue, 0)
    if (inputValue === "") {
        displayError("Søkefeltet kan ikke være tomt", "Søk...")
        return;
    } else if (fetchListings.length === 0) {
        searchFormInput.value = ""
        displayError("Søket ga ingen resultater", "Søk...")
        return;
    } else {
        return fetchListings
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
    const inputValue = searchFormInput.value.trim().toLowerCase();
    const data = await fetchData();
    if (data) {
        window.location.href = `/bidding.html?results=${inputValue}`
        searchFormInput.value = ""
    } else {
        searchFormInput.value = ""
        return
    }


})


