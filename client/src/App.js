import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import FindBike from "./components/FindBike";
import RentBike from './components/RentBike';
import Messages from './components/Messages';
import Layout from "./Layout";
import Login from './auth/Login';
import Register from './auth/Register';
import './App.css';

const navItems = [
  {
    "path": "/",
    "label": "Find A Bike",
  },
  {
    "path": "/rent-your-bike",
    "label": "Rent Your Bike",
  },
  {
    "path": "/messages",
    "label": "Messages",
  },
  {
    "path": "/bike-trails",
    "label": "Bike Trails",
  },
];

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Layout navItems={navItems}><FindBike /></Layout>} />
          <Route path="/rent-your-bike" element={<Layout navItems={navItems}><RentBike /></Layout>} />
          <Route path="/messages" element={<Layout navItems={navItems}><Messages /></Layout>} />
          <Route path="/bike-trails" element={<Layout navItems={navItems}><></></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
