const params = new URLSearchParams(window.location.search);
const imdbID = params.get("id");

const apiKey = "2d3766f5";
const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const downloadBtn = document.getElementById("downloadBtn");

        downloadBtn.addEventListener("click", function () {

            const poster = document.querySelector(".poster");

            html2canvas(poster, {
                scale: 3,
                useCORS: true
            }).then(canvas => {

                const link = document.createElement("a");

                link.download = "movie-poster.png";

                link.href = canvas.toDataURL("image/png");

                link.click();

            });

        });

        document.getElementById("movieTitle").innerHTML =
            `${data.Title.toUpperCase()} <span class="year">${data.Year}</span>`;

        document.getElementById("movieRuntime").textContent =
            data.Runtime.toUpperCase();

        document.getElementById("movieDirector").textContent =
            data.Director.toUpperCase();

        const posterImg = document.getElementById("moviePoster");
        posterImg.crossOrigin = "anonymous";
        posterImg.src = data.Poster;

        document.getElementById("movieGenre").innerHTML =
            data.Genre
                .split(", ")
                .map(genre => genre.toUpperCase())
                .join("&nbsp;&nbsp;&nbsp;&nbsp;");

        document.getElementById("movieActors").innerHTML =
            data.Actors
                .split(", ")
                .slice(0, 3)
                .map(actor => actor.toUpperCase())
                .join("&nbsp;&nbsp;&nbsp;&nbsp;");
    });