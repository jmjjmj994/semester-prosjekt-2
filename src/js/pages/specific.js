import { singleListing } from "../api/api.js";
const queryString = document.location.search;
const param = new URLSearchParams(queryString)
const id = param.get("id")
console.log(id)


const res = await singleListing(id)