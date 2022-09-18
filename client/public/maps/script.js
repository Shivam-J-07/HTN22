var bikePositions = [
  { lat: 43.47035592198128, lng: -80.53397624488301 },
  { lat: 43.47539267415478, lng: -80.53694898168858 },
];
// Hard coded bike positions, will be retrieved from database

var userPosition = { lat: 43.47316595334821, lng: -80.53952390213617 };
// Hard coded user position, will be retrieved from database

var bikeMarker = [];

var distancesToBike = [];

var userMarker;

function initMap() {
  console.log(google, google.maps);
  const map = new google.maps.Map(document.getElementById("map"), {
    center: userPosition,
    zoom: 15,
    mapId: "7b8717b03b02c6e5",
  });

  const image = "./ridemelogo.png";
  // Has to be replaced with proper file path when using react

  bikePositions.forEach((bikePosition) => {
    bikeMarker.push(
      new google.maps.Marker({
        map,
        position: bikePosition,
        icon: {
          url: image,
          scaledSize: new google.maps.Size(88, 82),
        },
        // image refers to the custom green emoji we created 
      })
    );
  });

  userMarker = new google.maps.Marker({ map, position: userPosition });

  // Get user's location
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(
        `Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`
      );

      var location = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );

      var destination = bikePositions[1]; //

      bikePositions.forEach((bikePosition) => {
        distancesToBike.push(
          google.maps.geometry.spherical.computeDistanceBetween(
            location,
            bikePosition
          )
        );
        console.log(`Distance: ${distancesToBike}`);
      });

      var directionsService = new google.maps.DirectionsService();
      var directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
      });

      directionsRenderer.setMap(map);

      var request = {
        origin: location,
        destination: destination,
        travelMode: "WALKING",
      };

      directionsService.route(request, function (result, status) {
        if (status == "OK") {
          directionsRenderer.setDirections(result);
        }
      });
    });
    // (err) => alert(`Error (${err.code}): ${getPositionErrorMessage(err.code)}`);
  } else {
    alert("Geolocation is not supported by your browser.");
  }

  addressToLngLat();
}

function addressToLngLat() {
  var geocoder = new google.maps.Geocoder();
  var address = "WCRI Fenwick";

  geocoder.geocode({ address: address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      console.log(`${address}: Lat: ${latitude}, lng ${longitude}`);
    }
  });
}

window.initMap = initMap;
