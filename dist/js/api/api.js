
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








// auction profiles
const GET = async (name, optParam, limit) => {
    let url = `https://api.noroff.dev/api/v1/auction/profiles/`
    /*
    listings, bids, credits, `?limit=${limit}`
    */
    if (name !== undefined) {
        url += `${name}`

        if (optParam !== undefined) {
            url += `/${optParam}`
        }
    } else if (name === undefined && optParam === undefined && limit !== undefined) (
        url += `/?limit=${limit}`
    )


    try {

        const res = await fetch(url, options)

        if (res.ok) {
            const data = await res.json()
            console.log(data)
        } else {
            throw new Error("Profile not found")
        }


    } catch (error) {
        console.log(error.message)
    }




};

/*  GET("taurin") */





//Auction listings






//Auction listings






const updateMedia = async (name, imageUrl) => {
    /*   updateMedia */
    let url = `https://api.noroff.dev/api/v1/auction/profiles/${name}/media`
    console.log(url)

    try {
        const requestOptions = {
            method: "PUT",
            headers: options.headers,
            body: JSON.stringify({
                avatar: imageUrl,
            })
        }

        const res = await fetch(url, requestOptions)

        if (res.ok) {
            const data = await res.json()
        } else {
            throw new Error("There seems to be a problem. Check the image url and try again")
        }

    } catch (error) {
        console.log(error.message)
    }




};

/* PUT("taurin", ) */


// auction profiles