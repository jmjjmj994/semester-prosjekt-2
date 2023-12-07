export { localStorageItems, createCardElement, createButtonElement, blockElements,dateConverter}
const localStorageItems = {
    userData: JSON.parse(localStorage.getItem("user-data")),
    token: localStorage.getItem("user-token"),
    hasToken: localStorage.getItem("tokenChecked"),
    media: localStorage.getItem("new-media")}





const blockElements = {
    header: document.querySelector("header"),
    main: document.querySelector("main")
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


const dateConverter = (date) => {

    const options = {
        weekday:"long",
        year:"numeric", 
        month:"long",
        day:"numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",}

    const norwegianDate = new Date(date).toLocaleString("no-NO", options)

    return norwegianDate;
}


export const norwegianEndDate = (endDate) => {
    const endDateTime = new Date(endDate).getTime();
    const now = new Date().getTime();
    const timeDifference = endDateTime - now;

    if (timeDifference <= 0) {
        return 'Utløpt';
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d, ${hours}t, ${minutes}m`;
}

