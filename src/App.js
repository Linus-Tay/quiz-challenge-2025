import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HowToPlay from './pages/HowToPlay';
import ScanPage from './pages/ScanPage';
import ProgressPage from './pages/ProgressPage';
import CongratsPage from './pages/CongratsPage';
import PrizePage from './pages/PrizePage';
import QRDisplay from './pages/QRDisplay';
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/how-to-play" element={<HowToPlay />} />

        {/* Protected Pages */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/scan"
          element={
            <PrivateRoute>
              <ScanPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <PrivateRoute>
              <ProgressPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/congrats"
          element={
            <PrivateRoute>
              <CongratsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/prize"
          element={
            <PrivateRoute>
              <PrizePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/qr"
          element={
            <PrivateRoute>
              <QRDisplay />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
