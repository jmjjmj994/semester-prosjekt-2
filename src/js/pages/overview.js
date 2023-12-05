import { localStorageItems, createCardElement, createButtonElement , dateConverter} from "../utils/utils.js";
import { options } from "../api/api.js";

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
    const tbody = createCardElement('tbody');
    const tbodyRow = createCardElement('tr');
    const tbodyData = createCardElement('td', "flex flex-col");
    const img = createCardElement('img', "rounded-sm shadow-md");
    img.src = media;
    img.alt = '';
    const createdText = createCardElement('span');
    createdText.textContent = `Opprettet : ${createdDate}`;
    const endsAtText = createCardElement('span');
    endsAtText.textContent = `Slutter:${endDate}`;
    const bidsText = createCardElement('span');
    bidsText.textContent = `Antall bud:${bids}`; 
    tbodyData.appendChild(img);
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
    tfootData.appendChild(deleteButton);
    tfootData.appendChild(updateButton);
    tfootRow.appendChild(tfootData);
    tfoot.appendChild(tfootRow);
   return tfoot
}


const createTable = (title, media, createdDate, endDate, bids) => {
console.log(title)
    const table = createCardElement("table", "flex flex-col");
    const tableHead = createTableHeader(title);
    const tableBody = createTableBody(media, createdDate, endDate, bids);
    const tableFoot = createTableFoot();
    table.append(tableHead, tableBody, tableFoot)
    return table;
}





const renderListingsTable = async (callback) => {
  
    const listingTableData = await listingsByProfile(localStorageItems.userData.name)
    
    const tableGridCol1 = document.querySelector("[data-type='table-grid-col-1]");
    const tableGridCol2 = document.querySelector("[data-type-table='table-grid-col-2']")
 tableGridCol2.innerHTML = "";


    if (typeof listingTableData !== "string") {
     listingTableData.forEach(data => {
         const { id, title, description, media, created, endsAt, _count } = data;
         const norwegianDateCreated = dateConverter(created)
         const norwegianDateEnd = dateConverter(endsAt)
         const table = createTable();
         console.log(table)
         

        



/* 
table.addEventListener("click", async (e) => {
   if(e.target.getAttribute("data-type-table") === "delete-btn") {
    const tableId = table.getAttribute("data-table-id")
     await  deleteListing(tableId)
       renderListingsTable()
   }
}) */


     })
    }

    mockData.forEach(data => {
        const { id, title, description, media, created, endsAt, _count } = data;
        const bids = _count.bids;
       
        const table = createTable(title, media, created, endsAt, bids );
        console.log(table)
        tableGridCol2.append(table)

    })


}







 const initializer = () => {
    renderListingsTable()
}
initializer()  


