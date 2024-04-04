// Función para cargar y mostrar películas favoritas
function loadFavoriteMovies() {
    const storedFavoriteMovies = localStorage.getItem('favoriteMovies');
    const main = document.getElementById('main');
    if (storedFavoriteMovies) {
        const favoriteMovies = JSON.parse(storedFavoriteMovies);
        if (favoriteMovies.length > 0) {
            main.innerHTML = '';
            favoriteMovies.forEach(movie => {
                const { title, poster_path, vote_average, overview, id } = movie;
                const movieEl = document.createElement('div');
                movieEl.classList.add('movie');
                movieEl.innerHTML = `
                    <img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${title}">
                    <div class="movie-info">
                        <h3>${title}</h3>
                        <span class="${getColor(vote_average)}">${vote_average}</span>
                    </div>
                    <div class="overview">
                        <h3>Overview</h3>
                        ${overview}
                        <br/> 
                        <button class="know-more" id="${id}">Know More</button>
                        <button class="remove-favorite" id="fav_${id}">Remove from Favorites</button>
                    </div>
                `;
                main.appendChild(movieEl);
  
                // Agregar evento para eliminar de favoritos
                const removeFavoriteBtn = document.getElementById(`fav_${id}`);
                removeFavoriteBtn.addEventListener('click', () => {
                    const updatedFavoriteMovies = favoriteMovies.filter(favMovie => favMovie.id !== id);
                    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavoriteMovies));
                    loadFavoriteMovies();
                });
  
                // Agregar evento para abrir detalles
                document.getElementById(id).addEventListener('click', () => {
                    openNav(movie);
                });
            });
        } else {
            main.innerHTML = '<p>No favorite movies found.</p>';
        }
    } else {
        main.innerHTML = '<p>No favorite movies found.</p>';
    }
  }
  
  // Llamar a la función para cargar películas favoritas al cargar la página
  loadFavoriteMovies();