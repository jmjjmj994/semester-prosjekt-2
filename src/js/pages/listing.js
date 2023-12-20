import { createListing } from "../api/api.js";
import { createCardElement, validImgUrl } from "../utils/utils.js";

const form = document.querySelector("[data-form-type='listing-form']");
const previewGallery = document.querySelector("[data-type-preview='gallery']")
const previewImage = document.querySelector("[data-type-preview='image']")
previewGallery.innerHTML = ""
const productInputTitle = document.querySelector("[data-input-type='product-title']")

const productImageInput = document.querySelector("[data-input-type='product-image']")
const productTextareaInput = document.querySelector("[data-input-type='product-textarea']")
const productDateInput = document.querySelector("[data-input-type='product-end']")
const today = new Date().toISOString().split("T")[0];
productDateInput.min = today;
productInputTitle.value = "";

productImageInput.value = "";
productTextareaInput.value = ""
productDateInput.value = "";
let galleryArr = []

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const validatedInput = validateInput(galleryArr);
    if (validatedInput) {
        await createListing(validatedInput.title, validatedInput.description,  validatedInput.image, validatedInput.end)
        
        previewGallery.innerHTML = "";
        previewImage.src = "";
        previewImage.alt = "";
        galleryArr = []
        clearImagePreview()
        createPreview()
        window.location.reload()
    } else {
        console.log("invalid")
    }
})


const validateInput = (galleryArr) => {
    const productInputTitle = document.querySelector("[data-input-type='product-title']")
    const productImageInput = document.querySelector("[data-input-type='product-image']")
    const productTextareaInput = document.querySelector("[data-input-type='product-textarea']")
    const productDateInput = document.querySelector("[data-input-type='product-end']")
    const inputTitleVal = productInputTitle.value.trim();
    const inputDateVal = productDateInput.value.trim();
    const inputTextareaVal = productTextareaInput.value.trim();
    if (inputTitleVal &&  galleryArr.length > 0 && inputTextareaVal) {
        const inputData = {
            title: inputTitleVal,
            description: inputTextareaVal,
            image: galleryArr,
            end: inputDateVal
        }
        productInputTitle.value = "";
     
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



const createPreview = () => {
    galleryArr = []
    const productInputTitle = document.querySelector("[data-input-type='product-title']")
  
    const productImageInput = document.querySelector("[data-input-type='product-image']")
    const productImageInput2 = document.querySelector("[data-input-type='product-image-2']")
    const productImageInput3 = document.querySelector("[data-input-type='product-image-3']")
    const productImageInput4 = document.querySelector("[data-input-type='product-image-4']")
    const inputArr = [productImageInput, productImageInput2, productImageInput3, productImageInput4]
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


    productTextareaInput.addEventListener("input", (e) => {
        previewBodyDescription.textContent = e.target.value
    })


    productDateInput.addEventListener("input", (e) => {
        previewBodyDate.textContent = e.target.value
    })



    inputArr.forEach((input, index) => {
        input.value = ""
        input.setAttribute("index", `${index}`)

        input.addEventListener("keydown", (e) => {
            if (e.key === "Delete" || e.key === "Backspace") {
                input.value = ""


                setTimeout(() => {
                    if (input.value.trim() === "") {
                        galleryArr[index] = "";
                        createGallery(galleryArr.filter(Boolean));
                    }
                }, 0);
            }
        });

        input.addEventListener("input", (e) => {
            const inputVal = e.target.value.trim();
            validImgUrl(inputVal, (isValid) => {
                if (isValid) {
                    galleryArr[index] = inputVal;
                } else {
                    input.value = "";
                    galleryArr[index] = "";
                    console.log(`Invalid image URL: ${inputVal}`);
                }
                createGallery(galleryArr.filter(Boolean));
            }, 0);
        });
    })


    previewBodyHeader.textContent = "";
    previewBodyCategories.textContent = "";
    previewBodyDescription.textContent = "";
    previewBodyDate.textContent = ""


}



function createGallery(arr) {
    previewGallery.innerHTML = "";


    if (arr.length > 0) {
        validImgUrl(arr[0], (isValid) => {
            if (isValid) {
                previewImage.src = arr[0];
                imagePreview(arr[0]);
            }
        });
    } else {
        previewImage.src = "src/assets/no-image.jpg"
        imagePreview("")
    }

    arr.forEach(url => {
        validImgUrl(url, (isValid) => {
            if (isValid) {

                const imgContainer = createCardElement("div", "w-[15%] h-[5rem] relative ");
                const img = createCardElement("img", "max-w-full w-full block absolute object-contain h-full");
                img.src = url;
                imgContainer.append(img);
                previewGallery.append(imgContainer);

            } else {
                displayError("invalid")
                console.log(`Invalid image URL: ${url}`);
            }
        });
    });
    validateInput(arr)

}


createPreview()



