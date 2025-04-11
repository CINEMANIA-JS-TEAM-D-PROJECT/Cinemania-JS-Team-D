import { openModal, closeModal } from './modal.js';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDA5M2Y5MzcwZWVhYjYyZGRhZDEyMTViYTMzYzdkYyIsIm5iZiI6MTc0Mzc5MjUzNi41MTMsInN1YiI6IjY3ZjAyOTk4ZjVhODBhYTU0NTk5NTM5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kD8CV4_F8L2GVoP85qrIIvPuEascfTURrC1KNOeDj4Q',
  },
};

const genreMap = {
  28: 'Aksiyon',
  12: 'Macera',
  16: 'Animasyon',
  35: 'Komedi',
  80: 'Suç',
  99: 'Belgesel',
  18: 'Drama',
  10751: 'Aile',
  14: 'Fantastik',
  36: 'Tarih',
  27: 'Korku',
  10402: 'Müzik',
  9648: 'Gizem',
  10749: 'Romantik',
  878: 'Bilim Kurgu',
  10770: 'TV Film',
  53: 'Gerilim',
  10752: 'Savaş',
  37: 'Vahşi Batı',
};

function getGenreNames(genreIds) {
  return genreIds
    .map(id => genreMap[id])
    .filter(name => name)
    .slice(0, 2); // En fazla 2 tür göster
}

document.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme'); // 'dark' veya 'light'
  const titleElement = document.querySelector('.weekly-title');
  const cardContainer = document.getElementById('weekly-cards');
  const loader = document.getElementById('loader-weekly');

  
  fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
    .then(res => res.json())
    .then(data => {
      const movies = data.results.slice(0, 3);
      cardContainer.innerHTML = '';
      loader.style.display = 'none';

      movies.forEach(movie => {
        const imageUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://via.placeholder.com/500x750?text=No+Image';

        const title = movie.title || movie.name || 'Untitled';
        const genres = getGenreNames(movie.genre_ids).join(', ');
        const releaseYear = (
          movie.release_date ||
          movie.first_air_date ||
          'Unknown'
        ).split('-')[0];
        const rating = Math.round((movie.vote_average || 0) * 10) / 10;

        const maxStars = 5;
        const fullStars = Math.floor(rating / 2);
        const halfStar = rating % 2 >= 1 ? 1 : 0;
        const emptyStars = maxStars - fullStars - halfStar;

        const stars = [
          ...Array(fullStars).fill(
            '<svg class="star-weekly full"><use xlink:href="#icon-star"></use></svg>'
          ),
          ...Array(halfStar).fill(
            '<svg class="star-weekly half"><use xlink:href="#icon-star-half"></use></svg>'
          ),
          ...Array(emptyStars).fill(
            '<svg class="star-weekly empty"><use xlink:href="#icon-star-outline"></use></svg>'
          ),
        ].join('');

        const card = document.createElement('div');
        card.className = 'card-weekly';
        card.style.backgroundImage = `url(${imageUrl})`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
        card.style.display = 'none';
        card.style.display = 'flex';
        card.style.alignItems = 'flex-end';
        card.style.borderRadius = '10px';
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.style.boxShadow =
          ' linear-gradient(180deg, rgba(0, 0, 0, 0) 63.48%, rgba(0, 0, 0, 0.9) 92.16%)';

        card.innerHTML = `
          <div class="card-weekly-content">
             <h3 >${title}</h3>
             <p >${genres} | ${releaseYear}</p>
           </div>
           <span class="star-weekly"> ${stars}</span>

         `;
        cardContainer.appendChild(card);

        card.addEventListener('click', () => {
          openModal(movie);
        });
      });
    })
    .catch(err => {
      console.error('Error fetching data:', err);
      cardContainer.innerHTML = '<p>Error loading movies.</p>';
      loader.style.display = 'none';
    });
});
