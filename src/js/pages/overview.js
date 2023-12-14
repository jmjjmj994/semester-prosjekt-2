import { localStorageItems, createCardElement, createButtonElement, dateConverter, norwegianEndDate } from "../utils/utils.js";
import { options, singleListing, updateEntry } from "../api/api.js";

const listingsByProfile = async (name) => {
    const url =
        `https://api.noroff.dev/api/v1/auction/profiles/${name}/listings?_listings=true`;

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: options.headers
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("There seem to be an error fetching your data. Please refresh the page")
        }
    } catch (error) {
        return error.message;

    }
}

const deleteListing = async (id) => {
    const container = document.querySelector("[data-type-section='my-listings']")

    try {
        const url = `https://api.noroff.dev/api/v1/auction/listings/${id}`;
        const res = await fetch(url, {
            method: "DELETE",
            headers: options.headers
        });
        if (res.ok) {
            container.innerHTML = "";
            console.log(`Listing with ID ${id} deleted successfully.`);
            initializer()
        } else {
            throw new Error(`Failed to delete listing with ID ${id}`);
        }
    } catch (error) {
        console.error("Error deleting listing:", error);
        throw error;
    }
}

const listingsCardHeader = (img) => {
    const cardHeader = createCardElement("div", "relative h-[15rem] rounded-sm");
    const cardHeaderImg = createCardElement("img", "absolute  w-full h-full object-cover border-inherit");
    cardHeaderImg.src = img;
    cardHeader.alt = "listing";
    cardHeader.append(cardHeaderImg);
    return cardHeader
}

const listingsCardBody = (title, description, start, end) => {
    const cardBody = createCardElement("div", "flex p-2 flex-col text-custom-textDark ");
    const cardBodyTitle = createCardElement("h2")
    cardBodyTitle.textContent = title;
    const cardBodyDescription = createCardElement("p");
    cardBodyDescription.textContent = description
    const cardBodyStart = createCardElement("p");
    cardBodyStart.textContent = start
    const cardBodyEnd = createCardElement("p")
    cardBodyEnd.textContent = end;
    cardBody.append(cardBodyTitle, cardBodyDescription, cardBodyStart, cardBodyEnd);
    return cardBody


}
const listingsCardFooter = (id) => {

    const cardFooter = createCardElement("div", " p-2 flex  gap-2 ");
    const cardDeleteBtn = createButtonElement("bg-custom-btnBgAccent text-custom-textWhite py-1 px-4 relative rounded-sm shadow-sm");
    cardDeleteBtn.textContent = "Slett";
    const cardUpdateBtn = createButtonElement("")
    cardUpdateBtn.textContent = "Oppdater"
    cardFooter.append(cardDeleteBtn, cardUpdateBtn);

    cardDeleteBtn.addEventListener("click", async (e) => {
        deleteEntry(id)
    })
    return cardFooter
}

const card = (id, media, title, description, start, end) => {
    const card = createCardElement("div", "bg-custom-card flex flex-col rounded-sm shadow-sm card-effect card-no-effect ")
    card.setAttribute("data-type-card", `${id}`)
    const cardHeader = listingsCardHeader(media);
    const cardBody = listingsCardBody(title, description, start, end);
    const cardFooter = listingsCardFooter(id);
    card.append(cardHeader, cardBody, cardFooter)
    return card
}


const renderCards = async () => {
    const parentContainer = document.querySelector("[data-type-overview='parent-section']");
    const container = document.querySelector("[data-type-section='my-listings']")
    const containerHeader = document.querySelector("[data-type-overview='header']")
    const containerHeaderH1 = document.querySelector("[data-type-overview='header-h1']")
    const myListings = await listingsByProfile(localStorageItems.userData.name);


    if (myListings.length > 0) {
        myListings.forEach(listing => {
            const { id, media, title, description, created, endsAt } = listing
            const norwegianEnd = norwegianEndDate(endsAt)
            const listingCard = card(id, media, title, description, norwegianEnd);
            container.append(listingCard)
        })
        container.className = "w-full h-auto listings-card"
        parentContainer.className = "flex-1 height-calc global-margin-block global-padding"
        containerHeader.className = "text-center"
        containerHeaderH1.textContent = "Min oversikt"

    } else {
        container.className = "hidden ";
        parentContainer.className = "flex-1 items-center "
        containerHeader.className = "h-full w-full flex items-center height-calc justify-center text-center"
        containerHeaderH1.innerHTML = `
        
        <span class=>
Her var det tomt! Trykk <a class="text-purple-600 underline" href="/listing.html">her</a> for å opprette en annonse
        <span>
        
        
        
        `
    }


}


const deleteEntry = async (id) => {
    const deleteCall = await deleteListing(id);

}


const initializer = () => {

    renderCards()

}
initializer()

/*********************************************** */













