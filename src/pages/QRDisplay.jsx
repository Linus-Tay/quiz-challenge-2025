import React, { useEffect, useState } from 'react';

const QRDisplay = () => {
  const [code, setCode] = useState('');

  useEffect(() => {
    const redeemCode = localStorage.getItem('redeemCode');
    if (redeemCode) {
      setCode(redeemCode);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Show this code to redeem your prize</h2>

      <div className="text-5xl font-mono bg-gray-100 px-10 py-6 rounded-lg shadow-lg mb-4">
        {code || '----'}
      </div>

      <p className="text-gray-600 text-sm">Staff will scan this code to validate your reward.</p>
    </div>
  );
};

export default QRDisplay;
