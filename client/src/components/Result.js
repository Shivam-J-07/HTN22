function Result({ bike }) {
  return (
    <div className="Result">
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
        <button className="btn">RideMe!</button>
      </div>
    </div>
  );
}

export default Result;
