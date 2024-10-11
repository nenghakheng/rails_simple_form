// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

document.addEventListener("DOMContentLoaded", function () {
  const mapModal = document.getElementById("mapModal");
  const openMapModalButton = document.getElementById("openMapModal");
  const confirmLocationButton = document.getElementById("confirmLocation");
  const cancelLocationButton = document.getElementById("cancelLocation");
  const latitudeInput = document.getElementById("latitude");
  const longitudeInput = document.getElementById("longitude");
  const locationInput = document.getElementById("user_location");

  let map, marker;

  openMapModalButton.addEventListener("click", function () {
    mapModal.classList.remove("hidden");
    initMap();
  });

  confirmLocationButton.addEventListener("click", function () {
    if (marker) {
      const position = marker.getPosition();
      latitudeInput.value = position.lat();
      longitudeInput.value = position.lng();
      locationInput.value = `${position.lat()}, ${position.lng()}`;
    }
    mapModal.classList.add("hidden");
  });

  cancelLocationButton.addEventListener("click", function () {
    mapModal.classList.add("hidden");
  });

  function initMap() {
    if (!map) {
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
      });

      map.addListener("click", function (e) {
        placeMarker(e.latLng);
      });
    }
  }

  function placeMarker(latLng) {
    if (marker) {
      marker.setPosition(latLng);
    } else {
      marker = new google.maps.Marker({
        position: latLng,
        map: map,
      });
    }
    map.panTo(latLng);
  }
});
