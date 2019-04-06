document.getElementById("button_search").addEventListener("click", loadMovies);
document
  .getElementById("button_home")
  .addEventListener("click", getTrendingMovies);
window.addEventListener("load", getTrendingMovies, true);
const apiKey = "7d68842d2134729c0de231f97983f4c1";

function showMovieDetails(id) {
  const xhr = new XMLHttpRequest();
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  xhr.open("GET", url, true);
  xhr.onload = function() {
    if (this.status == 200) {
      const movie = JSON.parse(this.responseText);
      let output =
        '<div class="movie">' +
        "<img src='https://image.tmdb.org/t/p/w500" +
        movie.poster_path +
        "' />" +
        "<h2>" +
        movie.title +
        "</h2>" +
        "<p>" +
        movie.overview +
        "</p>" +
        "</div>" +
        "<h3>Recommendations</h3>" +
        "<div id='movie_rec></div>'";
      document.getElementById("movies").innerHTML = output;
    }
  };
  xhr.send();
  getRecommendations(id);
}
function getRecommendations(id) {
  const xhr = new XMLHttpRequest();
  const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`;
  xhr.open("GET", url, true);
  xhr.onload = function() {
    if (this.status == 200) {
      const movies = JSON.parse(this.responseText);
      let output = "";
      for (let i in movies.results) {
        output +=
          '<div class="movie_rec">' +
          "<ul>" +
          "<li>" +
          "<a href='#' onClick='showMovieDetails(" +
          movies.results[i].id +
          ")'>" +
          movies.results[i].title +
          " </a>" +
          " </li>" +
          "</ul>" +
          "</div>";
      }
      document.getElementById("movies").innerHTML += output;
    }
  };
  xhr.send();
}

function getTrendingMovies() {
  const xhr = new XMLHttpRequest();
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`;
  xhr.open("GET", url, true);
  xhr.onload = function() {
    if (this.status == 200) {
      const movies = JSON.parse(this.responseText);
      let output = "";
      for (let i in movies.results) {
        output +=
          '<div class="movie">' +
          "<ul>" +
          "<li>" +
          "<a href='#' onClick='showMovieDetails(" +
          movies.results[i].id +
          ")'>" +
          movies.results[i].title +
          " </a>" +
          " </li>" +
          "</ul>" +
          "</div>";
      }
      document.getElementById("movies").innerHTML = output;
    }
  };
  xhr.send();
}

function loadMovies() {
  const xhr = new XMLHttpRequest();
  const query = document.getElementById("filter").value;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
  xhr.open("GET", url, true);
  xhr.onload = function() {
    if (this.status == 200) {
      const movies = JSON.parse(this.responseText);
      let output = "";
      for (let i in movies.results) {
        output +=
          '<div class="movie">' +
          "<ul>" +
          "<li>" +
          "<a href='#' onClick='showMovieDetails(" +
          movies.results[i].id +
          ")'>" +
          movies.results[i].title +
          " </a>" +
          " </li>" +
          "</ul>" +
          "</div>";
      }
      document.getElementById("movies").innerHTML = output;
    }
  };
  xhr.send();
}
