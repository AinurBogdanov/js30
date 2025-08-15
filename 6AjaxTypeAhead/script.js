const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let isSearchByLoc = false;
const searchContainer = document.querySelector('.search-holder');
const cities = [];
let searchEl = document.querySelector('.search');
const searchBtn = document.querySelector('.search-btn');
const inputsCont = document.querySelector('.inputs');
const toggleSearchBtn = document.querySelector('.toggle-search');
const distanceInputsHTML = `
    <input
      type="text"
      class="distance-input mb4 js-lat-input"
      placeholder="latitude"
    />
    <input
      type="text"
      class="distance-input js-lon-input"
      placeholder="longitude"
    />
    `;
const nameInputHTML = `<input type="text" class="search" placeholder="City or State" />`;

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

if (toggleSearchBtn) {
  toggleSearchBtn.addEventListener('click', toggleSearch);
}

if (searchEl) {
  searchEl.addEventListener('change', displayMatches);
  searchEl.addEventListener('keyup', displayMatches);
}
if (searchBtn) {
  searchBtn.addEventListener('click', searchByLoc);
}

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}
function displayMatches() {
  const matchArr = findMatches(this.value, cities);
  const html = matchArr
    .map((place) => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );

      return `
    <li> 
      <span class="name">${cityName} ${stateName}</span>
      <span class="population">${numberWithCommas(place.population)}</span>
    </li>
    `;
    })
    .join('');
  document.querySelector('.suggestions').innerHTML = html;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
function toggleSearch(e) {
  e.preventDefault();

  console.log('toggle');
  isSearchByLoc = !isSearchByLoc;
  if (isSearchByLoc) {
    inputsCont.innerHTML = distanceInputsHTML;
    searchBtn.style.display = 'block';
  } else {
    inputsCont.innerHTML = nameInputHTML;
    searchEl = document.querySelector('.search');
    if (searchEl) {
      searchEl.addEventListener('change', displayMatches);
      searchEl.addEventListener('keyup', displayMatches);
    }
    searchBtn.style.display = 'none';
  }
}
function searchByLoc(e) {
  e.preventDefault();
  const latInput = document.querySelector('.js-lat-input');
  const lonInput = document.querySelector('.js-lon-input');

  const nearest = findNearest(latInput.value, lonInput.value, cities);
  displayNearest(nearest); //distance name state
}

function findNearest(lat, lon, cities, limit = 5) {
  const citiesWithDistance = cities.map((city) => ({
    ...city,
    distance: getDistance(lat, lon, city.latitude, city.longitude),
  }));

  return citiesWithDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}
function displayNearest(nearest) {
  const html = nearest
    .map((place) => {
      return `
    <li> 
      <span class="name">${place.city} ${place.state}</span>
      <span class="distance">${formatDistance(place.distance) + 'm'}</span>
    </li>
    `;
    })
    .join('');

  document.querySelector('.suggestions').innerHTML = html;
}

function formatDistance(km) {
  const meters = km * 1000;
  return Math.round(meters * 100) / 100;
}
