const lowercontent = document.querySelector(".lower-content");
const filterContainer = document.querySelector(".filter-container");
const SearchCarousel = document.querySelector(".search-carousel");
const topMovie = document.querySelector(".movies-trending");
const topPerson = document.querySelector(".trendingOnPerson");
const inputSearch = document.getElementById("inputSearch");
const searchCarousel = document.querySelector(".search-carousel");
const lowerContent2 = document.querySelector(".lower-content2")

let peoplesearch = "";
let idPeople = "";
let People = [];
let Movie = "";
let SearchMovie = [];
let Credit = [];

async function FetchPeople() {
  await fetch(
    "https://api.themoviedb.org/3/search/person?api_key=dc4fa11dbb0888468121f0e93ac98077&language=en-US&query=" +
      peoplesearch
  )
    .then((res) => res.json())
    .then((data) => (idPeople = data.results[0].id));
  FetchPeopleDetails();
}

async function FetchPeopleDetails() {
  await fetch(
    "https://api.themoviedb.org/3/person/" +
      idPeople +
      "?api_key=dc4fa11dbb0888468121f0e93ac98077&language=en-US&query="
  )
    .then((res) => res.json())
    .then((data) => (People = data))
    
    console.log(People);
}

function FetchDisplayPeople() {
  let birthday = People.birthday;
  let age = ~~((Date.now() - new Date(birthday)) / 31557600000);


  lowercontent.innerHTML = People = `
  <div class="search-wrap">
          <div class="search">
          <div class="Profile">
          <img src="https://image.tmdb.org/t/p/w500${People.profile_path}" alt="drapeau" id="pp"> 
          <p>Date de Naissance : </p>
          <p>${People.birthday} (${age}ans)</p>
      </div>
          <div class="Details">
          <h3>${People.name}</h3>
          <p>${People.biography}</p>
          </div>
          </div>
          </div>
        `;
}



async function FetchCreditMovies() {
  await fetch(
    "https://api.themoviedb.org/3/person/" +idPeople+ "/movie_credits?api_key=dc4fa11dbb0888468121f0e93ac98077&language=en-US"
  )
    .then((res) => res.json())
    .then((data) =>  Credit = data.cast);

console.log(Credit)
    DisplayCarousel()
 
}


function DisplayCarousel() {
  searchCarousel.innerHTML =Credit.map(
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
`
  )
  .join("");
}


inputSearch.addEventListener("input", (e) => {
  peoplesearch = e.target.value;
  Movie = e.target.value;
  FetchPeople();

});


btn.addEventListener("click", () => {
if(peoplesearch === "") {
alert("ecrit fdp")
} else {
  topMovie.classList.add("visiblity");
  topPerson.classList.add("visiblity");
  filterContainer.classList.add("visiblity");
  SearchCarousel.classList.add("visibleScroll");

  FetchDisplayPeople();
  FetchCreditMovies();

}
});


window.addEventListener("load", FetchPeople());


//*********************Movie Credit */




//// SEARCH MOVIE ////////////////

// async function FetchSearchMovies() {
//   await fetch(
//     "https://api.themoviedb.org/3/search/movie?api_key=dc4fa11dbb0888468121f0e93ac98077&language=en-US&page=1&include_adult=false&query=" + Movie
//   )
//     .then((res) => res.json())
//     .then((data) =>  SearchMovie  = data.results);
//     console.log( SearchMovie)
// };

// function DisplayMovies() {
  
//   lowerContent2.innerHTML = SearchMovie.map(
//     (info) =>
//       `
//  <h3>${info.original_title}</h3>
// `
//   )
//   .join("");
// }





















