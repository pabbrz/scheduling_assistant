import { useState } from 'react'
import { BrowserRouter, createBrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import OverviewPage from './pages/OverviewPage';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/Registration" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
