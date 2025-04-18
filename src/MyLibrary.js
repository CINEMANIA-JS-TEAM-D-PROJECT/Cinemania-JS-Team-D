import { openModal } from './js/modal.js';

// Global değişkenler
let currentMovies = []; // tüm filmler
let displayedMovies = 0; // şu ana kadar görüntülenen filmler
const moviesPerPage = 9;
const genreMap = {}; // Genre ID-Name eşleşmelerini saklayacak bir obje

document.addEventListener('DOMContentLoaded', () => {
  loadMoviesFromLibrary();

  // Genre filtresi için event listener'ları ayarla
  const genreSelect = document.getElementById('genre-filter');
  if (genreSelect) {
    // İlk tıklamada API'den türleri çek
    let genresFetched = false;

    genreSelect.addEventListener('click', () => {
      // Eğer türler henüz çekilmediyse
      if (!genresFetched) {
        fetchGenres();
        genresFetched = true;
      }
    });

    // Change event listener'ı ekle
    genreSelect.addEventListener('change', e => {
      const selectedGenre = e.target.value;
      filterMoviesByGenre(selectedGenre);
    });
  }

  // Load more butonu için event listener
  const loadMoreBtn = document.getElementById('load-more');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      renderMovies(currentMovies, true);
    });
  }
  // ✅ Modal açmak için film kartına tıklama listener'ı
  document.addEventListener('click', event => {
    const card = event.target.closest('.movie-card-library');
    if (card) {
      const movieId = card.querySelector('.remove-btn').getAttribute('data-id');
      const movie = currentMovies.find(m => m.id == movieId);
      if (movie) {
        openModal(movie);
      } else {
        return;
      }
    }
  });
});

// API'den türleri çek
function fetchGenres() {
  const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=3c5d79694d82b9e1fe6883553a34fc2d`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const genres = data.genres;
      const genreSelect = document.getElementById('genre-filter');

      // Tüm seçenekleri temizle
      genreSelect.innerHTML = '';

      // "Tüm Filmler" seçeneğini ekle
      const allOption = document.createElement('option');
      allOption.value = 'all';
      allOption.textContent = 'Genre';
      allOption.selected = true;
      genreSelect.appendChild(allOption);

      // API'den gelen türleri ekle
      genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);

        // Genre ID-Name eşleşmesini sakla
        genreMap[genre.id] = genre.name;
      });

      // Genre map'i localStorage'a kaydet
      localStorage.setItem('genreMap', JSON.stringify(genreMap));

      // Kütüphanedeki filmlere genre isimlerini ekleyerek yeniden yükle
      updateMovieGenres();
    })
    .catch(error => {
      console.error('Error fetching genres:', error);
    });
}

// Kütüphanedeki filmlere genre isimlerini ekle
function updateMovieGenres() {
  let library = JSON.parse(localStorage.getItem('library')) || [];

  // Genre ID'leri isimlerle eşleştir
  library = library.map(movie => {
    if (movie.genre_ids && Array.isArray(movie.genre_ids)) {
      // TMDB API'dan gelen filmlerde genre_ids var
      const genreNames = movie.genre_ids
        .map(id => genreMap[id] || 'Bilinmeyen')
        .join(', ');
      return { ...movie, genre: genreNames };
    } else if (movie.genre && !isNaN(movie.genre)) {
      // Eğer genre bir ID ise, isimle değiştir
      return { ...movie, genre: genreMap[movie.genre] || 'Bilinmeyen' };
    }
    return movie;
  });
  // Güncel verileri göster
  currentMovies = library;
  displayedMovies = 0;
  renderMovies(library, false);
  // Güncellenmiş kütüphaneyi kaydet
  localStorage.setItem('library', JSON.stringify(library));
}
const genreSelect = document.getElementById('genre-select');
const genreContainer = document.getElementById('filter-name');
export function renderMovies(movies, loadMore = false) {
  const movieContainer = document.getElementById('movie-list-library');
  if (!movieContainer) {
    console.error("'movie-list-library' ID'li element bulunamadı!");
    return;
  }

  if (movies.length === 0) {
    movieContainer.innerHTML = `<div class="message-btn-library" >
      <p class ="no-movies-message">OOPS... We are very sorry! You don’t have any movies at your library.</p>
      <button id="go-to-catalog" class="search-btn-library">Search movie</button>
    </div>
  `;

    if (genreContainer) {
      genreContainer.style.display = 'none';
    }
    if (genreSelect) {
      genreSelect.style.display = 'none';
    }
    const searchBtn = document.getElementById('go-to-catalog');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        window.location.href = 'catalog.html';
      });
    }
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
      loadMoreBtn.style.display = 'none';
    }
    return;
  }
  if (genreContainer) {
    genreContainer.style.display = 'block';
  }

  const startIndex = loadMore ? displayedMovies : 0;
  const endIndex = Math.min(startIndex + moviesPerPage, movies.length);
  const moviesToShow = movies.slice(startIndex, endIndex);

  // Film varsa ekle
  if (!loadMore) {
    movieContainer.innerHTML = ''; // önce temizle (loadMore değilse)
  }
  const fragment = document.createDocumentFragment();

  moviesToShow.forEach(movie => {
    const posterUrl =
      movie.poster || `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const title = movie.title;
    const year = movie.release_date
      ? movie.release_date.slice(0, 4)
      : 'Yıl yok';
    const genre = movie.genre || 'Kategori belirtilmemiş';
    const rating = movie.vote_average || 0;
    const id = movie.id;

   

    let starsHTML = '';
    if (rating >= 8.5) {
      starsHTML = `<img src="./img/star5.png" alt="5 stars" class="star-icon"/>`;
    } else if (rating >= 6.5) {
      starsHTML = `<img src="./img/half4.png" alt="4.5 stars" class="star-icon"/>`;
    } else if (rating >= 4) {
      starsHTML = `<img src="./img/half3.png" alt="3.5 stars" class="star-icon"/>`;
    }

    const movieCardHTML = `
      <div class="movie-card-library" data-genre="${genre}">
        <img src="${posterUrl}" alt="${title}" class="movie-poster-library">
        <div class="movie-info-library">
          <h3 class="movie-title-library">${title} (${year})</h3>
          <div class="movie-rating-library">${starsHTML}</div>
          <p class="movie-genre">${genre}</p>
        </div>

        <button class="remove-btn" data-id="${id}">Kaldır</button>
      </div>
    `;
    fragment.appendChild(
      document.createRange().createContextualFragment(movieCardHTML)
    );
  });
  displayedMovies = endIndex;
  movieContainer.appendChild(fragment);

  // Load More butonunun görünürlüğünü kontrol et
  const loadMoreBtn = document.getElementById('load-more');
  if (loadMoreBtn) {
    if (displayedMovies >= movies.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }
  }
}

