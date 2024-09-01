// Écouteur de messages du popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'fetchMovieData') {
        // Récupération de l'élément contenant le nom du film
        let filmNameElement = document.querySelector('.name.js-widont.prettify');

        if (filmNameElement) {
            let filmName = filmNameElement.innerText.trim();
            const headers = {
                "Accept": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDIxYzJkZjE1ZmEzZjFjODY2MzhmNzhkMTc3NWVmMCIsInN1YiI6IjYzMzY5YmU1Y2JhMzZmMDA5YTQxOTE3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RI7HArwasRdK7Db92106s4Th6dq-SeI0rn73vN5Olgw"
            };
            const urlFilm = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(filmName)}`;

            fetch(urlFilm, { headers })
                .then(response => response.json())
                .then(parsedData => {
                    if (parsedData.results.length > 0) {
                        const firstId = parsedData.results[0].id;
                        console.log("Le premier id est :", firstId);

                        // Construire l'URL de la vidéo
                        const urlVideo = `https://vidsrc.cc/embed/movie/${firstId}`;

                        // Ouvrir la vidéo dans un nouvel onglet
                        window.open(urlVideo, '_blank');
                    } else {
                        console.error("Aucun résultat trouvé pour le nom du film.");
                    }
                })
                .catch(error => {
                    console.error("Une erreur est survenue :", error);
                });
        } else {
            alert('Impossible de trouver le nom du film sur cette page.');
        }
    }
});