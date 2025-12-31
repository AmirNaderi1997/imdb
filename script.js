const API_KEY = "aec50f5f";
const API_ROOT = "https://www.omdbapi.com/";

const trendingIds = [
  "tt0468569",
  "tt1375666",
  "tt0109830",
  "tt0110912",
  "tt0133093",
  "tt4154796",
  "tt0816692",
  "tt0111161",
  "tt0137523",
  "tt4154664",
  "tt0110413",
  "tt0167260",
  "tt0167261",
  "tt0120737",
  "tt0088763",
  "tt7286456",
  "tt4154756",
  "tt0993846",
  "tt1853728",
  "tt0080684",
  "tt4154796",
  "tt1877830",
  "tt2382320",
  "tt4154756"
];

const top250FallbackIds = [
  "tt0111161", "tt0068646", "tt0468569", "tt0071562", "tt0050083",
  "tt0108052", "tt0167260", "tt0110912", "tt0120737", "tt0060196",
  "tt0137523", "tt0109830", "tt0080684", "tt1375666", "tt0167261",
  "tt0133093", "tt0099685", "tt0073486", "tt0047478", "tt0114369",
  "tt0118799", "tt0102926", "tt0120815", "tt0120689", "tt0816692",
  "tt0245429", "tt0110413", "tt0054215", "tt0038650", "tt0047396",
  "tt0120586", "tt1675434", "tt2582802", "tt0172495", "tt0482571",
  "tt0407887", "tt0088763", "tt1853728", "tt0095765", "tt0021749",
  "tt0095327", "tt0103064", "tt0110357", "tt0253474", "tt0034583",
  "tt0910970", "tt0043014", "tt0076759", "tt0209144", "tt0078788",
  "tt0082971", "tt4633694", "tt5311514", "tt4154756", "tt4154796",
  "tt7286456", "tt1675434", "tt2382320", "tt1979320", "tt1856101",
  "tt0993846", "tt0081505", "tt0064116", "tt0056058", "tt0050825",
  "tt0053125", "tt0114709", "tt0090605", "tt8503618", "tt0087843",
  "tt0105236", "tt5311514", "tt0169547", "tt0112573", "tt0167404",
  "tt0032551", "tt0364569", "tt0033467", "tt0093058", "tt0338013",
  "tt0056172", "tt4154664", "tt1345836", "tt0105695", "tt0066921",
  "tt0082096", "tt0120735", "tt0086190", "tt0045152", "tt0057012",
  "tt0086879", "tt0022100", "tt0119698", "tt0116282", "tt0044741",
  "tt0086250", "tt0119217", "tt0118849", "tt0062622", "tt0017136",
  "tt0012349", "tt2106476", "tt0053604", "tt0361748", "tt4633694",
  "tt0097576", "tt0119488", "tt7286456", "tt0059578", "tt1832382",
  "tt0095016", "tt6966692", "tt0046438", "tt0061512", "tt8267604",
  "tt4154664", "tt10872600", "tt1065073", "tt0457430", "tt0046912",
  "tt1305806", "tt2267998", "tt1187043", "tt0208092", "tt0091763",
  "tt0414387", "tt0993846", "tt3170832", "tt0129167", "tt0055031",
  "tt0268978", "tt0055630", "tt0363163", "tt0892769", "tt4729430",
  "tt0338564", "tt0113277", "tt0107290", "tt0056592", "tt0040522",
  "tt4729430", "tt0046268", "tt0015864", "tt0353969", "tt1205489",
  "tt0107290", "tt0084787", "tt0112471", "tt0081398", "tt10272386",
  "tt0118715", "tt0109040", "tt0089881", "tt0209144", "tt5311514",
  "tt0077416", "tt0050976", "tt0050783", "tt0052311", "tt0112641",
  "tt0211915", "tt0075148", "tt0073195", "tt0117951", "tt0107048",
  "tt0046250", "tt0114746", "tt0058946", "tt0070735", "tt0367594",
  "tt0060107", "tt0080678", "tt0046912", "tt0042876", "tt0036775",
  "tt0036868", "tt0017925", "tt0087544", "tt0118849", "tt0099674",
  "tt0469494", "tt0266697", "tt0113247", "tt0477348", "tt0105151",
  "tt3011894", "tt1392214", "tt0083658", "tt0083922", "tt0041959",
  "tt1979320", "tt1392190", "tt0978762", "tt0060827", "tt0126029",
  "tt0065234", "tt0059578", "tt0015324", "tt0053198", "tt0092005",
  "tt0101414", "tt0110413", "tt0109831", "tt0986264", "tt1895587",
  "tt0154420", "tt0457430", "tt0091251", "tt0054331", "tt1255953",
  "tt1877830", "tt0071315", "tt0107207", "tt0115676", "tt0107290",
  "tt0363163", "tt0050986", "tt0047296", "tt1832382", "tt0107207",
  "tt0118715", "tt1255953", "tt1454029", "tt0266697", "tt1201607",
  "tt2562232", "tt0059742", "tt0061722", "tt0372784", "tt0055031",
  "tt0114388", "tt0469494", "tt0105695", "tt0411008", "tt1446714",
  "tt0434409", "tt0097165", "tt0057115", "tt1270797", "tt0033870",
  "tt0032976", "tt0107290", "tt0088247", "tt0067818", "tt0266697"
];

