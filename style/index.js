const tren = document.querySelector(".trending");
const content = document.querySelector(".content");
const btn = document.querySelector("button");
const topMovie = document.querySelector(".movies-trending");
const inputSearch = document.getElementById("inputSearch");
const TVswitch = document.getElementById("TV");
const TendancesSwitch = document.getElementById("Tend");

let trending = [];
let trendingTv = [];
let peoplesearch = "Ana de Armas";
let idPeople = "";
let People = "";
let date1 = new Date();
console.log(date1);

async function FetchPeople() {
  await fetch(
    "https://api.themoviedb.org/3/search/person?api_key=dc4fa11dbb0888468121f0e93ac98077&language=en-US&query=" +
      peoplesearch
  )
    .then((res) => res.json())
    .then((data) => (idPeople = data.results[0].id));

  console.log(idPeople);
  FetchPeopleDetails();
}

async function FetchPeopleDetails() {
  await fetch(
    "https://api.themoviedb.org/3/person/" +
      idPeople +
      "?api_key=dc4fa11dbb0888468121f0e93ac98077&language=en-US&query="
  )
    .then((res) => res.json())
    .then((data) => (People = data));

  console.log(People);
}

function FetchDisplayPeople() {
  content.innerHTML = People = `
        <div class="search">
        <div class="Profile">
        <img src="https://image.tmdb.org/t/p/w500${
          People.profile_path
        }" alt="drapeau" id="pp"> 
        <p>Age :${People.birthday - date1} </p>
        <p>Née :${People.birthday} </p>
    </div>
        <div class="Details">
        <h3>${People.name}</h3>
        <p>${People.biography}</p>
        </div>
        </div>
      `;
  id = "";
}

inputSearch.addEventListener("input", (e) => {
  peoplesearch = e.target.value;
  FetchPeople();
});

btn.addEventListener("click", () => {
  topMovie.classList.add("visiblity");

  FetchDisplayPeople();
});

async function FetchTREN() {
  await fetch(
    "https://api.themoviedb.org/3/trending/all/day?api_key=dc4fa11dbb0888468121f0e93ac98077&page=1"
  )
    .then((res) => res.json())
    .then((data) => (trending = data.results));

  FetchDisplay();
}

function FetchDisplay() {
  tren.innerHTML = trending
    .map(
      (info) =>
        `
    <div class="card">
    <div class="card-popular">
    <div class="profile-popular">
    <img src="https://image.tmdb.org/t/p/w500${
      info.poster_path
    }" alt="photo de ${info.name}" > 
</div>
<div class="profile-meta">
    <p class="name">${info.name === undefined ? info.title : info.name}</p>
    <div id="canvas" class="${
      info.vote_average === 0 ? "" : info.vote_average > 6 ? "green" : "red"
    }">${
          info.vote_average === 0
            ? "unrated"
            : Math.floor(info.vote_average * 10).toFixed(0)
        }</div>
</div>
    </div>
    </div>
    </div>
  `
    )
    .join("");
}

async function FetchTV() {
  await fetch(
    "https://api.themoviedb.org/3/tv/popular?api_key=dc4fa11dbb0888468121f0e93ac98077"
  )
    .then((res) => res.json())
    .then((data) => (trendingTv = data.results));

  FetchDisplay();
  console.log(trendingTv);
  // FetchDisplayTv();
}

window.addEventListener("load", FetchTREN(), FetchPeople(), FetchTV());

TVswitch.addEventListener("click", (e) => {
  e.preventDefault();
  trending = trendingTv;
  FetchTV();
});

Tend.addEventListener("click", (e) => {
  e.preventDefault();
  trendingTV = trending;
  FetchTREN();
});
