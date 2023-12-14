


//https://api.noroff.dev/api/v1/auction/listings?_seller=true&_active=true&_tag=test&sort=createdAt&sortOrder=asc
const listings = async (limit) => {
    const url =
        `https://api.noroff.dev/api/v1/auction/listings?_seller=true&_bids=true&_count&_active=true&sort=createdAt&sortOrder=asc&limit=10`;
  


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

console.log("hei")

const test = await listings();
console.log(test)