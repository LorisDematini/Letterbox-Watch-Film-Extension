// ─── Auto-injection ────────────────────────────────────────────────────────
if (window.location.href.includes('/watchlist/')) {
    injectSidebarStyles();
    injectWatchlistSidebar();
}

if (window.location.href.match(/letterboxd\.com\/film\/[^/]+\/?$/)) {
    injectSidebarStyles();
    injectFilmSidebar();
}

// ─── Listener popup extension ──────────────────────────────────────────────
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action !== 'handleMode') return;
    if (request.mode === 'film')           handleFilmPage();
    else if (request.mode === 'watchlist') document.getElementById('lb-pick-btn')?.click();
    else                                   alert("Cette page n'est ni un film ni une watchlist.");
});

// ─── Styles injectés dans la page Letterboxd uniquement ───────────────────
function injectSidebarStyles() {
    if (document.getElementById('lb-styles')) return;

    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.id = 'lb-styles';
    style.textContent = `
        .lb-sidebar {
            position: fixed !important;
            top: 50% !important;
            right: 0 !important;
            transform: translateY(-50%) !important;
            width: 260px !important;
            background: #111 !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
            border-right: none !important;
            border-radius: 16px 0 0 16px !important;
            box-shadow: -8px 0 40px rgba(0,0,0,0.6) !important;
            z-index: 99999 !important;
            font-family: 'DM Sans', sans-serif !important;
            color: #fff !important;
            transition: transform 0.4s cubic-bezier(0.4,0,0.2,1) !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
        }
        .lb-sidebar.lb-hidden {
            transform: translateY(-50%) translateX(110%) !important;
        }
        .lb-sidebar-tab {
            position: fixed !important;
            top: 50% !important;
            right: 0 !important;
            transform: translateY(-50%) !important;
            writing-mode: vertical-rl !important;
            background: #ff8000 !important;
            color: #000 !important;
            font-family: 'DM Sans', sans-serif !important;
            font-weight: 500 !important;
            font-size: 11px !important;
            letter-spacing: 0.1em !important;
            padding: 14px 8px !important;
            border-radius: 8px 0 0 8px !important;
            cursor: pointer !important;
            z-index: 99998 !important;
            user-select: none !important;
            display: none !important;
            transition: background 0.2s !important;
        }
        .lb-sidebar-tab:hover              { background: #e67300 !important; }
        .lb-sidebar-tab.lb-tab-visible     { display: block !important; }
        .lb-sidebar .lb-header {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            padding: 18px 20px 14px !important;
            border-bottom: 1px solid rgba(255,255,255,0.07) !important;
        }
        .lb-sidebar .lb-title {
            font-family: 'DM Serif Display', serif !important;
            font-size: 17px !important;
            color: #fff !important;
            margin: 0 !important;
        }
        .lb-sidebar .lb-title span         { color: #ff8000 !important; }
        .lb-sidebar .lb-close {
            background: rgba(255,255,255,0.06) !important;
            border: none !important;
            color: #888 !important;
            width: 26px !important;
            height: 26px !important;
            border-radius: 50% !important;
            cursor: pointer !important;
            font-size: 12px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            transition: all 0.2s !important;
        }
        .lb-sidebar .lb-close:hover        { background: rgba(255,255,255,0.12) !important; color: #fff !important; }
        .lb-sidebar .lb-body               { padding: 20px !important; }
        .lb-sidebar .lb-subtitle {
            font-size: 12px !important;
            color: #555 !important;
            margin: 0 0 16px !important;
            font-weight: 300 !important;
            line-height: 1.5 !important;
        }
        .lb-sidebar .lb-poster-wrap {
            border-radius: 10px !important;
            overflow: hidden !important;
            margin-bottom: 14px !important;
            aspect-ratio: 2/3 !important;
            background: #1e1e1e !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }
        .lb-sidebar .lb-poster-wrap img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            display: block !important;
        }
        .lb-sidebar .lb-poster-placeholder { font-size: 40px !important; color: #333 !important; }
        .lb-sidebar .lb-film-name {
            font-family: 'DM Serif Display', serif !important;
            font-size: 16px !important;
            line-height: 1.3 !important;
            margin-bottom: 6px !important;
            color: #fff !important;
        }
        .lb-sidebar .lb-film-year {
            font-size: 12px !important;
            color: #555 !important;
            margin-bottom: 14px !important;
        }
        .lb-sidebar .lb-main-btn {
            width: 100% !important;
            background: #ff8000 !important;
            color: #000 !important;
            border: none !important;
            border-radius: 8px !important;
            padding: 11px 16px !important;
            font-family: 'DM Sans', sans-serif !important;
            font-size: 13px !important;
            font-weight: 500 !important;
            cursor: pointer !important;
            transition: all 0.2s !important;
            box-sizing: border-box !important;
            margin-bottom: 8px !important;
        }
        .lb-sidebar .lb-main-btn:hover:not(:disabled) {
            background: #e67300 !important;
            transform: translateY(-1px) !important;
            box-shadow: 0 4px 16px rgba(255,128,0,0.35) !important;
        }
        .lb-sidebar .lb-main-btn:disabled  { opacity: 0.5 !important; cursor: not-allowed !important; }
        .lb-sidebar .lb-actions            { display: flex !important; gap: 8px !important; }
        .lb-sidebar .lb-btn {
            flex: 1 !important;
            background: rgba(255,255,255,0.06) !important;
            color: #ccc !important;
            border: 1px solid rgba(255,255,255,0.1) !important;
            border-radius: 8px !important;
            padding: 9px 10px !important;
            font-family: 'DM Sans', sans-serif !important;
            font-size: 12px !important;
            cursor: pointer !important;
            transition: all 0.2s !important;
            text-decoration: none !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 5px !important;
        }
        .lb-sidebar .lb-btn:hover          { background: rgba(255,255,255,0.1) !important; color: #fff !important; }
        .lb-sidebar .lb-divider {
            height: 1px !important;
            background: rgba(255,255,255,0.06) !important;
            margin: 16px 0 !important;
        }
        .lb-sidebar .lb-result {
            animation: lb-in 0.3s ease !important;
        }
        @keyframes lb-in {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// ─── Sidebar film ──────────────────────────────────────────────────────────
function injectFilmSidebar() {
    if (document.getElementById('lb-film-sidebar')) return;

    const sidebar = document.createElement('div');
    sidebar.id = 'lb-film-sidebar';
    sidebar.className = 'lb-sidebar';
    sidebar.innerHTML = `
        <div class="lb-header">
            <div class="lb-title">Voir ce <span>film</span></div>
            <button class="lb-close" title="Fermer">✕</button>
        </div>
        <div class="lb-body">
            <p class="lb-subtitle">Disponible en streaming via vidsrc.</p>
            <button class="lb-main-btn" id="lb-watch-btn">▶ &nbsp;Regarder le film</button>
        </div>
    `;
    document.body.appendChild(sidebar);

    const tab = document.createElement('div');
    tab.className = 'lb-sidebar-tab';
    tab.textContent = '▶ Regarder';
    document.body.appendChild(tab);

    sidebar.querySelector('.lb-close').addEventListener('click', () => {
        sidebar.classList.add('lb-hidden');
        tab.classList.add('lb-tab-visible');
    });
    tab.addEventListener('click', () => {
        sidebar.classList.remove('lb-hidden');
        tab.classList.remove('lb-tab-visible');
    });

    document.getElementById('lb-watch-btn').addEventListener('click', handleFilmPage);
}
// ─── Sidebar watchlist ─────────────────────────────────────────────────────
function injectWatchlistSidebar() {
    if (document.getElementById('lb-watchlist-sidebar')) return;

    const sidebar = document.createElement('div');
    sidebar.id = 'lb-watchlist-sidebar';
    sidebar.className = 'lb-sidebar';
    sidebar.innerHTML = `
        <div class="lb-header">
            <div class="lb-title">Film <span>aléatoire</span></div>
            <button class="lb-close" title="Fermer">✕</button>
        </div>
        <div class="lb-body">
            <p class="lb-subtitle">Trop de films dans ta watchlist&nbsp;? Laisse le destin décider.</p>
            <button class="lb-main-btn" id="lb-pick-btn">🎲 &nbsp;Choisir un film</button>
            <div id="lb-result" style="display:none;" class="lb-result">
                <div class="lb-divider"></div>
                <div class="lb-poster-wrap" id="lb-poster-wrap" style="cursor:pointer;" title="Voir sur Letterboxd"></div>
                <div class="lb-film-name" id="lb-film-name"></div>
                <button class="lb-main-btn" id="lb-watch-btn">▶ &nbsp;Regarder le film</button>
                <button class="lb-btn" style="width:100%; margin-top:8px;" id="lb-reroll">↺ Reroll</button>
            </div>
        </div>
    `;
    document.body.appendChild(sidebar);

    const tab = document.createElement('div');
    tab.className = 'lb-sidebar-tab';
    tab.textContent = '🎲 Aléatoire';
    document.body.appendChild(tab);

    sidebar.querySelector('.lb-close').addEventListener('click', () => {
        sidebar.classList.add('lb-hidden');
        tab.classList.add('lb-tab-visible');
    });
    tab.addEventListener('click', () => {
        sidebar.classList.remove('lb-hidden');
        tab.classList.remove('lb-tab-visible');
    });

    let cachedFilms = null;
    let currentFilm = null;

    async function pickRandom() {
        const btn = document.getElementById('lb-pick-btn');
        btn.textContent = '⏳ Chargement…';
        btn.disabled = true;

        if (!cachedFilms) cachedFilms = await getAllWatchlistFilms();

        btn.disabled = false;
        btn.innerHTML = '🎲 &nbsp;Choisir un film';

        if (!cachedFilms.length) { btn.textContent = 'Aucun film trouvé'; return; }

        currentFilm = cachedFilms[Math.floor(Math.random() * cachedFilms.length)];

        document.getElementById('lb-film-name').textContent = currentFilm.name || 'Titre inconnu';
        document.getElementById('lb-poster-wrap').innerHTML = `<div class="lb-poster-placeholder">⏳</div>`;
        document.getElementById('lb-watch-btn').disabled = true;
        document.getElementById('lb-result').style.display = 'block';

        const poster = await fetchFilmPoster(currentFilm.url);
        document.getElementById('lb-poster-wrap').innerHTML = poster
            ? `<img src="${poster}" alt="${currentFilm.name}">`
            : `<div class="lb-poster-placeholder">🎬</div>`;

        document.getElementById('lb-watch-btn').disabled = false;
    }

    document.getElementById('lb-pick-btn').addEventListener('click', pickRandom);
    document.getElementById('lb-reroll').addEventListener('click', pickRandom);

    // Clic poster → page Letterboxd
    document.getElementById('lb-poster-wrap').addEventListener('click', () => {
        if (currentFilm?.url) window.open(currentFilm.url, '_blank');
    });

    // Clic regarder → lance le film
    document.getElementById('lb-watch-btn').addEventListener('click', async () => {
        if (!currentFilm) return;
        const btn = document.getElementById('lb-watch-btn');
        btn.textContent = '⏳ Chargement…';
        btn.disabled = true;

        const tmdbId = await fetchTmdbId(currentFilm.url);

        btn.innerHTML = '▶ &nbsp;Regarder le film';
        btn.disabled = false;

        if (tmdbId) {
            window.open(`https://vidsrc.win/watch/${tmdbId}`, '_blank');
        } else {
            alert('Impossible de trouver le film sur vidsrc.');
        }
    });
}

