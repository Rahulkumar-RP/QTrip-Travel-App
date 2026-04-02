import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
 const cities = await fetchCities();  

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const cities_Raw_Data = await fetch(`${config.backendEndpoint}/cities`); 
    if(!cities_Raw_Data.ok){
      throw new Error("response was not ok");
    }
    const cities_final_Data = await cities_Raw_Data.json();

    return cities_final_Data;
  }
  catch(error){
    return null;
  }
  
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const container = document.getElementById("data");
  const card = document.createElement("div");
  card.className = "col-12 col-sm-6 col-lg-3 mb-3"
    card.innerHTML = `
  <a href="pages/adventures/?city=${id}" id=${id}>
    <div class="tile" >
    <div class="tile-text text-center">
        <h5>${city}</h5>
        <p>${description}</p>
    </div>
    <img class="img-responsive" src="${image}" alt="${city} ">
    </div>
  </a>`
  container.append(card);
}

export { init, fetchCities, addCityToDOM };
