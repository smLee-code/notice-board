import logo from './logo.svg';
import './App.css';
import {Router, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Rotue path="/" element={<HomePage />} />
          <Rotue path="/login" element={<LoginPage />} />
          <Rotue path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
