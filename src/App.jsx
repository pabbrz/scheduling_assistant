import { useState } from 'react'
import { BrowserRouter, createBrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import OverviewPage from './pages/OverviewPage';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/Registration" element={<RegistrationPage />} />
        <Route path="/Homepage" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