async function fetchTmdbId(filmUrl) {
    try {
        const html = await fetch(filmUrl).then(r => r.text());
        const doc  = new DOMParser().parseFromString(html, 'text/html');
        const tmdbLink = doc.querySelector('a[href*="themoviedb.org/movie/"]');
        return tmdbLink?.href.match(/\/movie\/(\d+)/)?.[1] ?? null;
    } catch (e) {
        console.error('Erreur fetch TMDB ID :', e);
        return null;
    }
}

// ─── Récupère le poster depuis la page du film ────────────────────────────
async function fetchFilmPoster(filmUrl) {
    try {
        const html = await fetch(filmUrl).then(r => r.text());

        // Trouve toutes les URLs ltrbxd avec dimensions dans l'URL
        const matches = [...html.matchAll(
            /https:\/\/a\.ltrbxd\.com\/resized\/[^"'\s]+?0-(\d+)-0-(\d+)-crop[^"'\s]*/g
        )];

        // Garde uniquement les portraits (hauteur > largeur) = posters
        const poster = matches.find(m => parseInt(m[2]) > parseInt(m[1]));

        if (poster) {
            return poster[0].replace(/0-\d+-0-\d+-crop/, '0-500-0-750-crop');
        }

        return null;
    } catch (e) {
        console.error('Erreur fetch poster :', e);
        return null;
    }
}


// ─── Récupération de tous les films de la watchlist ────────────────────────
async function getAllWatchlistFilms() {
    const baseUrl    = window.location.href.replace(/\/page\/\d+\/?$/, '').replace(/\/$/, '');
    const totalPages = getTotalPages();

    const results = await Promise.all(
        Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
            const url = page === 1 ? `${baseUrl}/` : `${baseUrl}/page/${page}/`;
            return fetch(url)
                .then(r => r.text())
                .then(html => extractFilmsFromDoc(new DOMParser().parseFromString(html, 'text/html')))
                .catch(() => []);
        })
    );
    return results.flat();
}

