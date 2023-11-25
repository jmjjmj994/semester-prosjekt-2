export const localStorageItems = {
userData: JSON.parse(localStorage.getItem("user-data")),
token : localStorage.getItem("user-token"),
hasToken : localStorage.getItem("tokenChecked")

}