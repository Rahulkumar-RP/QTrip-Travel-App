import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let objectUrl = new URLSearchParams(search);
  let cityobject = objectUrl.get("city");
  return cityobject;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let data = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    let cityData = await data.json();
    return cityData;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((city) => {
    // creating the dom structure for the adventure page
    let main_card = document.getElementById("data")
    let adventure_card = document.createElement("div");
    adventure_card.className = "col-lg-3 col-sm-6 col-6 mb-3";
    adventure_card.innerHTML = `
    <a href="detail/?adventure=${city.id}" id=${city.id}>
      <div class="card card_container">
        <div class="Badge_container">
        <img src="${city.image}" class="card-img-top" alt="...">
        <span class="Badge_Tag">${city.category}</span>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between"><p class="card-text mb-0">${city.name}</p><p class="card-text mb-0">₹${city.costPerHead}</p></div>
          <div class="d-flex justify-content-between"><p class="card-text mb-0">Duration</p><p class="card-text mb-0">${city.duration} Hours</p></div>
        </div>
      </div>
    </a>
    `;
    main_card.append(adventure_card);
  })
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
   return list.filter((adventure)=>{
    return adventure.duration >= low && adventure.duration <= high;
   });
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter((items)=> {
    return categoryList.includes(items.category)
  })

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredlist = list;
  if(filters.category.length !== 0){
    filteredlist = filterByCategory(filteredlist, filters.category);
  }
  if(filters.duration !== ""){
    let duration=filters.duration.split("-");
    let low = Number(duration[0]);
    let high = Number(duration[1]);;
    filteredlist = filterByDuration(filteredlist,low,high)
  }
  return filteredlist;
  // // Place holder for functionality to work in the Stubs
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  let filter = JSON.stringify(filters);
  localStorage.setItem("filters",filter);
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let storedFilter = localStorage.getItem("filters");
  // Place holder for functionality to work in the Stubs
  if(!storedFilter){
    return null;
  }
  return JSON.parse(storedFilter);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let category = filters.category;
  let container = document.getElementById("category-list");
  container.innerHTML = "";
  category.forEach((pills)=> {
     let pill = document.createElement("div");
     pill.className = "category-filter";
     pill.textContent = `${pills}`;
     container.append(pill);
  })
  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
