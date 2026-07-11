const results = document.getElementById("results");
const searchButton = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");
const suggestions = document.getElementById("suggestions");
movieInput.addEventListener("input", function () {
    const movieName = movieInput.value.trim();
    if (movieName.length < 2) {
        suggestions.style.display = "none";
        return;
    }
    const apiKey = "2d3766f5";
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            suggestions.innerHTML = "";
            if (data.Response === "False") {
                suggestions.style.display = "none";
                return;
            }
            data.Search.slice(0, 5).forEach(function(movie) {
                const suggestion = document.createElement("div");
                suggestion.classList.add("suggestion");
                suggestion.textContent = `${movie.Title} (${movie.Year})`;
                suggestion.addEventListener("click", function () {
                    movieInput.value = movie.Title;
                    suggestions.style.display = "none";
                    searchButton.click();
                });
                suggestions.appendChild(suggestion);
            });
            suggestions.style.display = "block";
        });
});
movieInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchButton.click();
    }

});
searchButton.addEventListener("click", function () {
    const movieName = encodeURIComponent(movieInput.value);
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
