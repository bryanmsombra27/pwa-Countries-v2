const paisesContainer = document.querySelector("#paises");
const paisContainer = document.querySelector("#pais");

//pagination
const paginationContainer = document.querySelector("#pagination");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
let prevNumber = 0;
let nextNumber = 10;
let actualPage = 1;
////////

const url = "https://restcountries.com/v3.1";

navigator.serviceWorker.register("/sw.js");



const renderPaises = (paises,page) => {
    paisesContainer.innerHTML = "";
    const pages = paises.length / 10;
    for (let i = 0; i <= pages; i++){
        paginationContainer.innerHTML = `
        
        <li class="page-item"><a class="page-link" href="#">${ page }</a></li>`;
    }


       paises.slice(prevNumber, nextNumber).forEach((pais) => {

        paisesContainer.innerHTML += `
         <li class="list-group-item pais" data-name="${pais.name.common}">${pais.name.common}</li>
        `;
       });
    selectPais();
}


//pagination 
const prevList = (e) => {
    e.preventDefault();
    if (prevNumber <= 0) {
        return;
    }
    prevNumber -= 10;
    nextNumber -= 10;
    actualPage--;
    renderAPI();
}
const nextList = (e) => {
    e.preventDefault();
    
    if (nextNumber <= 240) {
    prevNumber = nextNumber;
    nextNumber += 10;
    actualPage++;
    renderAPI();
    }

}
////////////////////////////////////////////////////////////////

const selectPais = () => {

    const paisesList = document.querySelectorAll(".pais");

    paisesList.forEach(pais => {
        pais.addEventListener("click", async (e) => {
            const name = e.target.dataset.name;
            const res = await fetch(`${url}/name/${name}`);
            const data = await res.json();

            console.log(data[0]);
            renderPais(data[0]);
        })
    })
};

const renderPais = (pais) => {
    paisContainer.innerHTML = "";

    paisContainer.innerHTML = `
          <h2 class=" h1 my-4">${pais.name.common} </h2>

          <div class="card">
            <img  src="${pais.flags.svg}"></img>

            <div class="card-body pais">
         
            <div class="item">
                <h5>Población: </h5>
                <p class="population">${pais.population} </p>
                <i class="fas fa-users fa-2x"></i>
            </div>

              <div class="item">
                <h5>Capital: </h5>
                <p class="population">${pais.capital} </p>
                <i class="fas fa-city fa-2x"></i>
            </div>

                <div class="item">
                <h5>Región: </h5>
                <p class="population">${pais.region} </p>
                <i class="fas  fa-globe-europe fa-2x"></i>
            </div>

                <div class="item">
                <h5>Inicio de Semana: </h5>
                <p class="population">${pais.startOfWeek} </p>
               <i class="fas fa-calendar-week fa-2x"></i>
            </div>

                <div class="item">
                <h5>subRegion: </h5>
                <p class="population">${pais.subregion} </p>
                <i class="fas fa-globe fa-2x"></i>
            </div>

            </div>
          </div>
          

                `;

};



const renderAPI =  async() => {
    const res = await fetch(`${url}/all`);
    const data = await res.json();

    // console.log(data);

    renderPaises(data,actualPage);
};





renderAPI();


// events to control pagination
prev.addEventListener("click", prevList);
next.addEventListener("click", nextList);