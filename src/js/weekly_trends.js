import { openModal, closeModal } from './modal.js';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDA5M2Y5MzcwZWVhYjYyZGRhZDEyMTViYTMzYzdkYyIsIm5iZiI6MTc0Mzc5MjUzNi41MTMsInN1YiI6IjY3ZjAyOTk4ZjVhODBhYTU0NTk5NTM5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kD8CV4_F8L2GVoP85qrIIvPuEascfTURrC1KNOeDj4Q',
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme'); // 'dark' veya 'light'
  const titleElement = document.querySelector('.title');

  if (theme === 'dark') {
    titleElement.style.color = 'black';
  } else if (theme === 'light') {
    titleElement.style.color = 'white';
  }
  return;
});

document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.getElementById('cards');
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
            '<svg class="star full"><use xlink:href="#icon-star"></use></svg>'
          ),
          ...Array(halfStar).fill(
            '<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'
          ),
          ...Array(emptyStars).fill(
            '<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>'
          ),
        ].join('');

        const card = document.createElement('div');
        card.className = 'card';
        card.style.backgroundImage = `url(${imageUrl})`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
        card.style.height = '574px';
        card.style.display = 'flex';
        card.style.alignItems = 'flex-end';
        card.style.padding = '10px';
        card.style.borderRadius = '10px';
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';

        card.innerHTML = `
          <div class="card-content">
             <h3 >${title}</h2>
             <p > ${releaseYear}</p>
           </div>
           <span class="star"> ${stars}</span>

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