const upcomingIds = [
  "tt1757678", // Avatar 3
  "tt15239678", // Dune: Part Two
  "tt6263850", // Deadpool 3
  "tt11315808", // Joker: Folie à Deux
  "tt23429350", // Gladiator II
  "tt1878870", // Furiosa
  "tt11866324", // The Batman Part II (placeholder)
  "tt13186482", // Tron: Ares (placeholder)
  "tt2459156", // The Marvels-ish fallback
  "tt11145118" // Mission: Impossible - Dead Reckoning Part Two
];

let top250Ids = [];
let top250Index = 0;
const TOP250_CHUNK = 20;

let trendingPool = [];
let trendingPage = 0;

const refs = {
  searchForm: document.getElementById("search-form"),
  searchInput: document.getElementById("search-input"),
  resultsGrid: document.getElementById("results-grid"),
  resultsLabel: document.getElementById("results-label"),
  trendingGrid: document.getElementById("trending-grid"),
  refreshTrending: document.getElementById("refresh-trending"),
  loadMoreTrending: document.getElementById("load-more-trending"),
  top250Grid: document.getElementById("top250-grid"),
  moreTop250: document.getElementById("more-top250"),
  resetTop250: document.getElementById("reset-top250"),
  upcomingGrid: document.getElementById("upcoming-grid"),
  refreshUpcoming: document.getElementById("refresh-upcoming"),
  watchlistGrid: document.getElementById("watchlist-grid"),
  clearWatchlist: document.getElementById("clear-watchlist"),
  modal: document.getElementById("modal"),
  modalContent: document.getElementById("modal-content"),
  modalClose: document.getElementById("modal-close"),
  spotlightPoster: document.querySelector(".spotlight__poster"),
  spotlightTitle: document.getElementById("spotlight-title"),
  spotlightPlot: document.getElementById("spotlight-plot"),
  spotlightTrailer: document.getElementById("spotlight-trailer"),
  spotlightWatchlist: document.getElementById("spotlight-watchlist")
};

const storageKey = "cinescope_watchlist_v1";

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

function getWatchlist() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function setWatchlist(map) {
  localStorage.setItem(storageKey, JSON.stringify(map));
}

function inWatchlist(id) {
  return Boolean(getWatchlist()[id]);
}

function toggleWatchlist(movie) {
  const list = getWatchlist();
  if (list[movie.imdbID]) {
    delete list[movie.imdbID];
  } else {
    list[movie.imdbID] = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Poster: movie.Poster,
      Year: movie.Year,
      Plot: movie.Plot,
      Genre: movie.Genre
    };
  }
  setWatchlist(list);
  renderWatchlist();
  syncButtons();
}

