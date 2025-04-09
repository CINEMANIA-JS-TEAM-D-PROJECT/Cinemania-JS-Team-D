// Sample API key - replace with your actual API key
const API_KEY = '3c5d79694d82b9e1fe6883553a34fc2d';
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original/';

// Default movie data as fallback
const defaultMovies = [
  {
    id: 493529,
    title: 'Dungeons & Dragons: Honor Among Thieves',
    backdrop_path: '/A7JQ7MIV5fkIxceI5hizRIe6DRJ.jpg',
    vote_average: 7.6,
    overview:
      'A charming thief and a band of unlikely adventurers undertake an epic heist to retrieve a lost relic, but things go dangerously awry when they run afoul of...',
  },
  {
    id: 447365,
    title: 'Guardians of the Galaxy Vol. 3',
    backdrop_path: '/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg',
    vote_average: 8.0,
    overview:
      'Peter Quill, still reeling from the loss of Gamora, must rally his team to defend the universe and protect one of their own. A mission that could mean the end of the Guardians if not successful.',
  },
  {
    id: 603692,
    title: 'John Wick: Chapter 4',
    backdrop_path: '/h8gHn0OzBoaefsYseUByqsmEDMY.jpg',
    vote_average: 7.8,
    overview:
      'With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.',
  },
];

let currentSlideIndex = 0;
let movies = [];
let slideInterval;

// Function to display error message as an overlay notification
function showErrorNotification(message) {
  // Create error notification element
  const notification = document.createElement('div');
  notification.classList.add('error-notification');
  notification.innerHTML = `
    <div class="error-content">
      <h3>Üzgünüz!</h3>
      <p>${message}</p>
      <button onclick="this.parentElement.parentElement.remove()">Tamam</button>
    </div>
  `;
  
  // Add styles for the notification
  notification.style.position = 'fixed';
  notification.style.top = '0';
  notification.style.left = '0';
  notification.style.width = '100%';
  notification.style.height = '100%';
  notification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  notification.style.display = 'flex';
  notification.style.justifyContent = 'center';
  notification.style.alignItems = 'center';
  notification.style.zIndex = '2000';
  
  // Style the error content
  const errorContent = notification.querySelector('.error-content');
  errorContent.style.backgroundColor = '#222';
  errorContent.style.color = '#fff';
  errorContent.style.padding = '30px';
  errorContent.style.borderRadius = '10px';
  errorContent.style.maxWidth = '500px';
  errorContent.style.textAlign = 'center';
  
  // Style the button
  const button = notification.querySelector('button');
  button.style.backgroundColor = '#ff5722';
  button.style.color = '#fff';
  button.style.border = 'none';
  button.style.padding = '10px 20px';
  button.style.borderRadius = '5px';
  button.style.marginTop = '20px';
  button.style.cursor = 'pointer';
  
  // Add to document
  document.body.appendChild(notification);
  
  // Automatically remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.remove();
    }
  }, 5000);
}

// Function to fetch trending movies
async function fetchTrendingMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // Get top 5 trending movies
      return data.results.slice(0, 5);
    } else {
      return defaultMovies;
    }
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    showErrorNotification('Film verilerini yüklerken bir sorun oluştu. Varsayılan filmler gösteriliyor.');
    return defaultMovies;
  }
}

// Function to generate rating stars
function generateStars(rating) {
  const fullStars = Math.floor(rating / 2);
  const halfStar = rating % 2 >= 1 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  let starsHTML = '';

  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<span class="star">★</span>';
  }

  if (halfStar) {
    starsHTML += '<span class="star">★</span>';
  }

  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<span class="star" style="opacity: 0.5;">★</span>';
  }

  return starsHTML;
}

// Function to create slider dots
function createSliderDots(count) {
  const dotsContainer = document.getElementById('slider-dots');
  if (!dotsContainer) {
    console.error('Slider dots container not found');
    return;
  }
  
  dotsContainer.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === currentSlideIndex) {
      dot.classList.add('active');
    }
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

// Function to update slider dots
function updateSliderDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index === currentSlideIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Function to go to specific slide
function goToSlide(index) {
  currentSlideIndex = index;
  showSlide();
  resetSlideInterval();
  updateSliderDots();
}

// Function to go to next slide
function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % movies.length;
  showSlide();
  updateSliderDots();
}

// Function to go to previous slide
function prevSlide() {
  currentSlideIndex = (currentSlideIndex - 1 + movies.length) % movies.length;
  showSlide();
  updateSliderDots();
}

// Function to reset slide interval
function resetSlideInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 7000); // Change slide every 7 seconds
}

