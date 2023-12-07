


const navbar = document.querySelector("[data-type-component='navbar']")
const header = document.querySelector("header")
 const navbarListeners = () => {
    const hamburgerBtn = document.querySelector('[data-header="hamburger-menu"]');
    const closeNavbar = document.querySelector("[data-type-navbar='close-menu']")
    hamburgerBtn.onclick = () => navbarToggler(true);
    closeNavbar.onclick = () => navbarToggler(false);
}



const navbarToggler = (value) => {
    if(value) {
        navbar.classList.add("isActive")
    } else {
        navbar.classList.remove("isActive")
    }
}



const initializer = () => {
    navbarListeners()

}
initializer()