function setSpotlightButton(movie) {
  if (!movie?.imdbID) return;
  const onList = inWatchlist(movie.imdbID);
  refs.spotlightWatchlist.textContent = onList ? "Remove from watchlist" : "Add to watchlist";
  refs.spotlightWatchlist.onclick = () => {
    toggleWatchlist(movie);
    setSpotlightButton(movie);
  };
}

async function api(params) {
  const url = new URL(API_ROOT);
  params.apikey = API_KEY;
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network error");
  const data = await res.json();
  if (data.Response === "False") throw new Error(data.Error || "No results");
  return data;
}

async function fetchById(imdbID, full = false) {
  return api({ i: imdbID, plot: full ? "full" : "short" });
}

async function searchTitles(query) {
  const base = await api({ s: query });
  const hits = base.Search?.slice(0, 10) || [];
  const detailed = await Promise.allSettled(
    hits.map((hit) => fetchById(hit.imdbID))
  );
  return detailed
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value);
}

async function fetchList(ids, full = false) {
  const detailed = await Promise.allSettled(ids.map((id) => fetchById(id, full)));
  return detailed.filter((r) => r.status === "fulfilled").map((r) => r.value);
}

function plotSnippet(movie) {
  const text = movie?.Plot && movie.Plot !== "N/A" ? movie.Plot : "Plot unavailable.";
  return text.length > 160 ? `${text.slice(0, 157)}…` : text;
}

function posterOrFallback(poster, title) {
  if (poster && poster !== "N/A") {
    return poster.startsWith("http://")
      ? poster.replace("http://", "https://")
      : poster;
  }
  const bg = encodeURIComponent("#0c1016");
  const txt = encodeURIComponent(title || "Movie");
  return `https://via.placeholder.com/600x900/${bg}/ffffff?text=${txt}`;
}

function youtubeTrailerUrl(title, year) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${title} ${year || ""} trailer`
  )}`;
}

function createCard(movie, context) {
  const card = document.createElement("article");
  card.className = "card";
  const genres = (movie.Genre && movie.Genre !== "N/A" ? movie.Genre.split(",").slice(0, 3) : []).map((g) => g.trim());
  card.innerHTML = `
    <div class="card__poster">
      <img src="${posterOrFallback(movie.Poster, movie.Title)}" alt="${movie.Title} poster" loading="lazy">
    </div>
    <div class="card__body">
      <div class="pill-badge">${movie.Year || "—"}</div>
      <div class="card__title">${movie.Title}</div>
      <div class="tag"><span>Rated</span> <strong>${movie.Rated || "N/A"}</strong></div>
      <div class="tag"><span>IMDB</span> <strong>${movie.imdbRating || "—"}</strong></div>
      ${genres.length ? `<div class="genres">${genres.map((g) => `<span class="genre-chip">${g}</span>`).join("")}</div>` : ""}
      <p class="card__plot">${plotSnippet(movie)}</p>
      <div class="card__footer">
        <div class="card__actions">
          <button class="small-btn js-details" data-id="${movie.imdbID}">Details</button>
          <button
            class="small-btn js-watch"
            data-id="${movie.imdbID}"
            data-title="${movie.Title || ""}"
            data-year="${movie.Year || ""}"
            data-poster="${posterOrFallback(movie.Poster, movie.Title)}"
            data-plot="${plotSnippet(movie)}"
            data-genre="${movie.Genre || ""}"
            data-context="${context}"
          ></button>
        </div>
        <a class="small-btn" href="${youtubeTrailerUrl(
          movie.Title,
          movie.Year
        )}" target="_blank" rel="noopener">Trailer ↗</a>
      </div>
    </div>
  `;
  return card;
}

function renderGrid(list, gridEl, context) {
  gridEl.innerHTML = "";
  if (!list.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Nothing yet. Try searching or refreshing picks.";
    gridEl.appendChild(empty);
    return;
  }
  const frag = document.createDocumentFragment();
  list.forEach((movie) => frag.appendChild(createCard(movie, context)));
  gridEl.appendChild(frag);
  syncButtons();
}

