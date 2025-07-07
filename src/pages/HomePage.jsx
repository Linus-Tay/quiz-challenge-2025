import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/signin');
    } catch (err) {
      console.error('Sign-out error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-sky-100 flex flex-col items-center justify-center px-6 py-10 text-center">
      {/* Title */}
      <div className="mb-10">
        <h1 className="text-5xl font-extrabold text-sky-800 drop-shadow-sm">
          Quiz Challenge 2025
        </h1>
        <p className="text-base text-gray-600 mt-2">
          Test your knowledge, collect rewards, and conquer the booths.
        </p>
      </div>

      {/* Buttons */}
      <div className="space-y-5 w-full max-w-sm">
        <button
          onClick={() => navigate('/how-to-play')}
          className="w-full py-3 bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-lg shadow-sm transition"
        >
          📖 How to Play
        </button>

        <button
          onClick={() => navigate('/scan')}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-sm transition"
        >
          📷 Start Scanning
        </button>

        <button
          onClick={() => navigate('/progress')}
          className="w-full py-3 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg shadow-sm transition"
        >
          📊 View Progress
        </button>

        <button
          onClick={handleSignOut}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-sm transition mt-2"
        >
          🚪 Sign Out
        </button>
      </div>

      {/* Footer */}
      <div className="mt-12 text-xs text-gray-400">
        © 2025 Quiz Challenge
      </div>
    </div>
  );
};

export default HomePage;
