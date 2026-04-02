import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let reservation = await fetch(config.backendEndpoint + "/reservations/");
  
    if(!reservation.ok){
      return null;
    }
    let reservation_details = await reservation.json();
    return  reservation_details;
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  if(reservations.length == 0){
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }
  else{
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  }
  let table_body_contaier = document.getElementById("reservation-table");
    table_body_contaier.innerHTML = ""; 
    reservations.forEach(element => {
      
    const formattedDate = new Date(element.date).toLocaleDateString("en-IN");
    const dateObj = new Date(element.time);
    const datePart = dateObj.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const timePart = dateObj.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    const formattedTime = `${datePart}, ${timePart}`;

    let tb_body = document.createElement("tr");
    tb_body.innerHTML = `
    <td>${element.id}</td>
    <td>${element.name}</td>
    <td>${element.adventureName}</td>
    <td>${element.person}</td>
    <td>${formattedDate}</td>
    <td>${element.price}</td>
    <td>${formattedTime}</td>
    <td id="${element.id}"><a
    href="/frontend/pages/adventures/detail/?adventure=${element.adventure}" class="reservation-visit-button">Visit Adventure</a></td>
    `
    table_body_contaier.append(tb_body);
  });
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };
