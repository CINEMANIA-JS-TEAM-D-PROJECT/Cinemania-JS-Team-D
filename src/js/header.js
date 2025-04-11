function navMenu() {
  const menuButton = document.querySelector('.burger');
  const openMenu = document.querySelector('.header-nav-links');

  if (!menuButton || !openMenu) return;

  menuButton.addEventListener('click', function () {
    this.classList.toggle('active');
    openMenu.classList.toggle('active');
  });
}

function toggleMenu() {
  const toggleButton = document.querySelector('.header-toggle-switch');
  const body = document.querySelector('body');
  const writeColors = document.querySelectorAll('.header, .header-nav-links a, .burger');
  const navToggle = document.querySelector('.header-navbar');
  const logo = document.querySelector('.header-logo');
  const navLinksContainer = document.querySelector('.header-nav-links');
  const upcomingSectionColor = document.querySelector('.upcoming-section');
  const footerBackroundColor = document.querySelector('.footer');
  const weekTitleColor = document.querySelector('.weekly-title');
  const modalPageButton = document.querySelector('.pagination button');
  const searchSectionBackround = document.querySelector('#search-input-catalog');
  const yerDropdownBackround = document.querySelector('.year-dropdown-btn');
  const yerDropdownBackroundBorder = document.querySelector('.year-dropdown-btn');
  const yerDropdownBackroundContend = document.querySelector('.year-dropdown-content');
  const yearOptions = document.querySelectorAll('.year-option'); // Tüm yıl seçeneklerini seç

  if (!toggleButton) return;

  let savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    applyDarkMode();
    toggleButton.classList.add('active');
  } else {
    applyLightMode();
    toggleButton.classList.remove('active');
  }

  toggleButton.addEventListener('click', function () {
    this.classList.toggle('active');
    if (this.classList.contains('active')) {
      applyDarkMode();
      localStorage.setItem('theme', 'dark');
    } else {
      applyLightMode();
      localStorage.setItem('theme', 'light');
    }
  });

  function applyDarkMode() {
    if (body) body.style.backgroundColor = 'white';
    if (navToggle) navToggle.style.backgroundColor = 'white';
    if (navLinksContainer) navLinksContainer.style.backgroundColor = 'white';
    if (footerBackroundColor) footerBackroundColor.style.backgroundColor = 'white';
    if (modalPageButton) modalPageButton.style.backgroundColor = '#595959';
    if (searchSectionBackround) searchSectionBackround.style.backgroundColor = 'white';
    if (searchSectionBackround) searchSectionBackround.style.borderColor = 'black';
    if (yerDropdownBackround) yerDropdownBackround.style.backgroundColor = 'white';
    if (yerDropdownBackroundBorder) yerDropdownBackroundBorder.style.borderColor = 'black';
    if (yerDropdownBackroundContend) yerDropdownBackroundContend.style.backgroundColor = 'white';
    if (yerDropdownBackroundContend) yerDropdownBackroundContend.style.borderColor = 'black';

    writeColors.forEach(link => {
      link.style.color = '#282828';
    });

    yearOptions.forEach(option => {
      option.style.color = '#282828';
    });

    if (upcomingSectionColor) upcomingSectionColor.style.color = '#282828';
    if (logo) logo.style.color = '#282828';
    if (footerBackroundColor) footerBackroundColor.style.color = '#282828';
    if (weekTitleColor) weekTitleColor.style.color = '#282828';
    if (modalPageButton) modalPageButton.style.color = '#595959';
    if (yerDropdownBackroundBorder) yerDropdownBackroundBorder.style.color = '#282828';
  }

  function applyLightMode() {
    if (body) body.style.backgroundColor = '#111111';
    if (navToggle) navToggle.style.backgroundColor = '#111111';
    if (navLinksContainer) navLinksContainer.style.backgroundColor = '#111111';
    if (footerBackroundColor) footerBackroundColor.style.backgroundColor = '#111111';
    if (searchSectionBackround) searchSectionBackround.style.backgroundColor = '#111111';
    if (searchSectionBackround) searchSectionBackround.style.borderColor = 'white';
    if (yerDropdownBackround) yerDropdownBackround.style.backgroundColor = '#111111';
    if (yerDropdownBackroundBorder) yerDropdownBackroundBorder.style.borderColor = 'white';
    if (yerDropdownBackroundContend) yerDropdownBackroundContend.style.backgroundColor = '#111111';
    if (yerDropdownBackroundContend) yerDropdownBackroundContend.style.borderColor = 'white';

    writeColors.forEach(link => {
      link.style.color = 'white';
    });

    yearOptions.forEach(option => {
      option.style.color = 'white';
    });

    if (upcomingSectionColor) upcomingSectionColor.style.color = 'white';
    if (logo) logo.style.color = 'white';
    if (footerBackroundColor) footerBackroundColor.style.color = 'white';
    if (weekTitleColor) weekTitleColor.style.color = 'white';
    if (yerDropdownBackroundBorder) yerDropdownBackroundBorder.style.color = 'white';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  navMenu();
  toggleMenu();

  const currentPath = window.location.pathname;
  let currentPage = "";

  if (currentPath.includes("index.html")) currentPage = "home";
  else if (currentPath.includes("catalog.html")) currentPage = "catalog";
  else if (currentPath.includes("myLibrary.html")) currentPage = "library";

  localStorage.setItem("activePage", currentPage);

  const links = document.querySelectorAll(".header-nav-links a");
  const activePage = localStorage.getItem("activePage");

  links.forEach((link) => {
    if (link.dataset.page === activePage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
