import { createListing } from "../api/api.js";



const form = document.querySelector("[data-form-type='listing-form']")

const productPreviewContainer = document.querySelector("[data-container-='preview']")
const productPreviewContainerDiv = document.querySelector("[data-container-='image-container']");



form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const validatedInput = validateInput();
    console.log(validatedInput.end)
 /*    const date = validateInput.endsAt
    console.log(date) */
   /*  const date = new Date(validateInput.inputDateVal) */
   
    // title: "wqeqwe", description: "qwewqe", category: "qweqwe", image: "wqeweq", date: "10.07.2024" 
    if (validatedInput) {
        await createListing(validatedInput.title, validatedInput.description, validatedInput.tags, validatedInput.image, validatedInput.inputDateVal)
        console.log("valid")
    } else {
        console.log("invalid")
    }
})

const productInputTitle = document.querySelector("[data-input-type='product-title']")
const productTagsInput = document.querySelector("[data-input-type='product-tags']")
const productImageInput = document.querySelector("[data-input-type='product-image']")
const productTextareaInput = document.querySelector("[data-input-type='product-textarea']")
const productDateInput = document.querySelector("[data-input-type='product-end']")
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
        productTextareaInput.value =""
        productDateInput.value = "";
        return inputData
    } else {
        return false;
    }

}


const imagePreview = (image) => {
    const img = document.querySelector("[data-container-='image-container-img']")
    img.src = image
    img.alt = image



}



productImageInput.addEventListener("input", (e) => {
    const inputImageVal = productImageInput.value.trim();
    imagePreview(inputImageVal);

})

productImageInput.addEventListener("keydown", (e) => {
    const inputImageVal = productImageInput.value.trim();
    if (e.key === "Delete" || e.key === "Backspace") {
        productImageInput.value = "";
        
        imagePreview(productImageInput.value)


    }
})


/* 

Object { id: "65779178-46a4-4f5e-84b6-43766010f061", title: "hei", description: null, media: [], tags: [], created: "2023-11-28T11:03:02.270Z", updated: "2023-11-28T11:03:02.270Z", endsAt: "2024-10-07T00:00:00.000Z", _count: {…} }
​
_count: Object { bids: 0 }
​
created: "2023-11-28T11:03:02.270Z"
​
description: null
​
endsAt: "2024-10-07T00:00:00.000Z"
​
id: "65779178-46a4-4f5e-84b6-43766010f061"
​
media: Array []
​
tags: Array []
​
title: "hei"
​
updated: "2023-11-28T11:03:02.270Z"
 */



