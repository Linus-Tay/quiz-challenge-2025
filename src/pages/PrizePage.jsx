import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import openChest from '../images/chest-open.png';
import closedChest from '../images/chest-closed.png';

const allPrizes = ['Bluetooth Speaker', 'Powerbank', 'Merch Pack', 'Mystery Box'];

const PrizePage = () => {
  const navigate = useNavigate();
  const [shuffledPrizes, setShuffledPrizes] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [chosenIndex, setChosenIndex] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('chosenPrize');
    const storedIndex = localStorage.getItem('chosenPrizeIndex');

    if (stored && storedIndex !== null) {
      setChosen(stored);
      setChosenIndex(parseInt(storedIndex));
    } else {
      const shuffled = [...allPrizes].sort(() => 0.5 - Math.random());
      setShuffledPrizes(shuffled);
    }
  }, []);

  const handleChoice = (index) => {
    const prize = shuffledPrizes[index];
    localStorage.setItem('chosenPrize', prize);
    localStorage.setItem('chosenPrizeIndex', index);
    setChosen(prize);
    setChosenIndex(index);

    const id = String(Math.floor(1000 + Math.random() * 9000)).padStart(4, '0');
    localStorage.setItem('redeemCode', id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-white p-6 flex flex-col items-center justify-center text-center">
      <h2 className="text-4xl font-bold mb-8 text-yellow-700 drop-shadow">
        🎁 Choose a Prize Chest
      </h2>

      {chosen ? (
        <div className="animate-fadeIn">
          <img
            src={openChest}
            alt="Opened Chest"
            className="w-40 mx-auto mb-6 drop-shadow-lg"
          />
          <p className="text-xl font-medium mb-6 text-gray-800">
            You received: <strong className="text-yellow-800">{chosen}</strong>
          </p>
          <button
            onClick={() => navigate('/qr')}
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105"
          >
            🎫 Show Redemption QR
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 max-w-md w-full justify-items-center">
          {shuffledPrizes.map((_, index) => (
            <button
              key={index}
              onClick={() => handleChoice(index)}
              className="flex flex-col items-center transition hover:scale-110 active:scale-95"
            >
              <img
                src={chosenIndex === index ? openChest : closedChest}
                alt={`Chest ${index + 1}`}
                className="w-32 h-32 object-contain mb-2 drop-shadow-md transition-transform duration-300"
              />
              <span className="text-base font-medium text-gray-800">Chest {index + 1}</span>
            </button>
          ))}
        </div>
      )}
      {/* 👇 RESET BUTTON — ONLY FOR TESTING PURPOSES */}
{/*
  <button
    onClick={() => {
      localStorage.removeItem('chosenPrize');
      localStorage.removeItem('chosenPrizeIndex');
      localStorage.removeItem('redeemCode');
      window.location.reload();
    }}
    className="mt-8 text-sm text-red-600 underline"
  >
    Reset Prize (for testing)
  </button>
*/}

    </div>
  );
};

export default PrizePage;
