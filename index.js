const tren = document.getElementById('trending');
const content = document.querySelector(".content");
const btn = document.querySelector("button")
const topMovie = document.querySelector('.moviesTOP')
const inputSearch = document.getElementById("inputSearch")


let trending = [];
let peoplesearch = "";


async function FetchPeople() {
    await fetch('https://api.themoviedb.org/3/search/person?api_key=dc4fa11dbb0888468121f0e93ac98077&language=en-US&query=' + peoplesearch)
    .then((res) => res.json())
    .then((data) =>  peoplesearch = data);

    console.log(peoplesearch);
}



function FetchDisplayPeople() {
    content.innerHTML = peoplesearch = 
        `
        <div class="search">
        <div class="Profile">
        <img src="https://image.tmdb.org/t/p/w500${peoplesearch.results[0].profile_path
    }" alt="drapeau" id="pp"> 
    </div>
        <div class="KnowFor">
        <h3>${peoplesearch.results[0].name}</h3>
        <h4>Connu pour :</h4>
        <img src="https://image.tmdb.org/t/p/w500${peoplesearch.results[0].known_for[0].poster_path
      }" alt="poster" >
      <img src="https://image.tmdb.org/t/p/w500${peoplesearch.results[0].known_for[1].poster_path
    }" alt="poster" >
    <img src="https://image.tmdb.org/t/p/w500${peoplesearch.results[0].known_for[2].poster_path
  }" alt="poster" >
        </div>
        </div>
      `
};

inputSearch.addEventListener('input', (e) => {
  peoplesearch = e.target.value
  FetchPeople()
});

btn.addEventListener("click", ()=>{
  topMovie.classList.add("visiblity");
  FetchDisplayPeople()
})


async function FetchTREN() {
    await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=dc4fa11dbb0888468121f0e93ac98077&page=1')
    .then((res) => res.json())
    .then((data) =>  trending = data.results);


    FetchDisplay()
}


function FetchDisplay() {
tren.innerHTML = trending.map((info) => 
    `
    <div class="card">
    <img src="https://image.tmdb.org/t/p/w500${info.poster_path
    }" alt="drapeau" > 
    <h2>${info.title === undefined ? info.name : info.title}</h2>
    <h3>Note:${info.vote_average === 0 ? "unrated " : info.vote_average}</h3>
    </div>
  `
).join("")
}





window.addEventListener('load',FetchTREN(), FetchPeople() );


