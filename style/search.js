const content = document.querySelector(".content");
const filterContainer = document.querySelector(".filter-container")
const topMovie = document.querySelector(".movies-trending");
const topPerson = document.querySelector(".trendingOnPerson");
const inputSearch = document.getElementById("inputSearch");
const Credits = document.querySelector(".Credits");

let peoplesearch = "Ana de Armas";
let idPeople = "";
let People = "";
let Credit = [];

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
  let birthday = People.birthday;
  let age = ~~((Date.now() - new Date(birthday)) / 31557600000);


  content.innerHTML = People = `
  <div class="search-wrap">
          <div class="search">
          <div class="Profile">
          <img src="https://image.tmdb.org/t/p/w500${People.profile_path}" alt="drapeau" id="pp"> 
          <p>Age : ${age} </p>
          <p>Née : ${People.birthday} </p>
      </div>
          <div class="Details">
          <h3>${People.name}</h3>
          <p>${People.biography}</p>
          </div>
          </div>
          </div>
        `;
}





inputSearch.addEventListener("input", (e) => {
  peoplesearch = e.target.value;
  FetchPeople();
  FetchCreditMovies()
});

btn.addEventListener("click", () => {
  topMovie.classList.add("visiblity");
  topPerson.classList.add("visiblity");
  filterContainer.classList.add("visiblity");

  FetchDisplayPeople();
});

window.addEventListener("load", FetchPeople(),);


//*********************Movie Credit */

async function FetchCreditMovies() {
  await fetch(
    "https://api.themoviedb.org/3/person/224513/movie_credits?api_key=dc4fa11dbb0888468121f0e93ac98077&language=en-US"
  )
    .then((res) => res.json())
    .then((data) =>  Credit = data.cast);

console.log(Credit)
    DisplayCarousel()
 
}

function DisplayCarousel() {
  Credits.innerHTML =Credit.map(
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