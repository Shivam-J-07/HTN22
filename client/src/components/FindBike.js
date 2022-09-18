import { useEffect, useState } from "react";
import Filters from "./Filters";
import Result from "./Result";
import ResultPreview from "./ResultPreview";
import Directions from "./Directions";
import Maps from './MapAPI';
import { addressToLngLat, findDistance } from '../utils';

function FindBike() {

  const [bikes, setBikes] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('');
  const [chosenBikeId, setChosenBikeId] = useState(1);
  const [estimatedMinutes, setEstimatedMinutes] = useState(0);

  useEffect(() => {
    // call api to populate nearby bikes
    setBikes([]);
  }, []);

  return (
    <div>
      <div className="FindBike">
        <Directions
          to={chosenBikeId.address}
          from={currentLocation}
          estimatedMinutes={estimatedMinutes}
        />
        <h1>Find a Bike</h1>
        <h2>
          There are <strong>{bikes.length}</strong> bicycles in your area!
        </h2>
        <h5>Filters</h5>
        <Filters />
        <button className="btn">Search</button>
        {bikes.map((bike) => {
          if (bike.id === chosenBikeId) {
            return <Result key={bike.id} bike={bike} />;
          } else {
            return (
              <ResultPreview
                key={bike.id}
                location={bike.address}
                onClick={() => setChosenBikeId(bike.id)}
              />
            );
          }
        })}
      </div>
      <Maps />
    </div>
  );
}

export default FindBike;
