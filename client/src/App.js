import Sidebar from './components/Sidebar';
import FindBike from './components/FindBike';
import './App.css';

const navItems = [
  {
    "path": "/",
    "label": "Find A Bike"
  },
  {
    "path": "/rent-your-bike",
    "label": "Rent Your Bike"
  },
  {
    "path": "/messages",
    "label": "Messages"
  },
];

function App() {
  return (
    <div className="App">
      <Sidebar items={navItems} />
      <FindBike />
    </div>
  );
}

export default App;
