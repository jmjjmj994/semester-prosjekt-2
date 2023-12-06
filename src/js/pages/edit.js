import { singleListing } from "../api/api.js";
const queryString = document.location.search;
const param = new URLSearchParams(queryString)
const id = param.get("id")
console.log(id)












const fetchSingleEntry = async () => {
    const singleEntry = await singleListing(id);
    const singleEntryData = {
        title: singleEntry.title,
        description: singleEntry.description,
        tags: singleEntry.tags,
        media: singleEntry.media
    }
    return singleEntryData
}



const displayBeforeCol = async () => {
    const colData = await fetchSingleEntry();
    console.log(colData)
    const colBefore = document.querySelector("[data-type-edit='before-col']");
    const colBody = document.querySelector("[data-type-edit='before-col-body']")
    const colBodyImg = document.querySelector("[data-type-edit='before-col-body'] img")
    colBodyImg.src = colData.media
    const colFooter = document.querySelector("[data-type-edit='before-col-footer']")
    const colFooterTitle = document.querySelector("[data-type-edit='before-col-footer']  h3")
    colFooterTitle.textContent = colData.description
}
displayBeforeCol()

const displayAfterCol = async () => {
  
    const colData = await fetchSingleEntry();
    console.log(colData)
    const colAfter = document.querySelector("[data-type-edit='after-col']");
    const colBody = document.querySelector("[data-type-edit='after-col-body']")
    const colBodyImg = document.querySelector("[data-type-edit='after-col-body'] img")
    colBodyImg.src = colData.media
    console.log(colBodyImg)
    const colFooter = document.querySelector("[data-type-edit='after-col-footer']")
    const colFooterTitle = document.querySelector("[data-type-edit='after-col-footer']  h3")
    colFooterTitle.textContent = colData.description

}

displayAfterCol()


const editInput = async () => {
    //id 3b313a00-da01-4d56-b508-70791675a779
    const form = document.querySelector("[data-type-edit='form']")
    const inputTitle = document.querySelector("[data-type-edit='form-edit-title']")
    const inputTags = document.querySelector("[data-type-edit='form-edit-tags']")
    const inputMedia = document.querySelector("[data-type-edit='form-edit-media']")
    const inputDate = document.querySelector("[data-type-edit='form-edit-date']"); 
    const inputDescription = document.querySelector("[data-type-edit='form-edit-description']")
    const submitBtn = document.querySelector("[data-type-edit='submit-btn']");
console.log(form, inputTitle, inputTags, inputDescription, submitBtn, inputMedia, inputDate)

}



/* const updateEntr = await updateEntry("3b313a00-da01-4d56-b508-70791675a779");
console.log(updateEntr) */