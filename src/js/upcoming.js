// API ayarları
const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzYxMTQwZGRhOGZlM2QwOTRlZTJjNjNmMDVhNzY4NCIsIm5iZiI6MTc0MzcxMzIxNS4wNTQwMDAxLCJzdWIiOiI2N2VlZjNiZmIzZTAzNTI4NmNkOTE5NmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.cMbD5QK1f9Kk4TMQuYUvz52-u2EFK-3KGTrtJp0fEI0';
const BASE_URL = 'https://api.themoviedb.org/3';

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

/* 
  getResponsiveImageUrl fonksiyonu;
  - Mobilde (window.innerWidth < 768) poster_path kullanıyor. Tasarımınız 280x402 olduğu için w342 boyutlu poster,
  - Tablet ve desktop için (>=768px) eğer varsa backdrop_path kullanıyor (w780 boyutlu), yoksa poster_path'e fallback yapıyor.
*/
function getResponsiveImageUrl(movie) {
  if (window.innerWidth < 768) {
    // Mobil: poster_path kullanıyoruz
    return movie.poster_path
      ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
      : './assets/images/no-poster.jpg';
  } else {
    // Tablet ve Desktop: Öncelikle backdrop_path kontrolü
    if (movie.backdrop_path) {
      return `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;
    } else if (movie.poster_path) {
      // Eğer backdrop yoksa poster_path kullanılır
      return `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
    } else {
      return './assets/images/no-poster.jpg';
    }
  }
}

// Upcoming filmleri çekme
async function fetchUpcomingMovies() {
  const url = `${BASE_URL}/movie/upcoming?language=en-US&page=1`;
  const response = await fetch(url, getFetchOptions());
  if (!response.ok) {
    throw new Error('Upcoming filmler alınırken hata oluştu.');
  }
  const data = await response.json();
  return data.results;
}

// Film türlerini çekme
async function fetchAllGenres() {
  const url = `${BASE_URL}/genre/movie/list?language=en-US`;
  const response = await fetch(url, getFetchOptions());
  if (!response.ok) {
    throw new Error('Film türleri alınırken hata oluştu.');
  }
  const data = await response.json();
  return data.genres;
}

// DOM referansları (index.html'deki yer tutucular)
const refs = {
  imgBox: document.querySelector('.img-box'),
  movieTitle: document.querySelector('.upcoming-header-2'),
  releaseDateText: document.querySelector('.release-date-text'),
  voteSpans: document.querySelectorAll('.vote-span'), // [0]: vote_average, [1]: vote_count
  popularityText: document.querySelector('.popularity-text'),
  genreText: document.querySelector('.genre-text'),
  aboutText: document.querySelector('.upcoming-about-text'),
};

// Film verilerini DOM'a render eden fonksiyon
function renderUpcomingMovie(movie, allGenres) {
  // Responsive görsel URL'si: mobilde poster, tablet/desktop'ta backdrop
  const imageUrl = getResponsiveImageUrl(movie);
  refs.imgBox.style.backgroundImage = `url(${imageUrl})`;

  // Film başlığı
  refs.movieTitle.textContent = movie.title || 'No Title';

  // Çıkış tarihi
  refs.releaseDateText.textContent = movie.release_date || 'No Release Date';

  // Vote/votes
  const voteAverage = (movie.vote_average !== undefined && movie.vote_average !== null)
    ? movie.vote_average.toFixed(1)
    : '0.0';
  const voteCount = (movie.vote_count !== undefined && movie.vote_count !== null)
    ? movie.vote_count
    : '0';
  if (refs.voteSpans.length >= 2) {
    refs.voteSpans[0].textContent = voteAverage;
    refs.voteSpans[1].textContent = voteCount;
  }

  // Popülerlik bilgisi
  refs.popularityText.textContent = movie.popularity ? movie.popularity.toFixed(1) : '0.0';

  // Tür bilgisi: genre_ids'i isimlerle eşleştiriyoruz
  const movieGenreNames = (movie.genre_ids || []).map(id => {
    const genre = allGenres.find(g => g.id === id);
    return genre ? genre.name : 'Unknown';
  });
  refs.genreText.textContent = movieGenreNames.join(', ') || 'No Genres';

  // Film hakkında (overview)
  refs.aboutText.textContent = movie.overview || 'No overview available.';
}

// Ana fonksiyon: filmleri çekip, rastgele bir tanesini render eder
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

// Başlatma
initUpcomingMovie();

// (Opsiyonel) Ekran boyutu değiştiğinde yeniden render etmek için
window.addEventListener('resize', () => {
  location.reload();
});