// import modal from './modal.js';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDA5M2Y5MzcwZWVhYjYyZGRhZDEyMTViYTMzYzdkYyIsIm5iZiI6MTc0Mzc5MjUzNi41MTMsInN1YiI6IjY3ZjAyOTk4ZjVhODBhYTU0NTk5NTM5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kD8CV4_F8L2GVoP85qrIIvPuEascfTURrC1KNOeDj4Q',
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.getElementById('cards');
  const loader = document.getElementById('loader-weekly');
  
  

  fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
    .then((res) => res.json())
    .then((data) => {
      const movies = data.results.slice(0, 3);

      cardContainer.innerHTML = '';
      loader.style.display = 'none';

      movies.forEach((movie) => {
        const imageUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://via.placeholder.com/500x750?text=No+Image';

        const title = movie.title || movie.name || 'Untitled';
        const releaseYear = (movie.release_date || movie.first_air_date || 'Unknown').split('-')[0];
        const rating = Math.round((movie.vote_average || 0) * 10) / 10;

        const card = document.createElement('div');
        card.className = 'card';
        card.style.backgroundImage = `url(${imageUrl})`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
        card.style.height = '574px';
        card.style.width = '395px';
        card.style.margin = '10px';
        card.style.color = 'white';
        card.style.display = 'flex';
        card.style.alignItems = 'flex-end';
        card.style.padding = '10px';
        card.style.borderRadius = '10px';
        card.style.position = 'relative';
        card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';

        card.innerHTML = `
          <div class="card-content" style="background: rgba(0,0,0,0.6); width: 100%; border-radius: 0 0 10px 10px;">
            <h2 style="margin: 0;">${title}</h2>
            <p>${releaseYear} | ⭐ ${rating}</p>
          </div>
        `;

        cardContainer.appendChild(card);
      });
    })
    .catch((err) => {
      console.error('Hata:', err);
      loader.innerText = 'Film verileri alınamadı.';
    });
});
