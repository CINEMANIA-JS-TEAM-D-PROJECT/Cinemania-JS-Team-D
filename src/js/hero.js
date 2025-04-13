import { openModal , watchTrailer } from './modal.js';

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
    starsHTML += '<span class="hero-star">★</span>';
  }

  if (halfStar) {
    starsHTML += '<span class="hero-star">★</span>';
  }

  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<span class="hero-star" style="opacity: 0.5;">★</span>';
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
            <img src="${BASE_IMAGE_URL + movie.backdrop_path}" alt="${movie.title}" class="hero-bg" loading="lazy">
            <div class="hero-content">
                <h1 class="hero-title">${movie.title}</h1>
                <div class="hero-rating">
                    ${generateStars(movie.vote_average)}
                </div>
                <p class="hero-description">${movie.overview}</p>
                <div class="hero-buttons">
                    <a href="javascript:void(0)" class="hero-btn hero-btn-primary">Watch trailer</a>
                    <a href="javascript:void(0)" class="hero-btn hero-btn-secondary" >More details</a>
                </div>
            </div>
        </div>
    `;
   
  heroElement.innerHTML = slideHTML;

  // Modal butonuna tıklama işlemi burada tanımlanmalı
 

  document.querySelector('.hero-btn-secondary').addEventListener('click', () => {
    openModal(movie);
  });


    // "Watch trailer" butonuna trailer gösterme işlevi
  document.querySelector('.hero-btn-primary').addEventListener('click', () => {
    watchTrailer(movie.id);
  });

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
    
  
    
  } catch (error) {
    console.error('Error loading hero slider:', error);
  
  }
}

// Check if HTML elements exist on page load
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Check if required elements exist
    const requiredElements = [
      { id: 'hero-container', name: 'Hero Container' },
      { id: 'hero', name: 'Hero Section' },
    
    ];
    
    const missingElements = [];
    
    requiredElements.forEach(element => {
      if (!document.getElementById(element.id)) {
        missingElements.push(element.name);
      }
    });
    
    if (missingElements.length > 0) {
      console.error('Missing HTML elements:', missingElements.join(', '));
      
    }
    
    // Load hero slider
    loadHeroSlider();
  } catch (error) {
    console.error('Error during DOM content loaded event:', error);
    
  }
});

window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;








