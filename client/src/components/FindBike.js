import Filters from './Filters';

function FindBike() {
    return (
        <div className="FindBike">
            <h1>Find a Bike</h1>
            <h2>There are 5 bicycles in your area!</h2>
            <Filters />
        </div>
    );
}

export default FindBike;