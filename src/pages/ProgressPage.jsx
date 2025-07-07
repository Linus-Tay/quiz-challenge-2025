import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = Array.from({ length: 10 }, (_, i) => ({
  id: `booth${i + 1}`,
  text: `Question ${i + 1}: What is the correct answer?`,
  options: ['A', 'B', 'C', 'D'],
  correct: 'A',
}));

const ProgressPage = () => {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('unlockedQuestions') || '[]');
    const a = JSON.parse(localStorage.getItem('answers') || '{}');
    setUnlocked(u);
    setAnswers(a);
  }, []);

  const handleAnswer = (id, option) => {
    const correct = questions.find(q => q.id === id).correct === option;
    const updated = { ...answers, [id]: { option, correct } };
    setAnswers(updated);
    localStorage.setItem('answers', JSON.stringify(updated));
  };

  const allCorrect = unlocked.length === 10 && unlocked.every(id => answers[id]?.correct);

  return (
    <div className="min-h-screen p-4 bg-white">
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>

      <div className="space-y-2 mb-6">
        {unlocked.map((id, i) => (
          <button
            key={id}
            onClick={() => setCurrent(id)}
            className={`w-full py-3 px-4 rounded text-left ${
              answers[id]
                ? answers[id].correct
                  ? 'bg-green-200'
                  : 'bg-red-200'
                : 'bg-yellow-100'
            }`}
          >
            Question {i + 1}
          </button>
        ))}
      </div>

      {current && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{questions.find(q => q.id === current).text}</h3>
          {questions.find(q => q.id === current).options.map(opt => (
            <button
              key={opt}
              onClick={() => handleAnswer(current, opt)}
              className={`w-full py-2 mb-2 rounded border ${
                answers[current]?.option === opt
                  ? answers[current]?.correct
                    ? 'bg-green-600 text-white'
                    : 'bg-red-600 text-white'
                  : 'bg-gray-100'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => allCorrect && navigate('/congrats')}
        disabled={!allCorrect}
        className={`w-full py-3 rounded font-bold ${
          allCorrect ? 'bg-green-600 text-white' : 'bg-gray-400 text-gray-200'
        }`}
      >
        ✅ Submit All Answers
      </button>
    </div>
  );
};

export default ProgressPage;
