
const content = document.querySelector(".famous-movies")


let Popular = [];




async function FetchPopular() {
  await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=dc4fa11dbb0888468121f0e93ac98077&language=fr-FR&page=1"
  )
    .then((res) => res.json())
    .then((data) => (Popular = data.results));

  console.log(Popular);
  FetchDisplayFamous();
}

function FetchDisplayFamous() {
  content.innerHTML = Popular.map(
    (info) =>
      `
      <div class="card">
      <div class="card-popular">
      <div class="profile-popular">
      <img src="https://image.tmdb.org/t/p/w500${info.poster_path
  }" alt="photo de ${info.title}" > 
  </div>
  <div class="profile-meta">
      <p class="name">${info.title}</p>
      <p class="sub">${info.release_date}</p>
      </div>
      </div>
      </div>
      `
  ).join("");
}

window.addEventListener("load", FetchPopular());
