const apiKey = "7d68842d2134729c0de231f97983f4c1";
const moviesHtml = document.getElementById("movies");
const input = document.getElementById("filter");
const movie = new AppLibrary();
const urlTrend = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

window.addEventListener("load", movieGet(urlTrend));
document.getElementById("button_search").addEventListener("click", () => {
  if (input.value !== "") {
    searchMovies();
    input.value = "";
  } else {
    showTrendingMovies();
  }
});

function movieGet(url) {
  movie
    .get(url)
    .then(({ results }) => showTrendingMovies(results, moviesHtml))
    .catch(err => console.log(err));
}

function showTrendingMovies(list, container) {
  const listHtml = list
    .map(item => {
      return `<li data-id="${item.id}">${item.title}</li>`;
    })
    .join("");

  container.innerHTML = listHtml;
  container.addEventListener("click", evt => {
    const node = evt.target.closest("li");
    if (!node) {
      return;
    }
    showMovieDetails(node.dataset.id);
  });
}

function showMovieDetails(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const { poster_path, overview, title } = data;

      let output = `
        <div id="about">
          <img src='https://image.tmdb.org/t/p/w500${poster_path}'/>
          <h2>${title}</h2><p>${overview}</p><h3>Recommendations</h3>
        </div>
      `;
      moviesHtml.innerHTML = output;
      showRecomendations(id);
    })
    .catch(err => console.log(err));
}

function showRecomendations(id) {
  let output = "<ul class='movie'>";
  const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`;
  fetch(url)
    .then(res => res.json())
    .then(({ results }) => {
      if (results !== "") {
        results.forEach(movie => {
          output += `<li class="movie_rec"><a href='#' onClick='showMovieDetails(${
            movie.id
          })'>${movie.title}</a></li>`;
        });
      } else {
        output +=
          "<p class='movie_rec'>There are no recommendations for this movie.</p>";
      }
      output += "</ul>";
      moviesHtml.innerHTML += output;
    })
    .catch(err => console.log(err));
}

// function showTrendingMovies() {
//   let output = "";
//   const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
//   fetch(url)
//     .then(res => res.json())
//     .then(({ results }) => {
//       results.forEach(movie => {
//         output += `<div class='movie-container'>
//         <a  href='#' onClick='showMovieDetails(${
//           movie.id
//         })'><img class='poster' src='https://image.tmdb.org/t/p/w500${
//           movie.poster_path
//         }'/></a>${movie.title}</div>`;
//       });

//       moviesHtml.innerHTML = output;
//     })
//     .catch(err => console.log(err));
// }

function searchMovies() {
  let output = "";
  const query = document.getElementById("filter").value;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
  fetch(url)
    .then(res => res.json())
    .then(({ results }) => {
      results.forEach(movie => {
        output += `<div class='movie-container'>
        <a  href='#' onClick='showMovieDetails(${
          movie.id
        })'><img class='poster' src='https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }'/></a>${movie.title}</div>`;
      });

      moviesHtml.innerHTML = output;
    })
    .catch(err => console.log(err));
}
