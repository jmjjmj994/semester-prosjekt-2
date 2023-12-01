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




function filter (value) {

    const filteredData = dataArray.filter(data => {
        return data.title.toLowerCase().includes(value.toLowerCase())

    })
    console.log(filteredData)
   
  
}




 testSearch.addEventListener("input", (e) => {
    const testValue = testSearch.value;
    console.log(testValue)
    filter(testValue)
}) 