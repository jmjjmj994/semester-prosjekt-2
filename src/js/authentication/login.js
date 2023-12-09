import { userAuthEndpoints } from "../api/api.js";
const wrapper = document.querySelector("[data-type-section='login-wrapper']")
const form = document.querySelector("[data-form-type='log-in']");
const email = document.querySelector("[data-input-type='email']");
const password = document.querySelector("[data-input-type='password']");
const submitBtn = document.querySelector("[data-action='submit']");
const errorEl = document.querySelector("[data-form-type='error']")

const displayError = (fetchError) => {
    errorEl.innerHTML = `<p class="text-red-500">${fetchError}</p>`;
    email.style.cssText = "outline:1px solid red";
    password.style.cssText = "outline:1px solid red";

    setTimeout(() => {
        email.style.cssText = ""
        password.style.cssText = ""
        errorEl.textContent = ""
    }, 2000);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();


    if (emailValue && passwordValue) {
        login(emailValue, passwordValue)
        email.value = "";
        password.value = "";



    } else {
        const fetchError = await login();
        displayError(fetchError)
        return

    }

})


async function login(email, password) {
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
            wrapper.innerHTML = `<div class="loader"></div>`
            window.location.href = "/index.html"


        } else {

            const errorMessage = "Dette gikk ikke. Vennligst prøv igjen";
            throw new Error(`${errorMessage}`);
        }

    } catch (error) {
        errorEl.textContent = error.message
        return error.message


    }
}
