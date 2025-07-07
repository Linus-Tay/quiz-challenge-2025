import React from 'react';
import { useNavigate } from 'react-router-dom';

const booths = ['booth1', 'booth2', 'booth3', 'booth4', 'booth5', 'booth6', 'booth7', 'booth8', 'booth9', 'booth10'];

const ScanPage = () => {
  const navigate = useNavigate();

  const unlockNextQuestion = () => {
    let unlocked = JSON.parse(localStorage.getItem('unlockedQuestions') || '[]');

    if (unlocked.length >= 10) return alert('All questions unlocked!');

    const nextBooth = booths[unlocked.length];
    unlocked.push(nextBooth);
    localStorage.setItem('unlockedQuestions', JSON.stringify(unlocked));

    alert(`Scanned ${nextBooth}! Unlocked Question ${unlocked.length}`);
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center">Scan QR Code</h2>

        <button
          className="bg-blue-600 text-white py-4 rounded-lg w-full mb-4"
          onClick={unlockNextQuestion}
        >
          📷 Simulate QR Scan
        </button>
      </div>

      <button
        className="bg-gray-700 text-white py-3 rounded-lg w-full"
        onClick={() => navigate('/progress')}
      >
        View Progress
      </button>
    </div>
  );
};

export default ScanPage;
