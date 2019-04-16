const movie = new AppLibrary();
const apiKey = `?api_key=7d68842d2134729c0de231f97983f4c1`;
const container = document.getElementById("movies");
const input = document.getElementById("filter");
const urlBase = `https://api.themoviedb.org/3/`;
const urlTrending = `https://api.themoviedb.org/3/trending/movie/day${apiKey}`;

movieGet = (urlGet, func) => {
  movie
    .get(urlGet)
    .then(data => {
      func(data);
    })
    .catch(err => console.log(err));
};

const UICtrl = {
  // `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
  showMovies: ({ results }) => {
    const listHtml = results
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
      const url = `${urlBase}movie/${node.dataset.id}${apiKey}`;
      movieGet(url, UICtrl.showMovieDetails);
    });
  },
  // `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  showMovieDetails: ({ id, title }) => {
    url = `${urlBase}movie/${id}/recommendations${apiKey}`;
    const listHtml = `<p data-id="${id}">${title}</p>`;
    container.innerHTML = listHtml;
    movieGet(url, UICtrl.showRecomendations);
  },
  //`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`;
  showRecomendations: ({ results }) => {
    const listHtml = results
      .map(item => {
        return `<li data-id="${item.id}">${item.title}</li>`;
      })
      .join("");

    container.innerHTML += listHtml;
    container.addEventListener("click", evt => {
      const node = evt.target.closest("li");
      if (!node) {
        return;
      }
      const url = `${urlBase}movie/${node.dataset.id}${apiKey}`;
      movieGet(url, UICtrl.showMovieDetails);
    });
  }
  // `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
  // searchMovies: list => {
  //   const query = document.getElementById("filter").value;
  //   const listHtml = movieGet(url)
  //     .map(item => {
  //       return `<li data-id="${item.id}">${item.title}</li>`;
  //     })
  //     .join("");

  //   container.innerHTML = listHtml;
  //   container.addEventListener("click", evt => {
  //     const node = evt.target.closest("li");
  //     if (!node) {
  //       return;
  //     }
  //     showMovieDetails(node.dataset.id);
  //   });
  // }
};

appInit = (() => {
  movieGet(urlTrending, UICtrl.showMovies);
})();

document.getElementById("button_search").addEventListener("click", () => {
  if (input.value !== "") {
    searchMovies();
    input.value = "";
  } else {
    movieGet(urlTrending, UICtrl.showMovies);
  }
});

// window.addEventListener("load", () => {
//   console.log("Application initialization..");
//   movieGet(, UICtrl.showMovies);
// });