function appendCards(list, gridEl, context) {
  if (!list.length) return;
  const frag = document.createDocumentFragment();
  list.forEach((movie) => frag.appendChild(createCard(movie, context)));
  gridEl.appendChild(frag);
  syncButtons();
}

async function renderTrending(loadMore = false) {
  if (!loadMore) {
    trendingPool = shuffle(trendingIds);
    trendingPage = 0;
    refs.trendingGrid.innerHTML = "";
  }
  const start = trendingPage * 6;
  const picks = trendingPool.slice(start, start + 6);
  trendingPage += 1;
  if (!picks.length) {
    appendCards([], refs.trendingGrid, "trending");
    return;
  }
  try {
    const movies = await fetchList(picks);
    if (loadMore) {
      appendCards(movies, refs.trendingGrid, "trending");
    } else {
      renderGrid(movies, refs.trendingGrid, "trending");
    }
  } catch (e) {
    refs.trendingGrid.innerHTML = `<p class="muted">Trending unavailable: ${e.message}</p>`;
  }
}

async function renderTop250(reset = false) {
  if (reset || !top250Ids.length) {
    top250Ids = shuffle(top250FallbackIds);
    top250Index = 0;
    refs.top250Grid.innerHTML = "";
  }
  const slice = top250Ids.slice(top250Index, top250Index + TOP250_CHUNK);
  top250Index += slice.length;
  if (!slice.length) return;
  const movies = await fetchList(slice);
  appendCards(movies, refs.top250Grid, "top250");
}

async function renderUpcoming() {
  try {
    const movies = await fetchList(shuffle(upcomingIds).slice(0, 6));
    renderGrid(movies, refs.upcomingGrid, "upcoming");
  } catch (e) {
    refs.upcomingGrid.innerHTML = `<p class="muted">Upcoming unavailable: ${e.message}</p>`;
  }
}

async function renderSpotlight() {
  refs.spotlightPoster.classList.add("skeleton");
  refs.spotlightTitle.textContent = "Loading…";
  refs.spotlightPlot.textContent = "Fetching a standout film for you.";
  try {
    const id = trendingIds[Math.floor(Math.random() * trendingIds.length)];
    const movie = await fetchById(id, true);
    refs.spotlightPoster.classList.remove("skeleton");
    refs.spotlightPoster.innerHTML = `<img src="${posterOrFallback(
      movie.Poster,
      movie.Title
    )}" alt="${movie.Title} poster">`;
    refs.spotlightTitle.textContent = movie.Title;
    refs.spotlightPlot.textContent = movie.Plot || "Plot unavailable.";
    refs.spotlightTrailer.href = youtubeTrailerUrl(movie.Title, movie.Year);
    setSpotlightButton(movie);
    syncButtons();
  } catch (e) {
    refs.spotlightPlot.textContent = `Spotlight unavailable: ${e.message}`;
  }
}

async function handleSearch(e) {
  e.preventDefault();
  const q = refs.searchInput.value.trim();
  if (!q) return;
  refs.resultsLabel.textContent = `Searching for “${q}”…`;
  refs.resultsGrid.innerHTML = "";
  try {
    const movies = await searchTitles(q);
    if (!movies.length) {
      refs.resultsLabel.textContent = `No matches for “${q}”.`;
      renderGrid([], refs.resultsGrid, "search");
      return;
    }
    refs.resultsLabel.textContent = `Results for “${q}”`;
    renderGrid(movies, refs.resultsGrid, "search");
  } catch (err) {
    refs.resultsLabel.textContent = `Error: ${err.message}`;
  }
}

function renderWatchlist() {
  const list = Object.values(getWatchlist());
  renderGrid(list, refs.watchlistGrid, "watchlist");
}

