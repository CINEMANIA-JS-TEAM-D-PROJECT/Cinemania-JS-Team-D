// modal.js

// Modal açma/kapatma işlevleri
export function openModal(movie) {
  const modal = document.getElementById('movie-modal');
  const modalContent = document.getElementById('modal-content');

  modalContent.innerHTML = `
    <div class="modal-header">
      <h2>${movie.title}</h2>
      <span class="modal-close" id="modal-close">×</span>
    </div>
    <div class="modal-body">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <p>${movie.overview}</p>
    </div>
  `;

  modal.classList.add('show');

  // Kapatma düğmesi
  document.getElementById('modal-close').addEventListener('click', closeModal);
}

export function closeModal() {
  const modal = document.getElementById('movie-modal');
  modal.classList.remove('show');
}