function getTotalPages() {
    let max = 1;
    document.querySelectorAll('.paginate-pages a').forEach(link => {
        const match = link.href.match(/\/page\/(\d+)\/?$/);
        if (match) max = Math.max(max, parseInt(match[1]));
    });
    return max;
}

function extractFilmsFromDoc(doc) {
    const films = [];
    doc.querySelectorAll('li.griditem').forEach(item => {
        const component = item.querySelector('.react-component');
        if (!component) return;
        const link = component.getAttribute('data-item-link');
        const name = component.getAttribute('data-item-full-display-name');
        const id   = component.getAttribute('data-film-id');
        if (link) films.push({ url: 'https://letterboxd.com' + link, name, id });
    });
    return films;
}

// ─── Film page (ouverture lecteur) ─────────────────────────────────────────
function handleFilmPage() {
    const tmdbLink = document.querySelector('a[href*="themoviedb.org/movie/"]');
    if (tmdbLink) {
        const tmdbId = tmdbLink.href.match(/\/movie\/(\d+)/)?.[1];
        if (tmdbId) { window.open(`https://vidsrc.win/watch/${tmdbId}`, '_blank'); return; }
    }

    const filmNameElement = document.querySelector('.name.js-widont.prettify');
    if (!filmNameElement) { alert('Film introuvable.'); return; }

    const filmName = filmNameElement.innerText.trim();
    const filmYear = document.querySelector('.releaseyear a')?.innerText.trim() ?? null;

    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDIxYzJkZjE1ZmEzZjFjODY2MzhmNzhkMTc3NWVmMCIsInN1YiI6IjYzMzY5YmU1Y2JhMzZmMDA5YTQxOTE3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RI7HArwasRdK7Db92106s4Th6dq-SeI0rn73vN5Olgw'
    };

    fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(filmName)}${filmYear ? `&year=${filmYear}` : ''}`, { headers })
        .then(r => r.json())
        .then(data => {
            if (!data.results?.length) { alert('Aucun film trouvé.'); return; }
            const match = filmYear ? data.results.find(m => m.release_date?.startsWith(filmYear)) : null;
            window.open(`https://vidsrc.win/watch/${(match ?? data.results[0]).id}`, '_blank');
        })
        .catch(err => console.error('Erreur :', err));
}