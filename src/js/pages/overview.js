import { localStorageItems, createCardElement, createButtonElement , dateConverter} from "../utils/utils.js";
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

    try {
        const url = `https://api.noroff.dev/api/v1/auction/listings/${id}`;
        const res = await fetch(url, {
            method: "DELETE",
            headers: options.headers
        });
        if (res.ok) {
            console.log(`Listing with ID ${id} deleted successfully.`);
        } else {
            throw new Error(`Failed to delete listing with ID ${id}`);
        }
    } catch (error) {
        console.error("Error deleting listing:", error);
        throw error;
    }
}


const mockData = [

    {
id:"123123123213",
title:"Sykkel",
media:"bilde",
created:"2023-123-122",
endsAt:"213123123",
_count: {bids:"0"}
    }
]



const createTableHeader = (title) => {
    const thead = createCardElement("thead");
    const theadRow = createCardElement("tr");
    const th = createCardElement('th');
    th.textContent = title
    theadRow.appendChild(th);
    thead.appendChild(theadRow)
    return thead
}
const createTableBody = (media, createdDate, endDate, bids) => {
    const norwegianDateCreated = dateConverter(createdDate)
    const norwegianDateEnd = dateConverter(endDate)
    const tbody = createCardElement('tbody'," table");
    const tbodyRow = createCardElement('tr');
    const tbodyData = createCardElement('td', "flex flex-col");
    const imageContainer = createCardElement("div", "h-[18rem]  relative");
    const img = createCardElement('img', " rounded-sm shadow-md absolute object-cover h-full w-full");
    img.src = media;
    img.alt = '';
    imageContainer.append(img)
    const createdText = createCardElement('span');
    createdText.textContent = `Opprettet : ${norwegianDateCreated}`;
    const endsAtText = createCardElement('span');
    endsAtText.textContent = `Slutter:${norwegianDateEnd}`;
    const bidsText = createCardElement('span');
    bidsText.textContent = `Antall bud:${bids}`; 
    
    tbodyData.appendChild(imageContainer);
    tbodyData.appendChild(createdText);
    tbodyData.appendChild(endsAtText);
    tbodyData.appendChild(bidsText);
    tbodyRow.appendChild(tbodyData);
    tbody.appendChild(tbodyRow);  
    return tbody
}

const createTableFoot = () => {
    const tfoot = createCardElement('tfoot');
    const tfootRow = createCardElement('tr');
    const tfootData = createCardElement('td');
    const deleteButton = createCardElement('button', "bg-red-500 p-1 px-5 rounded-sm mr-5");
    deleteButton.setAttribute("data-type-table", "delete-btn")
    deleteButton.textContent = 'Slett';

    const updateButton = createCardElement('button', "bg-custom-special p-1 px-5");
    updateButton.textContent = 'Oppdater';
    updateButton.setAttribute("data-type-table", "update-btn")
    tfootData.appendChild(deleteButton);
    tfootData.appendChild(updateButton);
    tfootRow.appendChild(tfootData);
    tfoot.appendChild(tfootRow);
   return tfoot
}



const createTable = async (tableId,title, media, createdDate, endDate, bids) => {
    const table = createCardElement("table", "flex flex-col ");
    table.setAttribute("data-type-table-id", `${tableId}`)
    const tableHead = createTableHeader(title);
    const tableBody = createTableBody(media, createdDate, endDate, bids);
    const tableFoot = createTableFoot();
    table.addEventListener("click", async (e) => {
    const deleteBtn = e.target.getAttribute("data-type-table") === "delete-btn";
        if (deleteBtn) {
            await deleteListing(tableId);
            renderListingsTable(); 
        }

    })

    table.append(tableHead, tableBody, tableFoot)
    return table;
}





const renderListingsTable = async () => {
  
    const listingTableData = await listingsByProfile(localStorageItems.userData.name)
    const tableGridCol2 = document.querySelector("[data-type-table='table-grid-col-2']")
    const tableGridHeader = createCardElement("h2", "text-typography-primary text-center")
    tableGridHeader.textContent ="Mine salg"
     tableGridCol2.innerHTML = "";
 if(Array.isArray(listingTableData)) {
    const promises = listingTableData.map(async (data) => {
        const { id, title, media, created, endsAt, _count } = data;
        const bids = _count.bids;
        const table = await createTable(id, title, media, created, endsAt, bids);
        tableGridCol2.append(tableGridHeader,table)
    })
    await Promise.all(promises)
 } else {
     tableGridCol2.className = "flex flex-col items-center justify-center bg-custom-secondary "
     tableGridCol2.innerHTML = `<span>${listingTableData}</span>`
 }

}




 const initializer =  () => {
    renderListingsTable()
}
initializer()  

/*********************************************** */














const fetchSingleEntry =  async ( ) => {
   
    const singleEntry = await singleListing("3b313a00-da01-4d56-b508-70791675a779");
  
    const singleEntryData = {
        title:singleEntry.title,
        description:singleEntry.description,
        tags:singleEntry.tags,
        media:singleEntry.media
    }
return singleEntryData
}



/* const displayColBefore = async () => {
  const singleEntryData = await fetchSingleEntry();
    const formContainerCol1 = document.querySelector("[data-type-overview='form-container-col-1']")
    const colTitle = document.querySelector("[data-type-overview='col-1-title']")
    colTitle.textContent = "Før:" 
    const colHeader = document.querySelector("[data-type-overview='form-container-col-1-header']")
colHeader.textContent = singleEntryData.title
    const colBody = document.querySelector("[data-type-overview='form-container-col-1-body']")
    const colImage = document.querySelector("[data-type-overview='form-container-col-1-body--img']")
    colImage.src = singleEntryData.media
   
} */






const openModal = async () => {
    //id 3b313a00-da01-4d56-b508-70791675a779
    const modal = document.querySelector("[data-type-overview='modal']")
    const form = document.querySelector("[data-type-overview='form']")
    const inputTitle = document.querySelector("[data-type-overview='form-title-input']")
    const inputDescription = document.querySelector("[data-type-overview='form-description-input']")
    const inputTags = document.querySelector("[data-type-overview='form-tags-input']")
    const inputMedia = document.querySelector("[data-type-overview='form-media-input']")
    const submitBtn = document.querySelector("[data-type-overview='form-submit-btn']")


/* fetchSingleEntry() */
 /*    displayColBefore() */
}
openModal()


/* const updateEntr = await updateEntry("3b313a00-da01-4d56-b508-70791675a779");
console.log(updateEntr) */