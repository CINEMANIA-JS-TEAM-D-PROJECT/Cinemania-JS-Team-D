function navMenu() {
  let menuButton = document.querySelector('.burger');
  let openMenu = document.querySelector('.nav-links');

  menuButton.addEventListener('click', function () {
    this.classList.toggle('active');
    openMenu.classList.toggle('active');
  });
}

function toggleMenu() {
  let toggleButton = document.querySelector('.toggle-switch');
  let body = document.querySelector('body');
  let writeColors = document.querySelectorAll('.header, .nav-links a, .burger');
  let navToggle = document.querySelector('.navbar');
  let logo = document.querySelector('.logo');
  let navLinksContainer = document.querySelector('.nav-links');
  let catolog = document.querySelector('.search-section');
  let catologBar = document.querySelector('#search-input');
  let footer = document.querySelector('footer');
  let searchBar = document.querySelector('.search-bar');
  let footerLinks = document.querySelectorAll('footer a, footer p, footer div');
  let searchElements = document.querySelectorAll('.search-section *, .search-bar *, #search-input');
  // Ana sayfa metin öğeleri
  let homePageElements = document.querySelectorAll('main p, main h1, main h2, main h3, main h4, main span, main div, .hero-title, .hero-description, .movie-title, .upcoming-section *, .weekly-trends *');
  
  // Sayfa yüklendiğinde localStorage'dan tema bilgisini al
  let savedTheme = localStorage.getItem('theme');

  // Pagination için DOM değişikliklerini izleyen gözlemci oluştur
  const paginationObserver = new MutationObserver((mutations) => {
    // Yeni eklenen pagination elementleri için temayı uygula
    if (savedTheme === 'dark') {
      applyPaginationDarkMode();
    } else {
      applyPaginationLightMode();
    }
  });

  // Ana sayfa içeriği için DOM değişikliklerini izleyen gözlemci oluştur
  const homePageObserver = new MutationObserver((mutations) => {
    // Yeni eklenen ana sayfa elementleri için temayı uygula
    if (savedTheme === 'dark') {
      applyHomePageDarkMode();
    } else {
      applyHomePageLightMode();
    }
  });

  // Pagination elementlerinin bulunabileceği ana elementi izle
  const paginationSection = document.querySelector('.pagination-section');
  if (paginationSection) {
    paginationObserver.observe(paginationSection, { 
      childList: true, 
      subtree: true 
    });
  }

  // Ana sayfa içeriğini izle
  const mainContent = document.querySelector('main');
  if (mainContent) {
    homePageObserver.observe(mainContent, {
      childList: true,
      subtree: true
    });
  }

  // Hero bölümünü dark mode stilinde tutmak için
  function applyHeroSectionDarkStyle() {
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.style.backgroundColor = '#111111';
    }
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.color = '#f8f8f8';
    }
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.style.color = '#f8f8f8';
    }
    
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
      heroDescription.style.color = '#f8f8f8';
    }
    
    
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
      star.style.background = 'linear-gradient(141.22deg, #F84119 9.4%, rgba(248, 159, 25, 0.68) 91.91%)';
      star.style.webkitBackgroundClip = 'text';
      star.style.webkitTextFillColor = 'transparent';
      star.style.backgroundClip = 'text';
    });
    
    
  }

  // Ana sayfa elementleri için Dark Mode
  function applyHomePageDarkMode() {
    
    document.querySelectorAll('main p, main h1, main h2, main h3, main h4, main span, main div, .movie-info *, .upcoming-section *, .weekly-trends *').forEach(element => {
      
      if (!element.classList.contains('exclude-theme') && 
          !element.closest('.pagination') && 
          !element.closest('.movie-card') &&
          !element.classList.contains('movie-title') &&
          !element.classList.contains('star') &&
          !element.closest('.scroll-up-btn') &&
          !element.closest('.hero') &&
          !element.closest('.hero-content') &&
          !element.classList.contains('seeall')) {
        element.style.color = '#f8f8f8';
      }
    });
    
    // Hero bölümü her zaman dark mode stilinde kalacak
    applyHeroSectionDarkStyle();
    
    // Upcoming ve Weekly Trends bölümleri
    const sectionTitles = document.querySelectorAll('.upcoming-header, .upcoming-header-2, .weekly-trends-title');
    sectionTitles.forEach(el => {
      el.style.color = '#f8f8f8';
    });
  }

  // Ana sayfa elementleri için Light Mode
  function applyHomePageLightMode() {
    
    document.querySelectorAll('main p, main h1, main h2, main h3, main h4, main span, main div, .movie-info *, .upcoming-section *, .weekly-trends *').forEach(element => {
      
      if (!element.classList.contains('exclude-theme') && 
          !element.closest('.pagination') && 
          !element.closest('.movie-card') &&
          !element.classList.contains('movie-title') &&
          !element.classList.contains('star') &&
          !element.closest('.scroll-up-btn') &&
          !element.closest('.hero') &&
          !element.closest('.hero-content') &&
          !element.classList.contains('seeall')) {
        element.style.color = '#282828';
      }
    });
    
    // Hero bölümü her zaman dark mode stilinde kalacak
    applyHeroSectionDarkStyle();
    
    // Upcoming ve Weekly Trends bölümleri
    const sectionTitles = document.querySelectorAll('.upcoming-header, .upcoming-header-2, .weekly-trends-title');
    sectionTitles.forEach(el => {
      el.style.color = '#282828';
    });
  }

  // Tema durumuna göre uygulama yap
  if (savedTheme === 'dark') {
    applyDarkMode();
    applyHeroSectionDarkStyle(); 
    toggleButton.classList.add('active');
  } else {
    applyLightMode();
    applyHeroSectionDarkStyle(); 
    toggleButton.classList.remove('active');
  }

  toggleButton.addEventListener('click', function () {
    this.classList.toggle('active');

    
    if (this.classList.contains('active')) {
      applyDarkMode();
      localStorage.setItem('theme', 'dark');
      savedTheme = 'dark';
    } else {
      applyLightMode();
      localStorage.setItem('theme', 'light');
      savedTheme = 'light';
    }
  });

  // Sayfalama elementleri için Dark Mode
  function applyPaginationDarkMode() {
    document.querySelectorAll('.pagination button').forEach(button => {
      if (!button.classList.contains('active')) {
        button.style.borderColor = '#f8f8f8';
        button.style.color = '#f8f8f8';
        button.style.backgroundColor = '#111111';
      }
    });

    document.querySelectorAll('.pagination-ellipsis').forEach(ellipsis => {
      ellipsis.style.color = '#f8f8f8';
    });
  }

  // Sayfalama elementleri için Light Mode
  function applyPaginationLightMode() {
    document.querySelectorAll('.pagination button').forEach(button => {
      if (!button.classList.contains('active')) {
        button.style.borderColor = '#282828';
        button.style.color = '#282828';
        button.style.backgroundColor = '#f8f8f8';
      }
    });

    document.querySelectorAll('.pagination-ellipsis').forEach(ellipsis => {
      ellipsis.style.color = '#282828';
    });
  }

  // DARK MODE FONKSİYONU
  function applyDarkMode() {
    body.style.backgroundColor = '#111111';
    navToggle.style.backgroundColor = '#111111';
    navLinksContainer.style.backgroundColor = '#111111';
    
    // Home sayfasındaki tüm metin öğelerini güncelle
    applyHomePageDarkMode();
    
    if (footer) {
      footer.style.backgroundColor = '#111111';
      footer.style.color = '#f8f8f8';
      
      // Telif hakkı metni ve footer içindeki tüm elementleri güncelle
      const footerElements = footer.querySelectorAll('*');
      footerElements.forEach(el => {
        // Scroll-up butonunu hariç tut
        if(!el.classList.contains('scroll-up-btn') && !el.closest('.scroll-up-btn')) {
          el.style.color = '#f8f8f8';
          el.style.backgroundColor = '#111111';
        }
      });

      // Scroll-up butonunun rengini koru
      const scrollUpBtn = document.querySelector('.scroll-up-btn');
      if(scrollUpBtn) {
        scrollUpBtn.style.backgroundColor = '#ff6b08';
        scrollUpBtn.style.color = '#fff';
      }
    }
    
    if (searchBar) {
      searchBar.style.backgroundColor = '#111111';
    }
    
    if (catolog) {
      catolog.style.backgroundColor = '#111111';
    }
    
    if (catologBar) {
      catologBar.style.backgroundColor = '#111111';
      catologBar.style.color = '#f8f8f8';
    }

    // Tüm footer içindeki elementleri güncelle
    footerLinks.forEach(element => {
      element.style.color = '#f8f8f8';
      element.style.backgroundColor = '#111111';
    });

    // Tüm arama ile ilgili elementleri güncelle
    searchElements.forEach(element => {
      if (element.tagName === 'INPUT') {
        element.style.backgroundColor = '#111111';
        element.style.color = '#f8f8f8';
        element.style.borderColor = '#f8f8f8';
      } else {
        element.style.color = '#f8f8f8';
        element.style.backgroundColor = '#111111';
      }
    });

    // Sayfalama butonlarını güncelle
    applyPaginationDarkMode();

    writeColors.forEach(link => {
      link.style.color = '#f8f8f8';
    });

    logo.style.color = '#f8f8f8';
  }

  // LIGHT MODE FONKSİYONU
  function applyLightMode() {
    body.style.backgroundColor = '#f8f8f8';
    navToggle.style.backgroundColor = '#f8f8f8';
    navLinksContainer.style.backgroundColor = '#f8f8f8';
    
    // Home sayfasındaki tüm metin öğelerini güncelle
    applyHomePageLightMode();
    
    if (footer) {
      footer.style.backgroundColor = '#f8f8f8';
      footer.style.color = '#282828';
      
      // Telif hakkı metni ve footer içindeki tüm elementleri güncelle
      const footerElements = footer.querySelectorAll('*');
      footerElements.forEach(el => {
        // Scroll-up butonunu hariç tut
        if(!el.classList.contains('scroll-up-btn') && !el.closest('.scroll-up-btn')) {
          el.style.color = '#282828';
          el.style.backgroundColor = '#f8f8f8';
        }
      });

      // Scroll-up butonunun rengini koru
      const scrollUpBtn = document.querySelector('.scroll-up-btn');
      if(scrollUpBtn) {
        scrollUpBtn.style.backgroundColor = '#ff6b08';
        scrollUpBtn.style.color = '#fff';
      }
    }
    
    if (searchBar) {
      searchBar.style.backgroundColor = '#f8f8f8';
    }
    
    if (catolog) {
      catolog.style.backgroundColor = '#f8f8f8';
    }
    
    if (catologBar) {
      catologBar.style.backgroundColor = '#f8f8f8';
      catologBar.style.color = '#282828';
    }

    // Tüm footer içindeki elementleri güncelle
    footerLinks.forEach(element => {
      element.style.color = '#282828';
      element.style.backgroundColor = '#f8f8f8';
    });

    // Tüm arama ile ilgili elementleri güncelle
    searchElements.forEach(element => {
      if (element.tagName === 'INPUT') {
        element.style.backgroundColor = '#f8f8f8';
        element.style.color = '#282828';
        element.style.borderColor = '#282828';
      } else {
        element.style.color = '#282828';
        element.style.backgroundColor = '#f8f8f8';
      }
    });

    // Sayfalama butonlarını güncelle
    applyPaginationLightMode();

    writeColors.forEach(link => {
      link.style.color = '#282828';
    });

    logo.style.color = '#282828';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  navMenu();
  toggleMenu();
});
