export { localStorageItems, createCardElement, createButtonElement, blockElements, dateConverter }
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
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    }

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







const cardHeader = (image) => {
    const cardHeader = createCardElement("div", "h-[70%] relative") /**Header */
    const cardHeaderImage = createCardElement("img", "absolute object-cover w-full h-full ")
    image.length === 0 ? cardHeaderImage.src = "src/assets/no-image.jpg" : cardHeaderImage.src = image;
  
    cardHeaderImage.alt = "Image of product"
    cardHeader.append(cardHeaderImage)
    return cardHeader;
}

const cardBody = (title) => {
    const cardBody = createCardElement("div", "basis-[auto] flex   p-1 overflow-hidden")
    const cardBodyTitle = createCardElement("p", "card-title-typography")
    cardBodyTitle.textContent = title;
    cardBody.append(cardBodyTitle)
    return cardBody
}

const cardFooter = (bids, endsAt) => {
    const norwegianFormattedDate = norwegianEndDate(endsAt)
    const cardFooter = createCardElement("div", "flex basis-[auto]  justify-between items-end p-1 ")
    const cardFooterCol_1 = createCardElement("div", "");
    const cardFooterBids = createCardElement("p", "")
    cardFooterBids.textContent = `Høyeste bud: ${bids}`
    cardFooterCol_1.append(cardFooterBids)
    const cardFooterCol_2 = createCardElement("div", "flex gap-1 px-1 shadow-xl bg-custom-background")
    const cardFooterCol_2Icon = createCardElement("span", "")
    cardFooterCol_2Icon.innerHTML = `<i class="fa-regular fa-clock"></i>`
    const cardFooterDate = createCardElement("p", "")
    cardFooterDate.textContent = `${norwegianFormattedDate}`
    cardFooterCol_2.append(cardFooterCol_2Icon, cardFooterDate)
    cardFooter.append(cardFooterCol_1, cardFooterCol_2);
    return cardFooter

}









export const articleCard = (image, title, bids, endsAt,id) => {
    const article = createCardElement("article", "flex flex-col justify-between relative  bg-custom-card relative shadow-md text-custom-textGrey card-no-effect card-effect relative");
    const link = createCardElement("a", "inset-0 absolute  custom-z-low");
    link.href = `/specific.html?id=${id}`
    const articleHeader = cardHeader(image)
    const articleBody = cardBody(title)
    const articleFooter = cardFooter(bids, endsAt)
    article.append(link,articleHeader, articleBody, articleFooter)
    return article

}

export const skeletonCards = () => {
    const skeletonCard = `
        <div class="flex flex-col justify-between bg-custom-card  rounded-sm shadow-lg  card-no-effect card-effect relative">
            <div class="card-header h-[70%] relative  animate-pulse">
                <div class=" h-[full]  absolute inset-0  bg-gray-200 rounded-md"></div>
            </div>
            <div class="card-body p-4 ">
                <div class=" h-[2rem] bg-gray-200 rounded-md mb-2 w-full animate-pulse"></div>
            </div>
            <div class="basis-[auto] flex gap-4   p-1 overflow-hidden">
                <div class="skeleton-bids w-20 h-6 flex-1 bg-gray-200 animate-pulse rounded-md"></div>
                <div class="skeleton-ends-at w-24 h-6 flex-1 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
        </div>
    `;
    return skeletonCard;
}