// Kaldırma butonları
const removeButtons = document.querySelectorAll('.remove-btn');
removeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const movieId = button.getAttribute('data-id');
    removeMovie(movieId);
  });
});

// Filmleri türe göre filtrele
function filterMoviesByGenre(genreId) {
  if (genreId === 'all') {
    displayedMovies = 0;
    renderMovies(currentMovies, false);
    return;
  }

  // ID veya isim ile filtreleme (esneklik için)
  const filtered = currentMovies.filter(movie => {
    // Genre bir dizi veya string olabilir
    if (typeof movie.genre === 'string') {
      // Filmde birden fazla tür olabileceğinden içerikte arama yap
      return movie.genre.includes(genreMap[genreId]) || movie.genre === genreId;
    } else if (Array.isArray(movie.genre_ids)) {
      return movie.genre_ids.includes(Number(genreId));
    }
    return false;
  });

  displayedMovies = 0;
  renderMovies(filtered, false);
}

// Filme kütüphaneye kaydet
function saveMovieToLibrary(movie) {
  // Film zaten ekli mi kontrol et
  if (!library.some(m => m.id === movie.id)) {
    library.push(movie);
    localStorage.setItem('library', JSON.stringify(library));
  }
}

// Filmi kütüphaneden kaldır
function removeMovie(movieId) {
  let library = JSON.parse(localStorage.getItem('library')) || [];
  library = library.filter(movie => movie.id != movieId);
  localStorage.setItem('library', JSON.stringify(library));

  // Güncel listeyi göster
  currentMovies = library;

  // Film silindikten sonra güncellenmiş listeyi render et
  renderMovies(library, false);
}

// Kütüphaneden filmleri yükle
function loadMoviesFromLibrary() {
  const library = JSON.parse(localStorage.getItem('library')) || [];
  currentMovies = library;
  displayedMovies = 0;
  renderMovies(library, false);
}
