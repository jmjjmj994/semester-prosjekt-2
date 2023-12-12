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
    const thead = createCardElement("thead", "bg-custom-card");
    const theadRow = createCardElement("tr", "");
    const th = createCardElement('th', "");
    th.textContent = title
    theadRow.appendChild(th);
    thead.appendChild(theadRow)
    return thead
}
const createTableBody = (media, createdDate, endDate, bids) => {
    const norwegianDateCreated = dateConverter(createdDate)
    const norwegianDateEnd = dateConverter(endDate)
    const tbody = createCardElement('tbody'," table bg-custom-card");
    const tbodyRow = createCardElement('tr', "");
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

const createTableFoot = (id) => {
    const tfoot = createCardElement('tfoot', "bg-custom-card");
    const tfootRow = createCardElement('tr', "");
    const tfootData = createCardElement('td');
    const deleteButton = createButtonElement("bg-red-500  px-5 rounded-sm mr-5");
    console.log(deleteButton)
    deleteButton.setAttribute("data-type-table", "delete-btn")
    deleteButton.textContent = 'Slett';
    const updateButton = createCardElement("a","bg-custom-special  py-1 px-5 rounded-sm  ");
    updateButton.role ="button"
    updateButton.textContent = 'Oppdater';
    updateButton.href = `/edit.html?id=${id}`
    updateButton.setAttribute("data-type-table", "update-btn")
    tfootData.appendChild(deleteButton);
    tfootData.appendChild(updateButton);
    tfootRow.appendChild(tfootData);
    tfoot.appendChild(tfootRow);
   return tfoot
}








const renderListingsTable = async () => {
    const listingTableData = await listingsByProfile(localStorageItems.userData.name)
    const tableGridCol2 = document.querySelector("[data-type-table='table-grid-col-2']")
    const tableGridHeader = createCardElement("h2", "text-typography-primary text-center absolute p-2 top-[20px] absolute-centered")
    tableGridHeader.textContent ="Mine salg"
     tableGridCol2.innerHTML = "";
 
     if(Array.isArray(listingTableData) && listingTableData.length > 0 ) {
    const promises = listingTableData.map(async (data) => {
        console.log(data)
        const { id, title, media, created, endsAt, _count } = data;
        const bids = _count.bids;
        const table = await createTable(id, title, media, created, endsAt, bids);
        tableGridCol2.append(tableGridHeader,table)
        tableGridCol2.className ="bg-custom-secondary shadow-md rounded-md table-grid-tables bg-red-500 overflow-scroll gap-[3rem] py-10 relative"
    })
    await Promise.all(promises)
 } else {
     tableGridCol2.className = "flex flex-col items-center justify-center bg-custom-secondary "
     tableGridCol2.innerHTML = `<h2> Du har ingen varer for salg. Trykk <a href=/listing.html> her  </a> for å selge ett produkt </h2>`
 }

}




 const initializer =  () => {
    renderListingsTable()
}
initializer()  

/*********************************************** */













