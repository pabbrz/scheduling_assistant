import { useState } from 'react'
import { BrowserRouter, createBrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import OverviewPage from './pages/OverviewPage';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/overview" element={<OverviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
