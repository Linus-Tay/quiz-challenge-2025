import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';


const QRDisplay = () => {
  const [code, setCode] = useState('');

  useEffect(() => {
    const redeemCode = localStorage.getItem('redeemCode');
    if (redeemCode) {
      setCode(redeemCode);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-yellow-100 to-white p-6 text-center">
      <h2 className="text-3xl font-bold text-yellow-700 mb-6 drop-shadow">
        🎫 Your Redemption QR
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        {code ? (
          <QRCodeSVG value={code} size={180} fgColor="#1F2937" />
        ) : (
          <div className="text-5xl font-mono text-gray-400">----</div>
        )}
      </div>

      <p className="text-gray-600 text-sm max-w-xs">
        Please present this code to the prize booth staff to collect your reward.
      </p>
    </div>
  );
};

export default QRDisplay;