async function showDetails(imdbID) {
  try {
    const movie = await fetchById(imdbID, true);
    refs.modalContent.innerHTML = `
      <div class="modal__grid">
        <div class="modal__poster">
          <img src="${posterOrFallback(movie.Poster, movie.Title)}" alt="${movie.Title} poster">
        </div>
        <div class="modal__meta">
          <p class="pill-badge">${movie.Year} · ${movie.Runtime || "—"}</p>
          <h2>${movie.Title}</h2>
          <p class="muted">${movie.Genre || ""}</p>
          <p style="line-height:1.6;margin:12px 0;">${movie.Plot || "No synopsis available."}</p>
          <div class="tag"><span>IMDB</span> <strong>${movie.imdbRating || "—"}</strong></div>
          <div class="tag"><span>Director</span> <strong>${movie.Director || "—"}</strong></div>
          <div class="spotlight__actions" style="margin-top:14px;">
            <button
              class="pill js-watch"
              data-id="${movie.imdbID}"
              data-context="modal"
              data-title="${movie.Title || ""}"
              data-year="${movie.Year || ""}"
              data-poster="${posterOrFallback(movie.Poster, movie.Title)}"
              data-plot="${plotSnippet(movie)}"
              data-genre="${movie.Genre || ""}"
            >Watchlist</button>
            <a class="ghost pill" target="_blank" rel="noopener" href="${youtubeTrailerUrl(
              movie.Title,
              movie.Year
            )}">Open trailer ↗</a>
          </div>
        </div>
      </div>
    `;
    refs.modal.classList.remove("hidden");
    syncButtons();
  } catch (e) {
    alert(`Unable to load details: ${e.message}`);
  }
}

function syncButtons() {
  const list = getWatchlist();
  document.querySelectorAll(".js-watch").forEach((btn) => {
    const id = btn.dataset.id;
    const onList = Boolean(list[id]);
    btn.textContent = onList ? "Remove" : "Watchlist";
  });
}

function attachDelegates() {
  document.body.addEventListener("click", (e) => {
    const cardEl = e.target.closest(".card");
    const clickedAction = e.target.closest(".small-btn, .pill, a");
    if (cardEl && !clickedAction) {
      const detailsBtn = cardEl.querySelector(".js-details");
      if (detailsBtn) {
        showDetails(detailsBtn.dataset.id);
        return;
      }
    }
    const detailBtn = e.target.closest(".js-details");
    if (detailBtn) {
      showDetails(detailBtn.dataset.id);
      return;
    }
    const watchBtn = e.target.closest(".js-watch");
    if (watchBtn) {
      const title = watchBtn.dataset.title || watchBtn.closest(".card")?.querySelector(".card__title")?.textContent || "";
      const year = watchBtn.dataset.year || watchBtn.closest(".card")?.querySelector(".pill-badge")?.textContent || "";
      const poster = watchBtn.dataset.poster || watchBtn.closest(".card")?.querySelector("img")?.src || "";
      const plot = watchBtn.dataset.plot || watchBtn.closest(".card")?.querySelector(".card__plot")?.textContent || "";
      const genre = watchBtn.dataset.genre || watchBtn.closest(".card")?.querySelector(".genres")?.textContent || "";
      toggleWatchlist({
        imdbID: watchBtn.dataset.id,
        Title: title,
        Year: year,
        Poster: poster,
        Plot: plot,
        Genre: genre
      });
    }
  });

  refs.modalClose.addEventListener("click", () => {
    refs.modal.classList.add("hidden");
  });
  refs.modal.addEventListener("click", (e) => {
    if (e.target === refs.modal) refs.modal.classList.add("hidden");
  });
}

function attachEvents() {
  refs.searchForm.addEventListener("submit", handleSearch);
  refs.refreshTrending.addEventListener("click", renderTrending);
  refs.loadMoreTrending.addEventListener("click", () => renderTrending(true));
  refs.moreTop250.addEventListener("click", () => renderTop250(false));
  refs.resetTop250.addEventListener("click", () => renderTop250(true));
  refs.refreshUpcoming.addEventListener("click", renderUpcoming);
  refs.clearWatchlist.addEventListener("click", () => {
    setWatchlist({});
    renderWatchlist();
    syncButtons();
  });
}

function init() {
  attachEvents();
  attachDelegates();
  renderTrending();
  renderTop250(true);
  renderUpcoming();
  renderSpotlight();
  renderWatchlist();
}

init();
