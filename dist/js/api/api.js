
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
    let url = `https://api.noroff.dev/api/v1/auction/listings?_seller?_bids&limit=${limit}`

    try {
        const res = await fetch(url, options)
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



const createListing = async (title, description, tags, imageUrl) => {
    let url = `https://api.noroff.dev/api/v1/auction/listings`


    const requestOptions = {
        method: "POST",
        headers: options.headers,
        body: JSON.stringify({
            title, title,
            description: description,
            tags: [tags],
            media: imageUrl,
            endsAt: "10.07.2024"
        })

    }


    try {
        const res = await fetch(url, requestOptions)
        const data = await res.json()
        console.log(data)
    }
    catch (error) {

    }



}

/* createListing("tester", "mye rart", "hei hva skjer") */

//Auction-listings related endpoints