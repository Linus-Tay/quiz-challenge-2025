import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const allPrizes = ['Bluetooth Speaker', 'Powerbank', 'Merch Pack', 'Mystery Box'];

const PrizePage = () => {
  const navigate = useNavigate();
  const [shuffledPrizes, setShuffledPrizes] = useState([]);
  const [chosen, setChosen] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('chosenPrize');
    if (stored) {
      setChosen(stored);
    } else {
      const shuffled = [...allPrizes].sort(() => 0.5 - Math.random());
      setShuffledPrizes(shuffled);
    }
  }, []);

  const handleChoice = (index) => {
    const prize = shuffledPrizes[index];
    localStorage.setItem('chosenPrize', prize);
    setChosen(prize);

    // Simulate assigning a redeem code (e.g., 0001, 0002...)
    const id = String(Math.floor(1000 + Math.random() * 9000)).padStart(4, '0');
    localStorage.setItem('redeemCode', id);
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Choose a Prize Chest</h2>

      {chosen ? (
        <div>
          <p className="mb-4 text-lg">🎁 You got: <strong>{chosen}</strong></p>
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
            onClick={() => navigate('/qr')}
          >
            Show Redeem QR
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {shuffledPrizes.map((_, index) => (
            <button
              key={index}
              className="bg-orange-400 text-white py-8 rounded-lg"
              onClick={() => handleChoice(index)}
            >
              🧰 Chest {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrizePage;
