const tren = document.getElementById('trending');
const content = document.querySelector(".content");
let trending = [];
let peoplesearch = "Ana de Armas";


async function FetchPeople() {
    await fetch('https://api.themoviedb.org/3/search/person?api_key=dc4fa11dbb0888468121f0e93ac98077&language=en-US&query=' + peoplesearch)
    .then((res) => res.json())
    .then((data) =>  peoplesearch = data);

    console.log(peoplesearch);
    FetchDisplayPeople()
}

const inputSearch = document.getElementById("inputSearch")

function FetchDisplayPeople() {
    content.innerHTML = peoplesearch.filter((country) =>
    country.results[0].name
      .toLowerCase()
      .includes(inputSearch.value.toLowerCase())
  )
    content.innerHTML = peoplesearch = 
        `
        <div class="card">
        <h3>${peoplesearch.results[0].name}</h3>
        </div>
      `
    

}

inputSearch.addEventListener("input",  FetchDisplayPeople);

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
    <h3>Note:${info.vote_average}</h3>
    </div>
  `
).join("")
}





window.addEventListener('load',FetchTREN(), FetchPeople() );


