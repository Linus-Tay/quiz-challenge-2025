import React from 'react';
import { useNavigate } from 'react-router-dom';

const CongratsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-6 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-800">🎉 Congratulations!</h1>
      <p className="mb-6 text-lg">You answered all questions correctly!</p>

      <button
        className="bg-yellow-500 text-white px-6 py-3 rounded-lg"
        onClick={() => navigate('/prize')}
      >
        Redeem Prize
      </button>
    </div>
  );
};

export default CongratsPage;
