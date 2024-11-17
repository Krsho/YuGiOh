//Dropdown
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.toggle_btn');
    const toggleBtnIcon = document.querySelector('.toggle_btn i');
    const dropDownMenu = document.querySelector('.dropdown');

    toggleBtn.onclick = function () {
        dropDownMenu.classList.toggle('open');
        const isOpen = dropDownMenu.classList.contains('open');

        toggleBtnIcon.classList = isOpen
            ? 'fa-solid fa-xmark'
            : 'fa-solid fa-bars';
    }
});

//Drag and Drop
document.addEventListener("DOMContentLoaded", () => {
    function allowDrop(ev) {
      ev.preventDefault();
    }
  
    function drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    }
  
    function drop(ev) {
      ev.preventDefault();
      const data = ev.dataTransfer.getData("text");
      ev.target.innerHTML = "";
      ev.target.appendChild(document.getElementById(data));
    }
  
    const card = document.getElementById("card");
    const placeholder = document.getElementById("placeholder");
  
    card.addEventListener("dragstart", drag);
    placeholder.addEventListener("dragover", allowDrop);
    placeholder.addEventListener("drop", drop);
  });
  
//Form
document.getElementById("tournamentForm").addEventListener("submit", function(event) {
  event.preventDefault(); 


  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const age = document.getElementById("age").value;
  const experience = document.getElementById("experience").value; 
  const deck = document.getElementById("deck").value; 
  const favoriteCard = document.getElementById("favoriteCard").value; 
  const tournamentPreferences = document.getElementById("tournamentPreferences").value; 
  const agree = document.getElementById("agree").checked;

  if (!fullName || !email || !phone || !age || !experience || !deck || !favoriteCard || !agree) {
      alert("Please fill in all required fields and agree to the rules.");
      return; 
  }

  alert("Form submitted successfully!");

  const formData = {
      fullName,
      email,
      phone,
      age,
      experience,
      deck,
      favoriteCard,
      tournamentPreferences,
      agree
  };

  console.log("Form Data:", formData);
});

//Geolocation
const tournamentLocation = { lat: 43.858346209088644, lng: 18.41672476364131 };

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = (value) => (value * Math.PI) / 180; 
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}

document.getElementById("calculate-distance").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        const distance = calculateDistance(userLat, userLon, tournamentLocation.lat, tournamentLocation.lng);

        document.getElementById("distance-result").textContent = `Your distance to the tournament venue is ${distance.toFixed(2)} km.`;
      },
      (error) => {
        document.getElementById("distance-result").textContent =
          "Unable to retrieve your location. Please allow location access.";
      }
    );
  } else {
    document.getElementById("distance-result").textContent =
      "Geolocation is not supported by your browser.";
  }
});


