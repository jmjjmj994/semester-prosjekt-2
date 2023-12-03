import { dateConverter } from "../utils/utils.js"
export const userAuthEndpoints = {
    register: "https://api.noroff.dev/api/v1/auction/auth/register",
    login: "https://api.noroff.dev/api/v1/auction/auth/login",
}

const options = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        'Content-Type': 'application/json'

    },
}





export const showLoader = (value) => {
    const loader = document.querySelector("[data-loader]")
    value ? loader.style.cssText = "display:block" : loader.style.cssText = "display:none"

}



//Auction-profiles related endpoints

const allProfiles = async (limit) => {
    let url = `https://api.noroff.dev/api/v1/auction/profiles?_listings=true`

    try {

        const res = await fetch(url, options)

        if (res.ok) {
            const data = await res.json();
            console.log(data)
            return data;

        } else {
            throw new Error("There seem to be a problem fetching the data")
        }
    } catch (error) {
        console.log(error.message)
    }
}



export const singleProfile = async (name) => {
    let url = `https://api.noroff.dev/api/v1/auction/profiles/${name}?_listings=true`

    try {
        const res = await fetch(url, options)
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Profile not found")
        }

    } catch (error) {
        console.log(error.message)
    }

}






export const updateMedia = async (name, imageUrl) => {
    let url = `https://api.noroff.dev/api/v1/auction/profiles/${name}/media`;

    try {
        const res = await fetch(url, {
            method: "PUT",
            body: JSON.stringify({ avatar: imageUrl }),
            headers: options.headers
        });

        if (res.ok) {
            const data = await res.json();
            const media = data.avatar
            localStorage.setItem("new-media", media)
        } else {
            throw new Error("Failed to update media");
        }
    } catch (error) {
        console.log(error.message);
    }
};



const auctionProfiles = async (name, param) => {
    let url = `https://api.noroff.dev/api/v1/auction/profiles/${name}/${param}`;
    //listings, bids, credits
    try {
        const res = await fetch(url, options)

        if (res.ok) {
            const data = await res.json();
            console.log(data)
        } else {
            throw new Error("Failed to fetch data")
        }
    } catch (error) {
        console.log(error.message)
    }


}





//Auction-profiles related endpoints




//Auction-listings related endpoints

export const listings = async (limit) => {
    const url =
        `https://api.noroff.dev/api/v1/auction/listings?_seller=true&_bids=true&_active=true&limit=${limit}` ;

    try {

        const res = await fetch(url, {
            method:"GET",
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        if(res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Failed to fetch data")
        }
  /*       const res = await fetch(url, options)
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Failed to fetch data")
        } */

    } catch (error) {
        console.log(error.message)
    }
}



export const singleListing = async (id) => {
    const url =
        `https://api.noroff.dev/api/v1/auction/listings/${id}?_seller=true&_bids=true&_active=true`;

    try {

        const res = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Failed to fetch data")
        }
     

    } catch (error) {
        console.log(error.message)
    }
} 




export const createListing = async (title, description, tags, image, date) => {
    let url = `https://api.noroff.dev/api/v1/auction/listings?_bids`
/* const norwegianDate = dateConverter(date); */

    const requestOptions = {
        method: "POST",
        headers: options.headers,
        body: JSON.stringify({
            title, title,
            description: description,
            tags: [tags],
            media: [image],
            endsAt: date
        })

    }


    try {
        const res = await fetch(url, requestOptions)
        const data = await res.json()
        console.log(data)
        return data;
       
    }
    catch (error) {

    }



}


