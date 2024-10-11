// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("user_form");
  const mapModal = document.getElementById("mapModal");
  const confirmLocation = document.getElementById("confirmLocation");
  const cancelLocation = document.getElementById("cancelLocation");

  let map;
  let marker;
  let selectedLocation = { lat: null, lng: null };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    mapModal.style.display = "block";
    setTimeout(() => {
      initializeMap();
    }, 100);
  });

  confirmLocation.addEventListener("click", () => {
    if (selectedLocation.lat && selectedLocation.lng) {
      document.getElementById("latitude").value = selectedLocation.lat;
      document.getElementById("longitude").value = selectedLocation.lng;
      mapModal.style.display = "none";
      form.submit();
    } else {
      alert("Please select a location on the map.");
    }
  });

  cancelLocation.addEventListener("click", () => {
    mapModal.style.display = "none";
  });

  function initializeMap() {
    try {
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
      });

      marker = new google.maps.Marker({
        map: map,
        draggable: true,
      });

      map.addListener("click", function (event) {
        placeMarker(event.latLng);
      });

      // Add listener for marker drag end
      marker.addListener("dragend", function (event) {
        selectedLocation.lat = event.latLng.lat();
        selectedLocation.lng = event.latLng.lng();
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      alert("There was an error loading the map. Please try again.");
    }
  }

  function placeMarker(latLng) {
    marker.setPosition(latLng);
    map.panTo(latLng);
    selectedLocation.lat = latLng.lat();
    selectedLocation.lng = latLng.lng();
  }

  // Add this to check if Google Maps API is loaded
  if (typeof google === "undefined") {
    console.error("Google Maps API is not loaded");
  }
});