// Function to show current slide
function showSlide() {
  const heroElement = document.getElementById('hero');
  if (!heroElement) {
    console.error('Hero element not found');
    return;
  }
  
  const movie = movies[currentSlideIndex];

  // Create slide content
  const slideHTML = `
        <div class="hero-slide fade">
            <img src="${BASE_IMAGE_URL + movie.backdrop_path}" alt="${movie.title}" class="hero-bg">
            <div class="hero-content">
                <h1 class="hero-title">${movie.title}</h1>
                <div class="rating">
                    ${generateStars(movie.vote_average)}
                </div>
                <p class="hero-description">${movie.overview}</p>
                <div class="hero-buttons">
                    <a href="javascript:void(0)" class="btn btn-primary" onclick="openTrailerModal(${movie.id})">Watch trailer</a>
                    <a href="javascript:void(0)" class="btn btn-secondary" onclick="openDetailsModal(${movie.id})">More details</a>
                </div>
            </div>
        </div>
    `;

  heroElement.innerHTML = slideHTML;
}

// Function to load hero slider content
async function loadHeroSlider() {
  try {
    // Fetch movies data
    movies = await fetchTrendingMovies();

    // Create slider navigation
    const heroContainer = document.getElementById('hero-container');
    if (!heroContainer) {
      console.error('Hero container not found');
      return;
    }
    
    const navHTML = `
          <button class="slider-nav prev" onclick="prevSlide()">❮</button>
          <button class="slider-nav next" onclick="nextSlide()">❯</button>
      `;
    heroContainer.insertAdjacentHTML('beforeend', navHTML);

    // Create slider dots
    createSliderDots(movies.length);

    // Show first slide
    showSlide();

    // Start automatic slide transition
    resetSlideInterval();
    
    // Check if modal elements exist and log if they don't
    if (!document.getElementById('trailerModal')) {
      console.error('Trailer modal element not found');
    }
    
    if (!document.getElementById('detailsModal')) {
      console.error('Details modal element not found');
    }
    
  } catch (error) {
    console.error('Error loading hero slider:', error);
    showErrorNotification('Film gösterisini yüklerken bir sorun oluştu.');
  }
}

// Function to fetch movie trailer
async function fetchMovieTrailer(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();

    // Find trailer or teaser
    const trailer = data.results.find(
      video => video.type === 'Trailer' || video.type === 'Teaser'
    );

    return trailer ? trailer.key : null;
  } catch (error) {
    console.error('Error fetching movie trailer:', error);
    showErrorNotification('Film fragmanı yüklenirken bir sorun oluştu.');
    return null;
  }
}

// Function to fetch movie details
async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    showErrorNotification('Film detaylarını yüklerken bir sorun oluştu.');
    return null;
  }
}

