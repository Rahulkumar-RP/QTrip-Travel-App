import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let objectId = new URLSearchParams(search);
  let adventureId = objectId.get("adventure");
  // Place holder for functionality to work in the Stubs
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let adventure_call = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
  
    if(!adventure_call.ok){
      return null;
    }

    let adventure_details = await adventure_call.json();
    return adventure_details;
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let heading = document.getElementById("adventure-name");
  heading.innerHTML = `${adventure.name}`;
  let para = document.getElementById("adventure-subtitle");
  para.innerHTML = `${adventure.subtitle}`
  let images_gallery = document.getElementById("photo-gallery");
  images_gallery.innerHTML = "";
  adventure.images.forEach(photo => {
    let image = document.createElement("div");
    image.innerHTML = `<img src=${photo} alt=${adventure.name} class="activity-card-image">`;
    images_gallery.append(image);
  });
  let details = document.getElementById("adventure-content");
  details.innerHTML = `${adventure.content}` 
}

{/* <div class="carousel-item active">
      <img src="..." class="d-block w-100" alt="...">
    </div> */}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let curosol = document.getElementById("photo-gallery");
  curosol.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner" id="carousel_container">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
images.forEach((img,index) => {
  let carousel_container = document.getElementById("carousel_container");
  let carousel_elements = document.createElement("div");
  carousel_elements.innerHTML = `<img src=${img} class="d-block w-100 activity-card-image" alt="...">`
  if(index == 0){
    carousel_elements.className = "carousel-item active";
  }
  else{
    carousel_elements.className = "carousel-item";
  }
  carousel_container.append(carousel_elements);
})

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available === true){
    let reservation_Container = document.getElementById("reservation-panel-sold-out");
    reservation_Container.style.display = "none";
    let reservation_form = document.getElementById("reservation-panel-available");
    reservation_form.style.display = "block";
    let cost = document.getElementById("reservation-person-cost");
  cost.textContent = adventure.costPerHead;
  }
  else{
    let reserved_container = document.getElementById("reservation-panel-sold-out");
    reserved_container.style.display = "block";
    let reservation__form = document.getElementById("reservation-panel-available");
    reservation__form.style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  
  let costPerHead = adventure.costPerHead;
  let person = Number(persons);
  let totalCost = document.getElementById("reservation-cost");
  totalCost.innerHTML = costPerHead * person;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  let form = document.getElementById("myForm");
  form.addEventListener("submit",async(e) => {
    e.preventDefault();

    let data = {
      name : form.elements["name"].value,
      date : form.elements["date"].value,
      person : Number(form.elements["person"].value),
      adventure : adventure.id,

    }
    
    try {
       let res = await fetch(config.backendEndpoint + "/reservations/new", {
        method : "POST",
        body : JSON.stringify(data),
        headers: {
          "Content-Type" : "application/json" 
        }
      })
      let finalres = await res.json();
      if(res.ok){
        alert("Success!");
      }
      else{
        alert("Failed!");
      }
      return finalres;
    } catch (error) {
      return null;
    }
  })

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved === true){
    document.getElementById("reserved-banner").style.display = "block";
  }
  else{
    document.getElementById("reserved-banner").style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
