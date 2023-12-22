import { listingsByTags } from "../api/api.js";
const searchForm = document.querySelector("[data-type-component='navbar-form']");
const searchFormInput = document.querySelector("[data-type-component='navbar-form-input']");
const searchFormButton = document.querySelector("[data-type-component='navbar-form-submit-btn']");
searchFormInput.value = "";



const fetchData = async () => {
    const inputValue = searchFormInput.value.trim().toLowerCase();
    const fetchListings = await listingsByTags(inputValue, 0)
    if (inputValue === "") {
        inputFeedback("Søkefeltet kan ikke være tomt", "Søk...", "#FF6D4D")
        return;
    } else if (fetchListings.length === 0) {
        searchFormInput.value = ""
        inputFeedback("Søket ga ingen resultater", "Søk...", "#FF6D4D")
        return;
    } else {
        return fetchListings
    }
}

const inputFeedback = (msg, placeholder, clr) => {
    searchFormInput.placeholder = msg
    searchFormInput.style.outline = `1px solid ${clr}`
    searchFormButton.style.outline = `1px solid ${clr}`
    searchFormInput.style.transition = `100ms all ease-in`
    searchFormButton.style.transition = `100ms all ease-in`
    setTimeout(() => {
        searchFormInput.placeholder = placeholder;
        searchFormButton.style.outline = ``
        searchFormInput.style.outline = ``
    }, 3000)
}


searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputValue = searchFormInput.value.trim().toLowerCase();
    const data = await fetchData();
    if (data) {
        inputFeedback("", "", "green")
        window.location.href = `/products.html?results=${inputValue}`
        searchFormInput.value = ""
    } else {
        searchFormInput.value = ""
        return
    }


})


