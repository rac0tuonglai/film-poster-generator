const results = document.getElementById("results");
const searchButton = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");
searchButton.addEventListener("click", function () {
    const movieName = movieInput.value;
    const apiKey = "2d3766f5";
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`;
    fetch(url)
            .then(response => response.json())
            .then(data => {
                results.innerHTML = "";
                if (data.Response === "False") {
                    results.innerHTML = "<p>No movies found.</p>";
                    return;
                }
                data.Search.forEach(function(movie) {
                    const movieCard = document.createElement("div");
                    movieCard.addEventListener("click", function () {
                        window.location.href = `poster.html?id=${movie.imdbID}`;
                    });
                    movieCard.classList.add("movie-card");
                    movieCard.innerHTML = `
                        <img src="${movie.Poster}" alt="${movie.Title}">
                        <h3>${movie.Title}</h3>
                        <p>${movie.Year}</p>
                    `;
                    results.appendChild(movieCard);
                });
            });
});