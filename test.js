
const testSearch = document.querySelector(".test-search");



const dataArray = [
    {
        "title": "Båt"
    },
    {
        "title": "Bil"
    },
    {
        "title": "Sko"
    },
    {
        "title": "Klær"
    },
    {
        "title": "Data"
    },
    {
        "title": "Telefon"
    },
    // Add more objects with the "title" field here if needed
];


/* const lowerCaseTitle = title.toLowerCase();
const lowerCaseValue = value.toLowerCase();
return lowerCaseTitle.startsWith(lowerCaseValue); */

function filterByStart (value) {
    const filteredData = dataArray.filter(data => {
     /*    const lowerCaseTitle = data.title.toLowerCase();
        const lowerCaseValue = value.toLowerCase();
        return lowerCaseTitle.startsWith(lowerCaseValue) */
        return data.title.toLowerCase().startsWith(value.toLowerCase())
    })
    console.log(filteredData)
}

/* function filter (value) {

    const filteredData = dataArray.filter(data => {
        return data.title.toLowerCase().includes(value.toLowerCase())

    })
    console.log(filteredData)
   
  
}
 */



 testSearch.addEventListener("input", (e) => {
    const testValue = testSearch.value;
    console.log(testValue)
    filterByStart(testValue)
})  

