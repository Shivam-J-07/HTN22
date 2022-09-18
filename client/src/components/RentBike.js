import { useState } from "react";
import Filters from "./Filters";
import ResultPreview from "./ResultPreview";
import RentBikeResult from "./RentBikeResult";
import Maps from './MapAPI'

function RentBike(props) {
  const [image, setImage] = useState("");
  const [yourBikes, setYourBikes] = useState([
    {
      id: 1,
      location: "123 Main St, Toronto, ON",
      model: "City Cruiser",
      hourLimit: "2",
      hourlyRate: "10",
      image:
        "https://media.karousell.com/media/photos/products/2020/12/8/giant_stance_2_29er_blue_ashes_1607432788_51d0978a_progressive.jpg",
    },
    {
      id: 3,
      location: "123 Main St, Toronto, ON",
      model: "City Cruiser",
      hourLimit: 2,
      hourlyRate: 10,
      image:
        "https://media.karousell.com/media/photos/products/2020/12/8/giant_stance_2_29er_blue_ashes_1607432788_51d0978a_progressive.jpg",
    },
  ]);
  const [chosenBikeId, setChosenBikeId] = useState(yourBikes[0].id);

  return (
    <div>
      <div className="RentBike">
        <h1>Rent Your Bike</h1>
        <p>Input your details below:</p>
        <Filters />
        <div>
          <p>Upload a photo of your bike!</p>
          <input
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder="Image URL"
          />
        </div>
        <div className="flex-col">
          <h1>All Your Bikes</h1>
          {yourBikes.map((bike) => {
            if (bike.id === chosenBikeId) {
              return <RentBikeResult key={bike.id} bike={bike} />;
            } else {
              return (
                <ResultPreview
                  key={bike.id}
                  location={bike.location}
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
