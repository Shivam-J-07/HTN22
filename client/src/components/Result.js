function Result({ bike }) {
  return (
    <div className="Result">
      <img src={bike.picture} alt="Bicycle" className="bike-image" />
      <div className="flex-col result-info">
        <h1>{bike.address}</h1>
        <span>{bike.bike_model}</span>
        <div className="flex-row">
          <div className="flex-col result-info-limit">
            <p>Hourly Limit:</p>
            <strong>{bike.time_limit}h</strong>
          </div>
          <div className="flex-col result-info-limit">
            <p>Hourly Rate:</p>
            <strong>${bike.rate_h}</strong>
          </div>
        </div>
        <button className="btn">ReCycle!</button>
      </div>
    </div>
  );
}

export default Result;
