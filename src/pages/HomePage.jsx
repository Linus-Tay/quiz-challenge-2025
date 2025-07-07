import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Quiz Challenge 2025</h1>

      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg mb-4 w-full max-w-xs"
        onClick={() => navigate('/how-to-play')}
      >
        How to Play
      </button>

      <button
        className="bg-green-600 text-white px-6 py-3 rounded-lg mb-4 w-full max-w-xs"
        onClick={() => navigate('/scan')}
      >
        Start Scanning
      </button>

      <button
        className="bg-gray-700 text-white px-6 py-3 rounded-lg w-full max-w-xs"
        onClick={() => navigate('/progress')}
      >
        View Progress
      </button>
    </div>
  );
};

export default HomePage;
