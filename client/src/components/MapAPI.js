import { useState, useEffect, useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF, DirectionsRenderer } from "@react-google-maps/api";
import bikeIcon from "../images/ridemelogo.png";

export default function Maps() {
  const libraries = ["geometry"];
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD50C9f6cveElrAbfQA7KF0frHMSfQvTbI",
    libraries
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(
    () => ({ lat: 43.47316595334821, lng: -80.53952390213617 }),
    []
  );
  const google = window.google;
  const [directions, setDirections] = useState([]);
  const [destination, setDestination] = useState({ lat: 43.4732659533499, lng: -80.53452390213617 })

  useEffect(() => {
    var directionsService = new google.maps.DirectionsService();

      var request = {
        origin: center,
        destination: destination,
        travelMode: "WALKING",
      };

      directionsService.route(request, function (result, status) {
        setDirections(result)
      });
  }, [destination]);

  return (
    <GoogleMap
      zoom={15}
      center={center}
      options={{ mapId: "7b8717b03b02c6e5" }}
      mapContainerClassName="map-container"
    >
      {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }} />}
      <MarkerF position={center} />
      <MarkerF
        position={{ lat: 43.4732659533499, lng: -80.53452390213617 }}
        icon={{
          url: bikeIcon,
          scaledSize: new google.maps.Size(88, 82),
        }}
        onClick={() => setDestination({ lat: 43.4732659533499, lng: -80.53452390213617 })}
      />
      <MarkerF
        position={{ lat: 43.4792659533499, lng: -80.53852390213617 }}
        icon={{
          url: bikeIcon,
          scaledSize: new google.maps.Size(88, 82),
        }}
        onClick={() => setDestination({ lat: 43.4792659533499, lng: -80.53852390213617 })}
      />
    </GoogleMap>
  );
}
