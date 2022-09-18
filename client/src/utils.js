const google = window.google;

export async function addressToLngLat(address) {
  var geocoder = new google.maps.Geocoder();
  let value = {};
  geocoder.geocode({ address: address }, (results, status) => {
    var latitude = results[0].geometry.location.lat();
    var longitude = results[0].geometry.location.lng();
    console.log(`${address}:\nlat ${latitude}, lng ${longitude}`);
    value = { lat: latitude, lng: longitude };
  });
  console.debug("value", value);
  return value;
}

export function findDistance(location, dest) {
  return google.maps.geometry.spherical.computeDistanceBetween(location, dest);
}
