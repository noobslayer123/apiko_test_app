const apiKey = "7d68842d2134729c0de231f97983f4c1";
const moviesHtml = document.getElementById("movies");
const input = document.getElementById("filter");
document.getElementById("button_search").addEventListener("click", () => {
  if (input.value !== "") {
    searchMovies();
    input.value = "";
  } else {
    showTrendingMovies();
  }
});
window.addEventListener("load", showTrendingMovies);

function showMovieDetails(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const { poster_path, overview, title } = data;

      let output = `<img src='https://image.tmdb.org/t/p/w500${poster_path}'/>
      <h2>${title}</h2><p>${overview}</p><h3>Recommendations</h3><div id='movie_rec'></div>`;
      movies.innerHTML = output;
      showRecomendations(id);
    })
    .catch(err => console.log(err));
}

function showRecomendations(id) {
  let output = "<ul class='movie'>";
  const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.results !== "") {
        data.results.forEach(movie => {
          output += `<li class="movie_rec"><a href='#' onClick='showMovieDetails(${
            movie.id
          })'>${movie.title}</a></li>`;
        });
      } else {
        output +=
          "<p class='movie_rec'>There are no recommendations for this movie.</p>";
      }
      output += "</ul>";
      movies.innerHTML += output;
    })
    .catch(err => console.log(err));
}

function showTrendingMovies() {
  let output = "<ul class='movie'>";
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.results.forEach(movie => {
        output += `<li class="movie_rec"><a href='#' onClick='showMovieDetails(${
          movie.id
        })'>${movie.title}</a></li>`;
      });
      output += "</ul>";
      movies.innerHTML = output;
    })
    .catch(err => console.log(err));
}

function searchMovies() {
  let output = "<ul class='movie'>";
  const query = document.getElementById("filter").value;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.results.forEach(movie => {
        output += `<li class="movie_rec"><a href='#' onClick='showMovieDetails(${
          movie.id
        })'>${movie.title}</a></li>`;
      });
      output += "</ul>";
      movies.innerHTML = output;
    })
    .catch(err => console.log(err));
}
