const tren = document.querySelector(".trending");
const btn = document.querySelector("button");
const TVswitch = document.getElementById("TV");
const TendancesSwitch = document.getElementById("Tend");
const TendancesPerson = document.querySelector(".trendingPerson");
const DaySwitch = document.getElementById("Day");
const WeekSwitch = document.getElementById("Week");


let trending = [];
let trendingTv = [];
let SwitchPerson = "week";
let TrendingPerson = [];



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
    <img src="${info.poster_path ? 'https://image.tmdb.org/t/p/w500' + info.poster_path : '/assets/img/nopict.webp'}" alt="photo de ${info.title}">
</div>
<div class="profile-meta">
    <p class="name">${info.name === undefined ? info.title : info.name}</p>
    <div id="canvas" class="${
    info.vote_average === 0 ? "grey" : info.vote_average > 6 ? "green" : 
    (info.vote_average >= 4 && info.vote_average < 6) ? "orange" : "red"
  }">${info.vote_average === 0? "": Math.floor(info.vote_average * 10).toFixed(0)}</div>
</div>
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

  // FetchDisplayTv();
}

window.addEventListener("load", FetchTREN(), FetchTV(), FetchDiscovery());

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
//!******************************************************************* DISCOVERY
async function FetchDiscovery() {
  await fetch(
    "https://api.themoviedb.org/3/trending/person/" +SwitchPerson+ "?api_key=dc4fa11dbb0888468121f0e93ac98077"
  )
    .then((res) => res.json())
    .then((data) => trendingPerson = data.results);


    DisplayDiscovery()

}

function DisplayDiscovery() {
  TendancesPerson.innerHTML = trendingPerson
    .map(
      (info) =>
        `
    <div class="card">
    <div class="card-popular">
    <div class="profile-popular">
    <img src="https://image.tmdb.org/t/p/w500${
      info.profile_path

    }" alt="photo de ${info.name}" > 
</div>
<div class="profile-meta">
    <p class="name">${info.name === undefined ? info.title : info.name}</p>
</div>
    </div>
    </div>
    </div>
  `
    )
    .join("");
};

DaySwitch.addEventListener('click', (e) =>{
  e.preventDefault();
  SwitchPerson  = "day";
  FetchDiscovery()
});


WeekSwitch.addEventListener('click', (e) =>{
  e.preventDefault();
  SwitchPerson  = "week";
  FetchDiscovery()
});

//!******************************************************************* DISCOVER
// async function FetchDiscoveryT() {
//   await fetch(
//     "https://api.themoviedb.org/3/trending/movie/day?api_key=dc4fa11dbb0888468121f0e93ac98077"
//   )
//     .then((res) => res.json())
//     .then((data) =>  console.log(data));


// }
// FetchDiscoveryT() 