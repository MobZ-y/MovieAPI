
const famous = document.querySelector(".famous-actors");


let FamousPeople = [];

async function FetchFamousPeople() {
    await fetch('https://api.themoviedb.org/3/person/popular?api_key=dc4fa11dbb0888468121f0e93ac98077&language=en-US&page=1')
    .then((res) => res.json())
    .then((data) => FamousPeople = data.results);

    console.log(FamousPeople);




    FetchDisplayFamous()
}


function FetchDisplayFamous() {
    famous.innerHTML = FamousPeople.map((info) => 
        `
        <div class="card">
        <img src="https://image.tmdb.org/t/p/w500${info.profile_path
    }" alt="photo de ${info.name}" > 
        <h2>${info.name}</h2>
        </div>
      `
    ).join("")
}



window.addEventListener("load", FetchFamousPeople())
