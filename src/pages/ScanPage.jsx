import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

const ScanPage = () => {
  const qrRef = useRef(null);
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

    // Stop scanning after success
    html5QrCodeRef.current?.stop().then(() => {
      setScanning(false);
      navigate('/progress');
    });
  };

const startScanner = () => {
  setScanning(true);

  setTimeout(() => {
    const qrRegionId = "qr-reader";
    html5QrCodeRef.current = new Html5Qrcode(qrRegionId);

    html5QrCodeRef.current
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        handleScanSuccess,
        (err) => console.warn("QR scan error", err)
      )
      .catch((err) => {
        console.error("Camera start error", err);
        alert("Camera access failed.");
        setScanning(false);
      });
  }, 300); // wait for DOM to render <div id="qr-reader">
};


  useEffect(() => {
    // Cleanup scanner on unmount
    return () => {
      html5QrCodeRef.current?.stop().catch(() => {});
    };
  }, []);

  return (
    <div className="min-h-screen p-6 bg-white flex flex-col justify-between">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Scan QR to Unlock Questions</h2>

        {!scanning ? (
          <button onClick={startScanner} className="btn-primary w-full">
            📷 Start Scanning
          </button>
        ) : (
          <div className="w-full">
            {scanning && (
  <div id="qr-reader" className="w-full max-w-sm mx-auto rounded-md overflow-hidden shadow-md border" />
)}
            <p className="mt-3 text-sm text-gray-600">Align the QR code within the box.</p>
          </div>
        )}
      </div>

      <button onClick={() => navigate('/progress')} className="btn-secondary mt-6">
        📊 View Progress
      </button>
    </div>
  );
};

export default ScanPage;
