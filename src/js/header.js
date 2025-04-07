

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
    let navLinksContainer = document.querySelector(".nav-links");
    let catolog = document.querySelector(".search-section");
    let catologBar = document.querySelector("#search-input");

    // Sayfa yüklendiğinde localStorage'dan tema bilgisini al
    let savedTheme = localStorage.getItem("theme");

    // Tema durumuna göre uygulama yap
    if (savedTheme === "dark") {
        applyDarkMode();
        toggleButton.classList.add("active"); // Butonun durumunu da güncelle
    } else {
        applyLightMode();
        toggleButton.classList.remove("active");
    }

    toggleButton.addEventListener("click", function () {
        this.classList.toggle("active");

        // Eğer buton aktifse dark mode'u uygula
        if (this.classList.contains("active")) {
            applyDarkMode();
            localStorage.setItem("theme", "dark");
        } else {
            applyLightMode();
            localStorage.setItem("theme", "light");
        }
    });

    // DARK MODE FONKSİYONU
    function applyDarkMode() {
        body.style.backgroundColor = "white";
        navToggle.style.backgroundColor = "white";
        navLinksContainer.style.backgroundColor = "white";
        catolog.style.backgroundColor = "white";
        catologBar.style.backgroundColor = "white"; // Dark mode için

        writeColors.forEach(link => {
            link.style.color = "#282828";
        });

        logo.style.color = "#282828";
    }

    // LIGHT MODE FONKSİYONU
    function applyLightMode() {
        body.style.backgroundColor = "black";
        navToggle.style.backgroundColor = "black";
        navLinksContainer.style.backgroundColor = "black";
        catolog.style.backgroundColor = "black";
        catologBar.style.backgroundColor = "rgba(32, 40, 62, 0.8)"; // Light mode için

        writeColors.forEach(link => {
            link.style.color = "white";
        });

        logo.style.color = "white";
    }
}




navMenu();
toggleMenu();
