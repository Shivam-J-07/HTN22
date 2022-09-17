function Filters(props) {
    const {
        model,
        setModel,
        location,
        setLocation,
        timeLimit,
        setTimeLimit,
        rentalRate,
        setRentalRate
    } = props;
    return (
        <div className="Filters">
            <input value={model} onChange={event => setModel(event.target.value)} placeholder="Bicycle Model" />
            <input value={location} onChange={event => setLocation(event.target.value)} placeholder="Location" />
            <input value={timeLimit} onChange={event => setTimeLimit(event.target.value)} placeholder="Time limit" />
            <input value={rentalRate} onChange={event => setRentalRate(event.target.value)} placeholder="Hourly Rate $$$" />
        </div>
    );
}

export default Filters;