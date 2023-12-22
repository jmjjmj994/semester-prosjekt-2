import { userAuthEndpoints } from "../api/api.js";

const wrapper = document.querySelector("[data-type-section='register-wrapper']");
const form = document.querySelector("[data-form-type='sign-up']");
const btnSubmit = document.querySelector("[data-action='submit']")
const nameInput = document.querySelector("[data-input-type='name']")
const emailInput = document.querySelector("[data-input-type='email']")
const passwordInput = document.querySelector("[data-input-type='password']")
const nameIcon = document.querySelector(".input-icon-name");
const passwordIcon = document.querySelector(".input-icon-password");
const emailIcon = document.querySelector(".input-icon-email");
const nameMsg = document.querySelector(".input-name-msg");
const passwordMsg = document.querySelector(".input-password-msg");
const emailMsg = document.querySelector(".input-email-msg");
const existingUser = document.querySelector("[data-type='existing-user-err']")

const displayError = (msg) => {
    existingUser.textContent = msg
    existingUser.style.outline = "1px solid red"
    existingUser.style.borderRadius = "0.5px"
    setTimeout(() => {
        existingUser.textContent = ""
        existingUser.style.outline = ""
        existingUser.style.borderRadius = ""
    }, 4000);
}
const displaySuccess = () => {
    btnSubmit.style.backgroundColor = "green"
    setTimeout(() => {
        btnSubmit.style.backgroundColor = ""
    }, 4000);
}



const inputValid = () => {
    const nameInput = document.querySelector("[data-input-type='name']").value.trim();
    const emailInput = document.querySelector("[data-input-type='email']").value.trim();
    const passwordInput = document.querySelector("[data-input-type='password']").value.trim();
    const nameRegex = /^[A-Za-z0-9_øæåzØÆÅZ]+$/
    const emailRegex = /^\w+@(?:stud\.)?noroff\.no$/
    const nameValid = nameRegex.test(nameInput);
    const emailValid = emailRegex.test(emailInput)
    const passwordValid = passwordInput.length >= 8;

    return {
        nameValid, emailValid, passwordValid
    }


}


const feedback = () => {
    const { nameValid, emailValid, passwordValid } = inputValid();

    if (nameInput.value === '') {
        nameMsg.style.color = "text-custom-textDark";
    } else if (nameValid) {
        nameMsg.style.color = "green";
    } else {

        nameMsg.style.color = "red";
    }





    if (emailInput.value === '') {
        emailMsg.style.color = "text-custom-textDark";
    } else if (emailValid) {
        emailMsg.style.color = "green";
    } else {
        emailMsg.style.color = "red";
    }

    if (passwordInput.value === '') {
        passwordMsg.style.color = "text-custom-textDark";
    } else if (passwordValid) {
        passwordMsg.style.color = "green";
    } else {
        passwordMsg.style.color = "red";
    }

    if (nameValid && emailValid && passwordValid) {
        return true;
    } else {

        return false;
    }
}

nameInput.addEventListener("input", feedback)
emailInput.addEventListener("input", feedback)
passwordInput.addEventListener("input", feedback)
feedback()



form.addEventListener("submit", async (e) => {
    e.preventDefault()
    if (feedback()) {
        try {
            await registerUser(nameInput.value, emailInput.value, passwordInput.value)
            displaySuccess()
            nameInput.value = "";
            emailInput.value = ""
            passwordInput.value = ""
        } catch (error) {
            existingUser.textContent = error.message;

        }
    }

})





async function registerUser(name, email, password) {

    try {
        const res = await fetch(`${userAuthEndpoints.register}`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
            headers: { "Content-Type": "application/json" },
        })

        if (res.status !== 400) {
            const data = await res.json();
            console.log("response", data)
            form.remove()
            wrapper.innerHTML = `<div class="loader"></div>`
            window.location.href = "/login.html"


        } else {
            throw new Error("Denne profilen eksisterer allerede")
        }
    } catch (error) {
        const errMsg = error.message
        displayError(errMsg)

    }
}


