document.addEventListener('DOMContentLoaded', function() {
    let watchMovieButton = document.getElementById('watch-it');
    
    watchMovieButton.addEventListener('click', function() {
        // Envoyer un message au content script
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'fetchMovieData' });
        });
    });
});