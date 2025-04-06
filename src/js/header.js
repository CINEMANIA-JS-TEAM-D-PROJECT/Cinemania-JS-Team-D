

function navMenu() {
 
    let menuButton = document.querySelector(".burger");
    let openMenu = document.querySelector(".nav-links");

    menuButton.addEventListener("click", function(){

        this.classList.toggle("active");
        openMenu.classList.toggle("active");
    });

}


function toggleMenu() {   
    let toggleButton = document.querySelector(".toggle-switch");
    let body = document.querySelector("body");
    let writeColors = document.querySelectorAll(".header, .nav-links a, .burger");
    let navToggle = document.querySelector(".navbar");
    let logo = document.querySelector(".logo");
    let navLinksContainer = document.querySelector(".nav-links"); // 👈 mobil menüyü kapsayan alan

    toggleButton.addEventListener("click", function () {
        this.classList.toggle("active");

        let currentBg = getComputedStyle(body).backgroundColor;

        if (currentBg === "rgb(255, 255, 255)") {
            // dark mode
            body.style.backgroundColor = "black";
            navToggle.style.backgroundColor = "black";
            navLinksContainer.style.backgroundColor = "black"; // 👈 mobil menü arkaplanı

            writeColors.forEach(link => {
                link.style.color = "white";
            });

            logo.style.color = "white";

        } else {
            // light mode
            body.style.backgroundColor = "white";
            navToggle.style.backgroundColor = "white";
            navLinksContainer.style.backgroundColor = "white"; // 👈 mobil menü arkaplanı

            writeColors.forEach(link => {
                link.style.color = "#282828";
            });

            logo.style.color = "#282828";
        }
    });
}

navMenu();
toggleMenu();
