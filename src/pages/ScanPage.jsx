import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

const ScanPage = () => {
  const html5QrCodeRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();

  const handleScanSuccess = (decodedText) => {
    if (!decodedText) return;

    const unlocked = JSON.parse(localStorage.getItem('unlockedQuestions') || '[]');

    if (unlocked.includes(decodedText)) {
      alert(`📌 ${decodedText} already scanned.`);
    } else if (unlocked.length >= 10) {
      alert('✅ All questions already unlocked.');
    } else {
      unlocked.push(decodedText);
      localStorage.setItem('unlockedQuestions', JSON.stringify(unlocked));
      alert(`✅ ${decodedText} unlocked!`);
    }

    html5QrCodeRef.current?.stop().then(() => {
      setScanning(false);
      navigate('/progress');
    });
  };

  const startScanner = () => {
    setScanning(true);
    setTimeout(() => {
      const qrRegionId = 'qr-reader';
      html5QrCodeRef.current = new Html5Qrcode(qrRegionId);
      html5QrCodeRef.current
        .start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: 250 },
          handleScanSuccess,
          (err) => console.warn('QR scan error', err)
        )
        .catch((err) => {
          console.error('Camera start error', err);
          alert('Camera access failed.');
          setScanning(false);
        });
    }, 300);
  };

  useEffect(() => {
    return () => {
      html5QrCodeRef.current?.stop().catch(() => {});
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col p-4 relative">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-md shadow-sm"
      >
        ← Home
      </button>

      <h2 className="text-2xl font-bold text-center mb-6 mt-12">Scan to Unlock</h2>

      {!scanning ? (
        <div className="flex flex-col items-center justify-center flex-grow">
          <button
            onClick={startScanner}
            className="bg-blue-600 text-white px-6 py-4 rounded-xl text-lg shadow-md"
          >
            📷 Start Scanning
          </button>
          <p className="text-sm text-gray-500 mt-4">You'll need camera permission.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow">
          <div
            id="qr-reader"
            className="w-full max-w-md aspect-square rounded-lg border shadow-lg"
          />
          <p className="text-sm text-gray-600 mt-3">Align the QR code within the box.</p>
        </div>
      )}
    </div>
  );
};

export default ScanPage;
