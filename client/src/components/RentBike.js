import { useState } from "react";
import Filters from "./Filters";
import ResultPreview from "./ResultPreview";
import RentBikeResult from "./RentBikeResult";
import Maps from './MapAPI'

function RentBike(props) {
  const [image, setImage] = useState("");
  const [yourBikes, setYourBikes] = useState([]);
  const [chosenBikeId, setChosenBikeId] = useState(0);
  const [model, setModel] = useState("")
  const [location, setLocation] = useState("")
  const [timeLimit, setTimeLimit] = useState(0)
  const [rentalRate, setRentalRate] =  useState(0)

  const addBike = () => {
    fetch("http://localhost:5000/bike", {method: 'POST', mode: 'cors', body: JSON.stringify({
      address: location,
      picture: image,
      rate_h: rentalRate,
      time_limit: timeLimit,
      bike_model: model,
      owner: localStorage.getItem("userId")
    })}).then(() => {
      setModel("")
      setLocation("")
      setTimeLimit(0)
      setRentalRate(0)
      setImage("")
    })
  }

  return (
    <div>
      <div className="RentBike">
        <h1>Rent Your Bike</h1>
        <p>Input your details below:</p>
        <Filters model={model} setModel={setModel} location={location} setLocation={setLocation} timeLimit={timeLimit} setTimeLimit={setTimeLimit} rentalRate={rentalRate} setRentalRate={setRentalRate} />
        <div>
          <p>Upload a photo of your bike!</p>
          <input
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder="Image URL"
          />
        </div>
        <button type="button" onClick={addBike}>Add Bike</button>
        <div className="flex-col">
          <h1>All Your Bikes</h1>
          {yourBikes.map((bike) => {
            if (bike.id === chosenBikeId) {
              return <RentBikeResult key={bike.id} bike={bike} />;
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
      </div>
      <Maps />
    </div>
  );
}

export default RentBike;
