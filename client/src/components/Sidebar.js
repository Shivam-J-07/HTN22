import { Link, useLocation } from "react-router-dom";
function Sidebar({items}) {
    const current = useLocation().pathname;
    return (
        <div className="Sidebar">
            <h1>RideMe</h1>
            {items.map(item => (
                <Link key={item.path} to={item.path} className={`${item.path === current ? 'active' : ''}`}>{item.label}</Link>
            ))}
        </div>
    );
}

export default Sidebar;