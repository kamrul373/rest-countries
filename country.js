const countries = () => {
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => displayCountries(data));
}

const displayCountries = countries => {
    const countriesContainer = document.getElementById("countries");
    countries.forEach(country => {
        const { name, flags, population, capital, region, cca2 } = country;
        //console.log(country.name.official);
        const element = document.createElement("div");
        element.classList.add("col", "shadow-lg");
        element.innerHTML = `
        <div class="card">
            <img src="${flags.png}" class="card-img-top text-center w-100" style="height:150px;">
            <div class="card-body">
                <h6 class="card-title">${name.official}</h6>
                <p class="card-text">Capital : ${capital}</p>
                <p class="card-text">Region : ${region}</p>
                <p class="card-text">Population : ${population}</p>
                <button class="btn btn-primary" onclick="displayCountryDetails('${cca2}')" data-bs-toggle="modal" data-bs-target="#exampleModal">See more</button>
            </div>
        </div>
        `
        countriesContainer.appendChild(element);
    });

}
countries()


const displayCountryDetails = countryCode => {
    const url = `https://restcountries.com/v3.1/alpha/${countryCode} `;
    fetch(url)
        .then(response => response.json())
        .then(data => displayDetails(data[0]));
}
const displayDetails = data => {
    const detailsContainer = document.getElementById("details");
    const { name, independent, maps, timezones, area, flags } = data;
    detailsContainer.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${name.common}
            </h5>
            
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><img src="${flags.png}" class="float-end" style="width:40px" /></button>
            </div >
        
        <div class="modal-body">
           <p>Independent : ${independent ? name.common + 'is a an independent country' : 'No'}</p>
           <p>Timezone : ${timezones[0]}</p>
           <p>Area : ${area}</p>
        </div >
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
`;
}