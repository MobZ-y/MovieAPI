
const famous = document.querySelector(".famous-actors");
const btnNext = document.querySelector('.next');
const btnPrev = document.querySelector('.previous');
const count = document.querySelector(".count");

let pages = "1";
let FamousPeople = [];

async function FetchFamousPeople() {
    await fetch('https://api.themoviedb.org/3/person/popular?api_key=dc4fa11dbb0888468121f0e93ac98077&language=en-US&page=' + pages)
    .then((res) => res.json())
    .then((data) => FamousPeople = data.results);

    console.log(FamousPeople);



    FetchDisplayFamous()
}


function FetchDisplayFamous() {
    famous.innerHTML = FamousPeople.map((info) => 
        `
        <div class="card">
        <div class="card-famous">
        <div class="profile-famous">
        <img src="https://image.tmdb.org/t/p/w500${info.profile_path
    }" alt="photo de ${info.name}" > 
    </div>
    <div class="profile-meta">
        <p class="name">${info.name}</p>
        <p class="sub">${info.known_for[0].title === undefined ? info.known_for[0].name : info.known_for[0].title}</p>
        </div>
        </div>
        </div>
      `
    ).join("")
}
function pagesCountDispaly()  {
    count.textContent = pages
};
btnNext.addEventListener("click", () =>{
    pages++
    console.log(pages)
    FetchFamousPeople()
    pagesCountDispaly() 
});
btnPrev.addEventListener("click", () =>{
    if(pages <= 1) {

    } else {
        pages--
    console.log(pages)
    FetchFamousPeople()
    pagesCountDispaly() 
    }
});
//: <p class="sub">${info.known_for[0].title === undefined ? info.known_for[0].name : info.known_for[0].title}, ${info.known_for[1].title === undefined ? info.known_for[1].name : info.known_for[1].title},${info.known_for[2] && info.known_for[2].title ? `, ${info.known_for[2].title}` : ""} </p>

window.addEventListener("load", FetchFamousPeople(), pagesCountDispaly())
