function Sidebar({items}) {
    return (
        <div className="Sidebar">
            <h1>RideMe</h1>
            {items.map(item => (
                <p>{item.label}</p>
            ))}
        </div>
    );
}

export default Sidebar;