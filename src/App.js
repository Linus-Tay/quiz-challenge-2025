import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HowToPlay from './pages/HowToPlay';
import ScanPage from './pages/ScanPage';
import ProgressPage from './pages/ProgressPage';
import CongratsPage from './pages/CongratsPage';
import PrizePage from './pages/PrizePage';
import QRDisplay from './pages/QRDisplay';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/congrats" element={<CongratsPage />} />
        <Route path="/prize" element={<PrizePage />} />
        <Route path="/qr" element={<QRDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
