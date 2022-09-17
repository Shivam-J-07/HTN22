import { useEffect, useState } from 'react';
import Filters from './Filters';
import Result from './Result';
import ResultPreview from './ResultPreview';
import Directions from './Directions';

function FindBike() {
    const [bikes, setBikes] = useState([]);
    const [chosenBikeId, setChosenBikeId] = useState(1);
    const [chosenPath, setChosenPath] = useState({
        "to": "New York",
        "from": "Broadway",
        "estimatedMinutes": "10",
        "directions": [
            "Turn left on New York Dr",
            "Turn right after 200km on Broadway",
            "Arrive!"
        ]
    });

    useEffect(() => {
        // call api to populate nearby bikes
        setBikes([
            {
            "id": 1,
            "location": "123 Main St, Toronto, ON",
            "model": "City Cruiser",
            "hourLimit": 2,
            "hourlyRate": 10,
            "image": "https://media.karousell.com/media/photos/products/2020/12/8/giant_stance_2_29er_blue_ashes_1607432788_51d0978a_progressive.jpg"
        },
        {
            "id": 2,
            "location": "123 Main St, Toronto, ON",
            "model": "City Cruiser",
            "hourLimit": 2,
            "hourlyRate": 10,
            "image": "https://media.karousell.com/media/photos/products/2020/12/8/giant_stance_2_29er_blue_ashes_1607432788_51d0978a_progressive.jpg"
        },
        {
            "id": 3,
            "location": "123 Main St, Toronto, ON",
            "model": "City Cruiser",
            "hourLimit": 2,
            "hourlyRate": 10,
            "image": "https://media.karousell.com/media/photos/products/2020/12/8/giant_stance_2_29er_blue_ashes_1607432788_51d0978a_progressive.jpg"
        },
      ])
    }, []);

    return (
        <div className="FindBike">
            <Directions path={chosenPath} />
            <h1>Find a Bike</h1>
            <h2>There are <strong>{bikes.length}</strong> bicycles in your area!</h2>
            <h5>Filters</h5>
            <Filters />
            <button className='btn'>Search</button>
            {bikes.map(bike => {
                if (bike.id === chosenBikeId) {
                    return (<Result key={bike.id} bike={bike} />);
                } else {
                    return (<ResultPreview key={bike.id} location={bike.location} onClick={() => setChosenBikeId(bike.id)} />)
                }
            })}
        </div>
    ); 
}

export default FindBike;