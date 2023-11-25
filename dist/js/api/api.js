
//Objects
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


export const auctionProfileEndpoints = {

    allEntries: `https://api.noroff.dev/api/v1/auction/profiles`,
    singleEntry: (param, limit, sort) => {
        let url = `https://api.noroff.dev/api/v1/auction/profiles/${param}`
        if (limit !== undefined) {
            url += `&limit=${limit}`

        }

        if (sort !== undefined) {
            url += `&sort=${sort}`
        }

        if (sort !== undefined && limit !== undefined) {
            url += `&sort=${sort}&limit=${limit}`
        }
        return url

    },
    allListings: (param, limit, sort) => {
        let url = `https://api.noroff.dev/api/v1/auction/${param}/listings`
        if (limit !== undefined) {
            url += `&limit=${limit}`

        }

        if (sort !== undefined) {
            url += `&sort=${sort}`
        }

        if (sort !== undefined && limit !== undefined) {
            url += `&sort=${sort}&limit=${limit}`
        }
        return url

    },


    allBids: (param, limit, sort) => {
        let url = `https://api.noroff.dev/api/v1/auction/${param}/bids`
        if (limit !== undefined) {
            url += `&limit=${limit}`

        }

        if (sort !== undefined) {
            url += `&sort=${sort}`
        }

        if (sort !== undefined && limit !== undefined) {
            url += `&sort=${sort}&limit=${limit}`
        }
        return url
    },
    //GET ================ //

    //PUT ================ //
    updateMedia: (param, limit, sort) => {

    }
    //Requires https://url.com/image.jpg
    //PUT ================ //


};



//Objects



//Loader
export const showLoader = (value) => {
    const loader = document.querySelector("[data-loader]")
    value ? loader.style.cssText = "display:block" : loader.style.cssText = "display:none"

}
//Loader



//API methods




const GET = async (url) => {

    try {
        const res = await fetch (url, options)
        const data = await res.json()
        console.log(data)
    } catch (error) {

    }




};


GET("")