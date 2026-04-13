document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('watch-it');

    // Récupérer l’onglet actif
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const url = tabs[0].url;

        console.log("URL détectée :", url);

        let mode = null;

        if (url.includes("/film/")) {
            mode = "film";
        } 
        else if (url.includes("/watchlist/")) {
            mode = "watchlist";
        } 
        else {
            mode = "invalid";
        }

        // Adapter UI selon mode
        setupUI(mode);

        button.addEventListener('click', function () {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'handleMode',
                mode: mode
            });
        });
    });
});

function setupUI(mode) {
    const title = document.querySelector("h1");
    const button = document.getElementById("watch-it");

    if (mode === "film") {
        title.innerText = "Film détecté";
        button.innerText = "Voir ce film";
    }

    else if (mode === "watchlist") {
        title.innerText = "Watchlist détectée";
        button.innerText = "Choisir un film aléatoire";
    }

    else {
        title.innerText = "Page non supportée";
        button.innerText = "Impossible ici";
        button.disabled = true;
    }
}