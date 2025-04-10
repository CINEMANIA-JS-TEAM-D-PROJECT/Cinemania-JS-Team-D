// modal.js

//import { updateLibrary } from './library';

// Modal açma/kapatma işlevleri
export function openModal(movie) {
  try {
    const modal = document.getElementById('movie-modal');
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = `
    <div class="modal-window">
        <button class="modal-btn-close" id="modal-close" type="button">
          <svg width="30" height="30">   
            <line
              x1="0.0"
              y1="9.5"
              x2="10.5"
              y2="20.5"
              stroke="#f87719"
              stroke-width="2"
            />
            <line
              x1="0.0"
              y1="20.5"
              x2="10.5"
              y2="9.5"
              stroke="#f87719"
              stroke-width="2"
            />
          </svg>
        </button>
        <img class="modal-film-poster" src="${
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'poster-placeholder.jpg'
        }"  alt="${movie.title} poster"/>
        <div class="modal-film-infos">
          <h3 class="modal-film-title">${movie.title}</h3>
          <table class="modal-film-stats">
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Vote / Votes</th>
              <td class="modal-film-tab-data">
                <span class="modal-window-accent-vote">${movie.vote_average.toFixed(
                  1
                )}</span>
                <span class="modal-window-accent-votes">${
                  movie.vote_count
                }</span>
              </td>
            </tr>
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Popularity</th>
              <td class="modal-film-tab-data">${movie.popularity.toFixed(
                1
              )}</td>
            </tr>
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Genre</th>
              <td class="modal-film-tab-data">${movie.genreNames}</td>
            </tr>
          </table>
          <h3 class="modal-film-desc-about">About</h3>
          <p class="modal-film-desc">${movie.overview}</p>
          <div class="modal-film-btns">
            <button class="watch-trailer-btn"}>Watch trailer</button> 
            <button id="library-actions-btn" type="submit">Add to my library</button>
          </div>
        </div>
      </div>
  `;

    modal.classList.add('show');

    // Kapatma düğmesi
    document
      .getElementById('modal-close')
      .addEventListener('click', closeModal);
    //Esc tuşuyla çıkış
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    });
    //Modal dışına tıklayınca kapatma
    modal.addEventListener('click', function (event) {
      if (event.target.closest('.modal-content')) {
        return;
      }
      closeModal();
    });

    //const watchTrailerBtn = document.querySelector('.watch-trailer-btn');
    //watchTrailerBtn.addEventListener('click', watchTrailer(movie.id));

    // Kütüphaneye ekleme butonu
    
    setupLibraryButton(movie);

    addLibraryBtn.addEventListener('click', () => {
      toggleLibrary(movie);
       setupLibraryButton(movie);
    });
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}


// LocalStorage'dan film ekle/çıkar
function toggleLibrary(movie) {
  const libraryKey = 'library';
  const storedLibrary = JSON.parse(localStorage.getItem(libraryKey)) || [];
  const index = storedLibrary.findIndex((item) => item.id === movie.id);
  const button = document.querySelector('#library-actions-btn');

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
  const button = document.querySelector('#library-actions-btn');
  const libraryKey = 'library';
  const storedLibrary = JSON.parse(localStorage.getItem(libraryKey)) || [];
  const isAlreadyInLibrary = storedLibrary.some((item) => item.id === movie.id);

  if (button) {
    button.textContent = isAlreadyInLibrary ? 'Remove from my library' : 'Add to my library';
    button.addEventListener('click', () => toggleLibrary(movie));
  }
}



export function closeModal() {
  const modal = document.getElementById('movie-modal');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
  // updateLibrary(false, true);
}
