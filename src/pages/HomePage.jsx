import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-6 text-blue-900">Quiz Challenge 2025</h1>

      <div className="space-y-4 w-full max-w-xs">
        <button onClick={() => navigate('/how-to-play')} className="btn-primary">📖 How to Play</button>
        <button onClick={() => navigate('/scan')} className="btn-success">📷 Scan QR Code</button>
        <button onClick={() => navigate('/progress')} className="btn-secondary">📊 View Progress</button>
      </div>
    </div>
  );
};

export default HomePage;
