import { dateConverter } from "../utils/utils.js"
export const userAuthEndpoints = {
    register: "https://api.noroff.dev/api/v1/auction/auth/register",
    login: "https://api.noroff.dev/api/v1/auction/auth/login",
}

export const options = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        'Content-Type': 'application/json'

    },
}





export const showLoader = (value) => {
    const loader = document.querySelector("[data-loader]")
    value ? loader.style.cssText = "display:block" : loader.style.cssText = "display:none"

}

const allProfiles = async (limit) => {
    let url = `https://api.noroff.dev/api/v1/auction/profiles?_listings=true`

    try {

        const res = await fetch(url, options)

        if (res.ok) {
            const data = await res.json();
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
    try {
        const res = await fetch(url, options)

        if (res.ok) {
            const data = await res.json();
        } else {
            throw new Error("Failed to fetch data")
        }
    } catch (error) {
        console.log(error.message)
    }


}


export const listingsByDate = async (order,limit) => {
    const url =
        `https://api.noroff.dev/api/v1/auction/listings?_seller=true&_bids=true&_count&sort=endsAt&sortOrder=${order}&_active=true&tags=true&limit=${limit}`;

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


export const listings = async (limit) => {
    const url =
        `https://api.noroff.dev/api/v1/auction/listings?_seller=true&_bids=true&_count&sort=title&sortOrder=desc&_active=true&tags=true&limit=${limit}`;

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

export const listingsByTags = async (tag, offset) => {
  
    const url = `https://api.noroff.dev/api/v1/auction/listings?_seller=true&_tag=${tag}&_bids=true&_active=true&_limit=25&_offset=${offset}`;

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


export const singleListing = async (id) => {
    const url =
        `https://api.noroff.dev/api/v1/auction/listings/${id}?_seller=true&_bids=true&_active=true&tags=true`;
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




export const createListing = async (title, description,  image, date) => {
    let url = `https://api.noroff.dev/api/v1/auction/listings?_bids`
    const requestOptions = {
        method: "POST",
        headers: options.headers,
        body: JSON.stringify({
            title, title,
            description: description,
            media: image,
            endsAt: date
        })

    }


    try {
        const res = await fetch(url, requestOptions)
        const data = await res.json()
        return data;

    }
    catch (error) {
    }
}


export const updateEntry = async (id, title, description, tags, image) => {
    const url = `https://api.noroff.dev/api/v1/auction/listings/${id}`;
    const requestOptions = {
        method: "PUT",
        headers: options.headers,
        body: JSON.stringify({
            "title": title,
            "description": description,
            "tags": tags,
            "media": [image]
        })
    };

    try {
        const response = await fetch(url, requestOptions);
        if (response.ok) {
            const updatedListing = await response.json();
           

        } else {
            const errorData = await response.json();
            console.error('Error updating listing:', errorData);
        }
    } catch (error) {
        console.error('Error updating listing:', error);
    }
};