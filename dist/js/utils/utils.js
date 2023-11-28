export { localStorageItems, createCardElement, createButtonElement, blockElements }
const localStorageItems = {
    userData: JSON.parse(localStorage.getItem("user-data")),
    token: localStorage.getItem("user-token"),
    hasToken: localStorage.getItem("tokenChecked"),
    media: localStorage.getItem("new-media")

}
const blockElements = {
    header: document.querySelector("header"),
    main: document.querySelector("main")
}


const norwegianDate = (date) => {
    console.log(date)
}




const createCardElement = (tagName, classNames) => {
    const element = document.createElement(tagName)
    element.className = classNames
    return element
}

const createButtonElement = (className) => {
    const button = document.createElement("button");
    button.className = className;
    return button;
}





export const createLoader = ((spinnerHeight, spinnerWidth, active) => {
    const loaderContainer = document.createElement("div");
    loaderContainer.className = "loaderAbsolute"
    const spinner = document.createElement("span");
    spinner.style.height = spinnerHeight;
    spinner.style.width = spinnerWidth
    spinner.className = "spinner";
    loaderContainer.append(spinner)
     if(active) {
        loaderContainer.classList.add("loaderAbsoluteIsActive")
     } else {
         loaderContainer.classList.remove("loaderAbsoluteIsActive")


     }
    return loaderContainer;
})
createLoader()