import logo from './logo.svg';
import './App.css';
import {Stock} from './Components/Stock.js';
import Navbar from './Components/Navbar.js';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Stock />
      
    </div>
  );
}

export default App;
