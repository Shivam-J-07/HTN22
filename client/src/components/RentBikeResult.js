function RentBikeResult({ bike }) {
    return (
      <div className="RentBikeResult">
        <div className="flex-row">
            <img src={bike.picture} alt="Bicycle" className="bike-image" />
            <div className="flex-col result-info">
            <h1>{bike.address}</h1>
            <span>{bike.bike_model}</span>
            <div className="flex-row">
                <div className="flex-col result-info-limit">
                <p>Hourly Limit:</p>
                <strong>{bike.time_liit}h</strong>
                </div>
                <div className="flex-col result-info-limit">
                <p>Hourly Rate:</p>
                <strong>${bike.rate_h}</strong>
                </div>
            </div>
            <div className="flex-row result-info-status">
                <strong>Status</strong>
                <p>{bike.status ?? "Not in use"}</p>
                </div>
            </div>
        </div>
        <div className="flex-col rent-bike-result-details">
            <p>Rental user: {bike.owner}</p>
            {/* This needs to be updated to match the tickets */}
            <p>Rental start time: {bike.start}</p>
            <p>Rental end time: {bike.end}</p>
            <p>Earnings: {bike.earnings}</p>
        </div>
      </div>
    );
  }
  
  export default RentBikeResult;
  