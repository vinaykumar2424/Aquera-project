import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import UserDetails from './components/UserDetails/UserDetails';

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="user-details" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
