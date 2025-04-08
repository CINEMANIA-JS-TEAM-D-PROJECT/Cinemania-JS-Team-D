// API ayarları (Token: daha önce gönderdiğiniz token kullanılıyor)
const API_KEY ='Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzYxMTQwZGRhOGZlM2QwOTRlZTJjNjNmMDVhNzY4NCIsIm5iZiI6MTc0MzcxMzIxNS4wNTQwMDAxLCJzdWIiOiI2N2VlZjNiZmIzZTAzNTI4NmNkOTE5NmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.cMbD5QK1f9Kk4TMQuYUvz52-u2EFK-3KGTrtJp0fEI0';
const BASE_URL = 'https://api.themoviedb.org/3';
let allMovies = []; 

// Fetch isteklerinde kullanılacak seçenekleri döndüren fonksiyon
function getFetchOptions() {
  return {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_KEY,
    },
  };
}
// 1) Upcoming (yakında gelecek) filmleri çekiyoruz
async function fetchUpcomingMovies() {
  const url = `${BASE_URL}/movie/upcoming?language=en-US&page=1`;
  const response = await fetch(url, getFetchOptions());
  if (!response.ok) {
    throw new Error('Upcoming filmler alınırken hata oluştu.');
  }
  const data = await response.json();
  return data.results;
}

// 2) Tüm film türlerini (genres) çekiyoruz
async function fetchAllGenres() {
  const url = `${BASE_URL}/genre/movie/list?language=en-US`;
  const response = await fetch(url, getFetchOptions());
  if (!response.ok) {
    throw new Error('Film türleri alınırken hata oluştu.');
  }
  const data = await response.json();
  return data.genres;
}

// 3) DOM elementlerine erişim (index.html'deki yer tutucular)
const refs = {
  imgBox: document.querySelector('.img-box'),
  movieTitle: document.querySelector('.upcoming-header-2'),
  releaseDateText: document.querySelector('.release-date-text'),
  voteSpans: document.querySelectorAll('.vote-span'), // [0]: vote_average, [1]: vote_count
  popularityText: document.querySelector('.popularity-text'),
  genreText: document.querySelector('.genre-text'),
  aboutText: document.querySelector('.upcoming-about-text'),
  addToLibraryBtn: document.querySelector('.upcoming-button'),
};

// 4) Seçilen film verilerini DOM'a render eden fonksiyon
function renderUpcomingMovie(movie, allGenres) {
  // Film görseli (poster) ayarı
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : './assets/images/no-poster.jpg';
  refs.imgBox.style.backgroundImage = `url(${posterPath})`;

  // Film başlığı
  refs.movieTitle.textContent = movie.title || 'No Title';

  // Çıkış tarihi
  refs.releaseDateText.textContent = movie.release_date || 'No Release Date';

  // Oy ortalaması ve oy sayısı
  if (refs.voteSpans.length >= 2) {
    refs.voteSpans[0].textContent = movie.vote_average
      ? movie.vote_average.toFixed(1)
      : '0.0';
    refs.voteSpans[1].textContent = movie.vote_count ? movie.vote_count : '0';
  }

  // Popülerlik bilgisi
  refs.popularityText.textContent = movie.popularity
    ? movie.popularity.toFixed(1)
    : '0.0';

  // Tür bilgisini (genre_ids'den tür ismine çevirme)
  const movieGenreNames = (movie.genre_ids || []).map(id => {
    const genre = allGenres.find(g => g.id === id);
    return genre ? genre.name : 'Unknown';
  });
  refs.genreText.textContent = movieGenreNames.join(', ') || 'No Genres';

  // Film hakkında (overview)
  refs.aboutText.textContent = movie.overview || 'No overview available.';

  // Add to Library Button (renderUpcomingMovie içinde)
  const addButton = document.createElement('button');
  addButton.textContent = 'Add to Library';
  addButton.classList.add('upcoming-button');
  addButton.dataset.movieId = movie.id; // Film ID'sini butona kaydediyoruz

  // Butonu ekleyelim (örneğin, film başlığının altına ekleyebiliriz)
  refs.movieTitle.appendChild(addButton);
}

// 5) Upcoming film verilerini çekip, aralarından rastgele bir tanesini seçerek render et
async function initUpcomingMovie() {
  try {
    // Hem film türlerini hem de upcoming filmleri paralel çekiyoruz
    const [allGenres, upcomingMovies] = await Promise.all([
      fetchAllGenres(),
      fetchUpcomingMovies(),
    ]);

    if (upcomingMovies.length > 0) {
      allMovies = upcomingMovies;

      // Rastgele bir film seçimi
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

document.body.addEventListener('click', function (e) {
  if (e.target.classList.contains('upcoming-button')) {
    const movieId = Number(e.target.dataset.movieId);

    const movie = getMovieById(movieId); // allMovies içinde bu ID'ye ait filmi bul
    if (!movie) return; // Film bulunamazsa işlem yapma
    if (movie) {
      let library = JSON.parse(localStorage.getItem('library')) || [];

      const movieIndex = library.findIndex(item => item.id === movie.id);

      if (movieIndex !== -1) {
        // Film zaten kütüphanede, o halde çıkartalım
        library.splice(movieIndex, 1);
        localStorage.setItem('library', JSON.stringify(library));
        e.target.textContent = 'Add to my Library';
        console.log("Film kütüphaneden kaldırıldı.");
      } else {
        // Film kütüphanede yok, ekleyelim
        library.push(movie);
        localStorage.setItem('library', JSON.stringify(library));
        e.target.textContent = 'Remove from My Library';
        console.log("Film kütüphaneye eklendi.");
        
      }
    }
  }
});
function getMovieById(id) {
  return allMovies.find(movie => movie.id === id);
}
