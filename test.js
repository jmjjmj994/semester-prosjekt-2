

//https://api.noroff.dev/api/v1/auction/listings?_seller=true&_active=true&_tag=test&sort=createdAt&sortOrder=asc
/* const listings = async (order, offset) => {
    const url =
        `https://api.noroff.dev/api/v1/auction/listings?_seller=true&_bids=true&_count&_active=true&sort=endsAt&sortOrder=${order}&limit=100&offset=${offset}`;
  


    try {

        const res = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            const data = await res.json();
            console.log(data)
            return data;
        } else {
            throw new Error("Failed to fetch data")
        }


    } catch (error) {
        console.log(error.message)
    }
}


const test = await listings("desc", 0);
 */