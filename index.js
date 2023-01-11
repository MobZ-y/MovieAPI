const app = document.querySelector('.app')
let trending = [];



async function FetchYea() {
    await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=dc4fa11dbb0888468121f0e93ac98077&page=1')
    .then((res) => res.json())
    .then((data) =>  trending = data.results);

    console.log(trending);
    FetchDisplay()

}


function FetchDisplay() {
app.innerHTML = trending.map((info) => 
    `
    <div class="card">
    <img src="https://image.tmdb.org/t/p/w500${info.poster_path
    }" alt="drapeau" > 
    <h2>${info.title === undefined ? info.name : info.title}</h2>
    <p>${info.overview}</p>
    <h3>Note:${info.vote_average}</h3>
    </div>
  `
)
}





window.addEventListener('load',FetchYea() );

