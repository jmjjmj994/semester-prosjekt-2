import {userAuthEndpoints} from "../api/api.js"; 

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




const inputValid = () => {
    const nameInput = document.querySelector("[data-input-type='name']").value.trim();
    const emailInput = document.querySelector("[data-input-type='email']").value.trim();
    const passwordInput = document.querySelector("[data-input-type='password']").value.trim();
    const nameRegex = /^[A-Za-z0-9_]+$/
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
        nameIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
</svg>`;
    } else if (nameValid) {
        nameIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>`;
        nameMsg.style.color = "green";
    } else {
        nameIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
</svg>`;
        nameMsg.style.color = "red";
    }





    if (emailInput.value === '') {
        emailMsg.style.color = "text-custom-textDark";
        emailIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
</svg>`;
    } else if (emailValid) {
        emailIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>`;
        emailMsg.style.color = "green";
    } else {
        emailIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
</svg>`;
        emailMsg.style.color = "red";
    }





    if (passwordInput.value === '') {
        passwordMsg.style.color = "text-custom-textDark";
        passwordIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" class="svg-elem-1"></path>
</svg>`;
    } else if (passwordValid) {
        passwordIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>`;
        passwordMsg.style.color = "green";
    } else {
        passwordIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
</svg>`;
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
            registerUser(nameInput.value, emailInput.value, passwordInput.value)
            nameInput.value = "";
            emailInput.value = ""
            passwordInput.value = ""
        } catch (error) {

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

        if (res.ok) {
            const data = await res.json();
            console.log("response", data)
            window.location.href = "/login.html"


        } else {
            throw new Error("Response status not ok")
        }
    } catch (error) {
        console.log("fetcherror", error.message)
    }
}


