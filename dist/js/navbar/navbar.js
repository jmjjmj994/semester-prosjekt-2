const navbar = document.querySelector("[data-navbar]");
const hamburger = document.querySelector("[data-hamburger]");

hamburger.addEventListener("click", (e) => {

    let menuOpen = false;

    if (!menuOpen) {
        navbar.classList.toggle("active")
        hamburger.classList.toggle("active")
    }

})

