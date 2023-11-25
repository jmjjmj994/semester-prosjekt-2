export const localStorageItems = {
    userData: JSON.parse(localStorage.getItem("user-data")),
    token: localStorage.getItem("user-token"),
    hasToken: localStorage.getItem("tokenChecked")

}



const norwegianDate = (date) => {
console.log(date)
}

norwegianDate("24.11.1994")