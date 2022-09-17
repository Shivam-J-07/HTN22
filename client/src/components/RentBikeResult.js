function RentBikeResult({ bike }) {
    return (
      <div className="RentBikeResult">
        <div className="flex-row">
            <img src={bike.image} alt="Bicycle" className="bike-image" />
            <div className="flex-col result-info">
            <h1>{bike.location}</h1>
            <span>{bike.model}</span>
            <div className="flex-row">
                <div className="flex-col result-info-limit">
                <p>Hourly Limit:</p>
                <strong>{bike.hourLimit}h</strong>
                </div>
                <div className="flex-col result-info-limit">
                <p>Hourly Rate:</p>
                <strong>${bike.hourlyRate}</strong>
                </div>
            </div>
            <div className="flex-row result-info-status">
                <strong>Status</strong>
                <p>{bike.status}</p>
                </div>
            </div>
        </div>
        <div className="flex-col rent-bike-result-details">
            <p>Rental user: {bike.renter}</p>
            <p>Rental start time: {bike.start}</p>
            <p>Rental end time: {bike.end}</p>
            <p>Earnings: {bike.earnings}</p>
        </div>
      </div>
    );
  }
  
  export default RentBikeResult;
  