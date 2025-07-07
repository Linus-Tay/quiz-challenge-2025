import React from 'react';
import { useNavigate } from 'react-router-dom';

const HowToPlay = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-white flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-bold mb-4 text-blue-800">How to Play</h2>

        <p className="text-gray-700 mb-4 text-base">
          Welcome to <strong>Quiz Challenge 2025</strong> — a fun and interactive booth-based quiz where your knowledge wins you prizes! Here's a step-by-step guide to participating:
        </p>

        <ol className="list-decimal ml-6 space-y-4 text-gray-800 text-[1.05rem] leading-relaxed">
          <li>
            <strong>Explore the Event:</strong> There are <strong>10 booths</strong> stationed around the venue. Each booth holds a unique QR code.
          </li>

          <li>
            <strong>Scan to Unlock:</strong> Use the <span className="text-blue-600 font-medium">"Scan QR Code"</span> button in the app to scan a booth's code. Each successful scan will unlock a new quiz question in your app.
          </li>

          <li>
            <strong>Track Your Progress:</strong> Head to <span className="text-blue-600 font-medium">"View Progress"</span> at any time to see which questions you've unlocked. Questions will appear in the order you scan them.
          </li>

          <li>
            <strong>Answer Questions:</strong> Tap on each unlocked question to attempt it. You must answer correctly to proceed. Incorrect answers will be highlighted — but don’t worry, you can retry until it turns green!
          </li>

          <li>
            <strong>Complete All 10:</strong> Once all 10 questions are unlocked and correctly answered, you’ll be eligible to proceed to the reward section.
          </li>

          <li>
            <strong>Claim Your Prize:</strong> Tap on <span className="text-green-600 font-medium">"Redeem Prize"</span> and choose one of the 4 mysterious chests. Each contains a unique prize. Your choice is final!
          </li>

          <li>
            <strong>Redeem:</strong> After choosing, you’ll receive a unique redemption QR code. Show it to event staff to collect your prize.
          </li>
        </ol>

        <p className="text-sm mt-6 text-gray-500">
          *Note: Progress is saved on your device. Do not clear your browser data until you've redeemed your prize.
        </p>
      </div>

      <button onClick={() => navigate('/')} className="btn-secondary mt-6">
        ← Back to Home
      </button>
    </div>
  );
};

export default HowToPlay;
