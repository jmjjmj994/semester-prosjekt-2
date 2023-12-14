import { createListing } from "../api/api.js";



const form = document.querySelector("[data-form-type='listing-form']");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const validatedInput = validateInput();
    if (validatedInput) {
        await createListing(validatedInput.title, validatedInput.description, validatedInput.tags, validatedInput.image, validatedInput.end)
        console.log("valid")
        clearImagePreview()
        createPreview()
    } else {
        console.log("invalid")
    }
})

const productInputTitle = document.querySelector("[data-input-type='product-title']")
const productTagsInput = document.querySelector("[data-input-type='product-tags']")
const productImageInput = document.querySelector("[data-input-type='product-image']")
const productTextareaInput = document.querySelector("[data-input-type='product-textarea']")
const productDateInput = document.querySelector("[data-input-type='product-end']")
const today = new Date().toISOString().split("T")[0];
productDateInput.min = today;
productInputTitle.value = "";
productTagsInput.value = "";
productImageInput.value = "";
productTextareaInput.value = ""
productDateInput.value = "";

const validateInput = () => {

    const productInputTitle = document.querySelector("[data-input-type='product-title']")
    const productTagsInput = document.querySelector("[data-input-type='product-tags']")
    const productImageInput = document.querySelector("[data-input-type='product-image']")
    const productTextareaInput = document.querySelector("[data-input-type='product-textarea']")
    const productDateInput = document.querySelector("[data-input-type='product-end']")
    const inputTitleVal = productInputTitle.value.trim();
    const inputTagsVal = productTagsInput.value.trim();
    const inputImageVal = productImageInput.value.trim();
    const inputDateVal = productDateInput.value.trim();
    const inputTextareaVal = productTextareaInput.value.trim();
    if (inputTitleVal && inputTagsVal && inputImageVal && inputTextareaVal) {
        const inputData = {
            title: inputTitleVal,
            description: inputTextareaVal,
            tags: inputTagsVal,
            image: inputImageVal,
            end: inputDateVal
        }
        productInputTitle.value = "";
        productTagsInput.value = "";
        productImageInput.value = "";
        productTextareaInput.value = ""
        productDateInput.value = "";
        return inputData
    } else {
        return false;
    }

}

validateInput()
const imagePreview = (image) => {
    const img = document.querySelector("[data-container-='image-container-img']")
    img.src = image
    img.alt = image

}

const clearImagePreview = () => {
    const img = document.querySelector("[data-container-='image-container-img']")
    img.src = ""
    img.alt = ""
}

productImageInput.addEventListener("input", (e) => {
    const inputImageVal = productImageInput.value.trim();
    const previewImage = document.querySelector("[data-type-preview='image']")
    previewImage.src = inputImageVal
    imagePreview(inputImageVal);

})

productImageInput.addEventListener("keydown", (e) => {
    const inputImageVal = productImageInput.value.trim();
    if (e.key === "Delete" || e.key === "Backspace") {
        productImageInput.value = "";

        imagePreview(productImageInput.value)


    }
})


const createPreview = () => {
    const parentContainer = document.querySelector("[data-type-preview='parent-container']")
    const productInputTitle = document.querySelector("[data-input-type='product-title']")
    const productTagsInput = document.querySelector("[data-input-type='product-tags']")
    const productImageInput = document.querySelector("[data-input-type='product-image']")
    const productTextareaInput = document.querySelector("[data-input-type='product-textarea']")
    const productDateInput = document.querySelector("[data-input-type='product-end']")
    const previewImage = document.querySelector("[data-type-preview='image']")
    previewImage.src = "src/assets/no-image.jpg"
    const previewBodyHeader = document.querySelector("[data-type-preview='body-header']")
    const previewBodyCategories = document.querySelector("[data-type-preview='body-categories']")
    const previewBodyDescription = document.querySelector("[data-type-preview='body-description']")
    const previewBodyDate = document.querySelector("[data-type-preview='body-date']")

    productInputTitle.addEventListener("input", (e) => {
        previewBodyHeader.textContent = e.target.value


    })

    productTagsInput.addEventListener("input", (e) => {
        previewBodyCategories.textContent = e.target.value
    })
    productTextareaInput.addEventListener("input", (e) => {
        previewBodyDescription.textContent = e.target.value
    })


    productDateInput.addEventListener("input", (e) => {
        previewBodyDate.textContent = e.target.value
    })

    previewBodyHeader.textContent = "";
    previewBodyCategories.textContent = "";
    previewBodyDescription.textContent = "";
    previewBodyDate.textContent = ""


}



createPreview()





