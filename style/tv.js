const trenTv = document.querySelector('.trendingTv');
const topTv = document.querySelector('.tv-trending');

let trendingTv = [];

async function FetchTV() {
   await fetch('https://api.themoviedb.org/3/tv/popular?api_key=dc4fa11dbb0888468121f0e93ac98077')
    .then((res) => res.json())
    .then((data) =>  trendingTv = data.results);

    console.log(trendingTv);
    FetchDisplayTv()
}


function FetchDisplayTv() {
    trenTv.innerHTML = trendingTv.map((info) => 
    `
    <div class="card">
    <div class="card-popular">
    <div class="profile-popular">
    <img src="https://image.tmdb.org/t/p/w500${info.poster_path
}" alt="photo de ${info.name}" > 
</div>
<div class="profile-meta">
    <p class="name">${info.name === undefined ? info.title : info.name}</p>
    <p class="sub"${info.vote_average === 0 ? "" : (info.vote_average > 6 ? "green" : "red")}">${info.vote_average === 0 ? "unrated" : (info.vote_average * 10).toFixed(1)}</p>
    </div>
    </div>
    </div>
    </div>
  `
    ).join("")
}
    

// `
// <div class="card"> 
// <img src="https://image.tmdb.org/t/p/w500${info.poster_path
// }" alt="drapeau" > 
// <h2>${info.name}</h2>
// <h3 class="${info.vote_average === 0 ? "" : (info.vote_average > 6 ? "green" : "red")}">${info.vote_average === 0 ? "unrated" : (info.vote_average * 10).toFixed(1)}</h3>
// </div>
// `

window.addEventListener('load', FetchTV())