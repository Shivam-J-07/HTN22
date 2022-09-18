function Directions({path}) {
    const {
        to,
        from,
        directions,
        estimatedMinutes
    } = path;
    return (
      <div className="Directions">
        <h1>Directions</h1>
        <div className="flex-col directions-from-to">
            <span>From: <strong>{from}</strong></span>
            <span>To: <strong>{to}</strong></span>
        </div>
        <p className="estimatedMinutes">{estimatedMinutes} min</p>
        {/* <ol className="directions-steps">
            {directions.map(line => (
                <li>{line}</li>
            ))}
        </ol> */}
      </div>
    );
}

export default Directions;