// Function to open trailer modal
async function openTrailerModal(movieId) {
  try {
    // "Çalışma devam ediyor" görseli göster
    showWorkInProgressImage();
  } catch (error) {
    console.error('Error opening trailer modal:', error);
    showErrorNotification('Fragman penceresini açarken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
  }
}

// Function to close trailer modal
function closeTrailerModal() {
  try {
    const trailerModal = document.getElementById('trailerModal');
    if (!trailerModal) {
      throw new Error('Trailer modal element not found');
    }
    
    const trailerContainer = document.getElementById('trailerVideoContainer');
    if (!trailerContainer) {
      throw new Error('Trailer video container not found');
    }
    
    trailerModal.style.display = 'none';
    trailerContainer.innerHTML = '';
    resetSlideInterval(); // Resume slider when modal is closed
  } catch (error) {
    console.error('Error closing trailer modal:', error);
  }
}

// Function to open details modal
async function openDetailsModal(movieId) {
  try {
    // "Çalışma devam ediyor" görseli göster
    showWorkInProgressImage();
  } catch (error) {
    console.error('Error opening details modal:', error);
    showErrorNotification('Detay penceresini açarken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
  }
}

// Function to close details modal
function closeDetailsModal() {
  try {
    const detailsModal = document.getElementById('detailsModal');
    if (!detailsModal) {
      throw new Error('Details modal element not found');
    }
    
    detailsModal.style.display = 'none';
    resetSlideInterval(); // Resume slider when modal is closed
  } catch (error) {
    console.error('Error closing details modal:', error);
  }
}

// Yeni fonksiyon: "Çalışma devam ediyor" görseli göster
function showWorkInProgressImage() {
  try {
    // Mevcut modalları gizle (varsa)
    const trailerModal = document.getElementById('trailerModal');
    const detailsModal = document.getElementById('detailsModal');
    
    if (trailerModal) trailerModal.style.display = 'none';
    if (detailsModal) detailsModal.style.display = 'none';
    
    // Varsa mevcut "çalışma devam ediyor" modalını kaldır
    const existingWipModal = document.getElementById('wipModal');
    if (existingWipModal) {
      existingWipModal.remove();
    }
    
    // Yeni "çalışma devam ediyor" modalı oluştur
    const wipModal = document.createElement('div');
    wipModal.id = 'wipModal';
    wipModal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
    `;
    
    // Kapatma butonu ve 350x720 boyutunda görsel için içerik alanı
    wipModal.innerHTML = `
      <div style="position: relative; width: 650px; height: 370px;">
        <span style="position: absolute; top: 15px; right: 15px; font-size: 24px; color: #fff; cursor: pointer;" onclick="closeWipModal()">×</span>
        <div id="wipImageContainer" style="width: 650px; height: 370px;">
          <!-- Özel görselinizi ekleyin -->
          <img src="../img/hero-2-desktop.jpg" alt="Çalışma Devam Ediyor" style="width: 100%; height: 100%; object-fit: contain;">
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center;">
          <span style="position: absolute; top: 15px; right: 15px; font-size: 24px; color: #fff; cursor: pointer;" onclick="closeWipModal()">×</span>
                <div style="width: 80px; height: 80px; border: 5px solid rgb(224, 101, 0); border-radius: 50%; border-top-color: transparent; animation: spin 2.1s linear infinite;"></div>
                <div style="position: absolute; bottom: 20px; text-align: center; color: white;">
                    <h2 style="margin-top: 20px; font-size: 24px;">Çalışma Devam Ediyor</h2>
                    <p style="margin-top: 10px;">Bu bölüm yapım aşamasındadır.</p>
                </div>
            </div>
        </div>
      </div>
    `;
    
    // Dönen animasyon için stil ekle
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    // Modalı sayfaya ekle
    document.body.appendChild(wipModal);
    
    // Slider'ı durdur
    clearInterval(slideInterval);
  } catch (error) {
    console.error('Error showing work in progress image:', error);
    showErrorNotification('Görsel gösterilirken bir sorun oluştu.');
  }
}

// Kapatma fonksiyonu

function closeWipModal() {
  try {
    const wipModal = document.getElementById('wipModal');
    if (wipModal) {
      wipModal.remove();
    }
    resetSlideInterval(); // Slider'ı yeniden başlat
  } catch (error) {
    console.error('Error closing WIP modal:', error);
  }
}

// Close modals when clicking outside content
window.onclick = function (event) {
  try {
    const trailerModal = document.getElementById('trailerModal');
    const detailsModal = document.getElementById('detailsModal');
    const wipModal = document.getElementById('wipModal');

    if (trailerModal && event.target === trailerModal) {
      closeTrailerModal();
    }

    if (detailsModal && event.target === detailsModal) {
      closeDetailsModal();
    }
    
    if (wipModal && event.target === wipModal) {
      closeWipModal();
    }
  } catch (error) {
    console.error('Error in window click handler:', error);
  }
};

// Check if HTML elements exist on page load
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Check if required elements exist
    const requiredElements = [
      { id: 'hero-container', name: 'Hero Container' },
      { id: 'hero', name: 'Hero Section' },
      { id: 'trailerModal', name: 'Trailer Modal' },
      { id: 'detailsModal', name: 'Details Modal' },
      { id: 'trailerVideoContainer', name: 'Trailer Video Container' },
      { id: 'movieDetailsContainer', name: 'Movie Details Container' }
    ];
    
    const missingElements = [];
    
    requiredElements.forEach(element => {
      if (!document.getElementById(element.id)) {
        missingElements.push(element.name);
      }
    });
    
    if (missingElements.length > 0) {
      console.error('Missing HTML elements:', missingElements.join(', '));
      if (missingElements.includes('Trailer Modal') || missingElements.includes('Details Modal')) {
        showErrorNotification(`Arayüz elemanları eksik: ${missingElements.join(', ')}. Lütfen sayfayı yenileyin.`);
      }
    }
    
    // Load hero slider
    loadHeroSlider();
  } catch (error) {
    console.error('Error during DOM content loaded event:', error);
    showErrorNotification('Sayfa yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.');
  }
});

// Export functions to window object to make them globally accessible
window.goToSlide = goToSlide;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.openTrailerModal = openTrailerModal;
window.closeTrailerModal = closeTrailerModal;
window.openDetailsModal = openDetailsModal;
window.closeDetailsModal = closeDetailsModal;
window.showErrorNotification = showErrorNotification;
window.showWorkInProgressImage = showWorkInProgressImage;
window.closeWipModal = closeWipModal;