import React from 'react';
import { useNavigate } from 'react-router-dom';

const HowToPlay = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-bold mb-4">How to Play</h2>
        <ul className="list-disc ml-6 text-lg space-y-2">
          <li>Visit all event booths.</li>
          <li>Scan the QR code at each booth to unlock a question.</li>
          <li>Answer all 10 questions correctly to win a prize.</li>
        </ul>
      </div>

      <button
        className="bg-blue-600 text-white py-3 rounded-lg w-full mt-6"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
    </div>
  );
};

export default HowToPlay;
