// API ayarları
const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzYxMTQwZGRhOGZlM2QwOTRlZTJjNjNmMDVhNzY4NCIsIm5iZiI6MTc0MzcxMzIxNS4wNTQwMDAxLCJzdWIiOiI2N2VlZjNiZmIzZTAzNTI4NmNkOTE5NmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.cMbD5QK1f9Kk4TMQuYUvz52-u2EFK-3KGTrtJp0fEI0';
const BASE_URL = 'https://api.themoviedb.org/3';
let allMovies = []; 

// Fetch seçenekleri
function getFetchOptions() {
  return {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_KEY,
    },
  };
}

// Responsive görsel URL'si
function getResponsiveImageUrl(movie) {
  if (window.innerWidth < 768) {
    return movie.poster_path
      ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
      : './assets/images/no-poster.jpg';
  } else {
    if (movie.backdrop_path) {
      return `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;
    } else if (movie.poster_path) {
      return `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
    } else {
      return './assets/images/no-poster.jpg';
    }
  }
}

// Upcoming filmleri çek
async function fetchUpcomingMovies() {
  const url = `${BASE_URL}/movie/upcoming?language=en-US&page=1`;
  const response = await fetch(url, getFetchOptions());
  if (!response.ok) {
    throw new Error('Upcoming filmler alınırken hata oluştu.');
  }
  const data = await response.json();
  return data.results;
}

// Tüm türleri (genre) çek
async function fetchAllGenres() {
  const url = `${BASE_URL}/genre/movie/list?language=en-US`;
  const response = await fetch(url, getFetchOptions());
  if (!response.ok) {
    throw new Error('Film türleri alınırken hata oluştu.');
  }
  const data = await response.json();
  return data.genres;
}

// DOM referansları
const refs = {
  imgBox: document.querySelector('.img-box-upcoming'),
  movieTitle: document.querySelector('.upcoming-header-2'),
  releaseDateText: document.querySelector('.release-date-text-upcoming'),
  voteAverageElement: document.querySelector('.vote-average-upcoming'),
  voteCountElement: document.querySelector('.vote-count-upcoming'),
  popularityText: document.querySelector('.popularity-text-upcoming'),
  genreText: document.querySelector('.genre-text-upcoming'),
  aboutText: document.querySelector('.upcoming-about-text'),
  addToLibraryBtn: document.querySelector('.upcoming-button'),
};

// Film verilerini render et
function renderUpcomingMovie(movie, allGenres) {
  const imageUrl = getResponsiveImageUrl(movie);
  refs.imgBox.style.backgroundImage = `url(${imageUrl})`;

  refs.movieTitle.textContent = movie.title || 'No Title';
  refs.releaseDateText.textContent = movie.release_date || 'No Release Date';

  const voteAverage =
    movie.vote_average !== undefined && movie.vote_average !== null
      ? movie.vote_average.toFixed(1)
      : '0.0';
  const voteCount =
    movie.vote_count !== undefined && movie.vote_count !== null
      ? movie.vote_count
      : '0';

  if (refs.voteAverageElement) {
    refs.voteAverageElement.textContent = voteAverage;
  }
  if (refs.voteCountElement) {
    refs.voteCountElement.textContent = voteCount;
  }

  refs.popularityText.textContent = movie.popularity
    ? movie.popularity.toFixed(1)
    : '0.0';

  const movieGenreNames = (movie.genre_ids || []).map((id) => {
    const genre = allGenres.find((g) => g.id === id);
    return genre ? genre.name : 'Unknown';
  });
  refs.genreText.textContent = movieGenreNames.join(', ') || 'No Genres';

  refs.aboutText.textContent = movie.overview || 'No overview available.';

  setupLibraryButton(movie); // Butonu kur
}

// LocalStorage'dan film ekle/çıkar
function toggleLibrary(movie) {
  const libraryKey = 'library';
  const storedLibrary = JSON.parse(localStorage.getItem(libraryKey)) || [];
  const index = storedLibrary.findIndex((item) => item.id === movie.id);
  const button = document.querySelector('.upcoming-button');

  if (index !== -1) {
    storedLibrary.splice(index, 1);
    localStorage.setItem(libraryKey, JSON.stringify(storedLibrary));
    
    if (button) button.textContent = 'Add to my library';
  } else {
    storedLibrary.push(movie);
    localStorage.setItem(libraryKey, JSON.stringify(storedLibrary));
    
    if (button) button.textContent = 'Remove from my library';
  }
}

// Buton durumunu ayarla ve click eventi bağla
function setupLibraryButton(movie) {
  const button = document.querySelector('.upcoming-button');
  const libraryKey = 'library';
  const storedLibrary = JSON.parse(localStorage.getItem(libraryKey)) || [];
  const isAlreadyInLibrary = storedLibrary.some((item) => item.id === movie.id);

  if (button) {
    button.textContent = isAlreadyInLibrary ? 'Remove from my library' : 'Add to my library';
    button.addEventListener('click', () => toggleLibrary(movie));
  }
}

// Başlatıcı
async function initUpcomingMovie() {
  try {
    const [allGenres, upcomingMovies] = await Promise.all([
      fetchAllGenres(),
      fetchUpcomingMovies(),
    ]);

    if (upcomingMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * upcomingMovies.length);
      const randomMovie = upcomingMovies[randomIndex];
      renderUpcomingMovie(randomMovie, allGenres);
      
    } else {
      console.log('Upcoming film bulunamadı.');
    }
  } catch (error) {
    console.error('Hata:', error);
  }
}

// Başlat
initUpcomingMovie();

// Ekran boyutu değişince yeniden yükle
window.addEventListener('resize', () => {
  location.reload();
});
