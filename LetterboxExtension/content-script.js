chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.action !== 'handleMode') return;

    if (request.mode === 'film') {
        handleFilmPage();
    }

    else if (request.mode === 'watchlist') {
        handleWatchlistPage();
    }

    else {
        alert("Cette page n'est ni un film ni une watchlist.");
    }
});


function handleFilmPage() {
    let filmNameElement = document.querySelector('.name.js-widont.prettify');

    if (!filmNameElement) {
        alert("Film introuvable.");
        return;
    }

    let filmName = filmNameElement.innerText.trim();

    const headers = {
        "Accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDIxYzJkZjE1ZmEzZjFjODY2MzhmNzhkMTc3NWVmMCIsInN1YiI6IjYzMzY5YmU1Y2JhMzZmMDA5YTQxOTE3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RI7HArwasRdK7Db92106s4Th6dq-SeI0rn73vN5Olgw"
    };

    const urlFilm = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(filmName)}`;

    fetch(urlFilm, { headers })
        .then(res => res.json())
        .then(data => {
            if (data.results.length > 0) {
                const id = data.results[0].id;
                const urlVideo = `https://vidsrc.win/watch/${id}`;
                window.open(urlVideo, '_blank');
            } else {
                alert("Aucun film trouvé.");
            }
        })
        .catch(error => {
            console.error("Une erreur est survenue :", error);
        });
}

function handleWatchlistPage() {
    const items = document.querySelectorAll('li.griditem');

    if (!items.length) {
        alert("Aucun film trouvé dans la watchlist.");
        return;
    }

    const films = [];

    items.forEach(item => {
        const component = item.querySelector('.react-component');

        if (!component) return;

        const link = component.getAttribute('data-item-link');
        const name = component.getAttribute('data-item-full-display-name');
        const filmId = component.getAttribute('data-film-id');

        if (link) {
            films.push({
                url: "https://letterboxd.com" + link,
                name,
                id: filmId
            });
        }
    });

    if (films.length === 0) {
        alert("Impossible d'extraire les films.");
        return;
    }

    const randomFilm = films[Math.floor(Math.random() * films.length)];

    console.log("Film sélectionné :", randomFilm);

    window.location.href = randomFilm.url;

}