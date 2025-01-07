
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import HomePage from './page/HomePage'
import LoginPage from './page/LoginPage'
import SignupPage from './page/SignupPage'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
