import { userAuthEndpoints } from "../api/api.js";

const form = document.querySelector("[data-form-type='log-in']");
const email = document.querySelector("[data-input-type='email']");
const password = document.querySelector("[data-input-type='password']");
const submitBtn = document.querySelector("[data-action='submit']");
const errorEl = document.querySelector("[data-form-type='error']")







form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if(emailValue && passwordValue) {
        login(emailValue, passwordValue)
        email.value = "";
        password.value = "";
  
    } else {
        console.log("Please enter a valid email")
        return
      
    }
  
})


async function login(email, password) {
    console.log(email, password)
    try {
        const res = await fetch(`${userAuthEndpoints.login}`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }), headers: { "content-type": "application/json" },
        })


        if (res.ok) {
            const data = await res.json()
            localStorage.setItem("user-token", data.accessToken)
            localStorage.setItem("user-data", JSON.stringify(data))
            window.location.href = "/index.html"
        
          
        } else {

            const errorMessage = "Invalid username or password"; // Adjust this based on the error structure from the API

            console.log(errorMessage);
            throw new Error(`${errorMessage}`);
        }

    } catch (error) {
        errorEl.textContent = error.message
        console.log(error.message)

    }
}
