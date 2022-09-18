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
  const [model, setModel] = useState("")
  const [location, setLocation] = useState("")
  const [timeLimit, setTimeLimit] = useState(0)
  const [rentalRate, setRentalRate] =  useState(0)

  useEffect(() => {
    // call api to populate nearby bikes
    fetch("http://localhost:5000/search").then(response => response.json()).then(data => setBikes(data))
    // setBikes([]);
  }, []);

  const onSearch = () => {
    let fetchUrl = "http://localhost:5000/search"
    let params = []
    if (model.length !== 0) {
      params.push("bike_model=" + model)
    }
    if (timeLimit !== 0) {
      params.push(("time_limit=" + (timeLimit.toString())))
    }
    if (rentalRate !== 0) {
      params.push("rate_h=" + rentalRate.toString())
    }
    if (params.length > 0) {
      fetchUrl += "?"
      fetchUrl += params.join("&")
    }
    fetch(fetchUrl).then(response => response.json()).then(data => setBikes(data))
  }

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
        <Filters model={model} setModel={setModel} location={location} setLocation={setLocation} timeLimit={timeLimit} setTimeLimit={setTimeLimit} rentalRate={rentalRate} setRentalRate={setRentalRate} />
        <button className="btn" type="button" onClick={onSearch}>Search</button>
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
