import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = Array.from({ length: 10 }, (_, i) => ({
  id: `booth${i + 1}`,
  text: `Question ${i + 1}: What is the correct answer?`,
  options: ['A', 'B', 'C', 'D'],
  correct: 'A',
}));

const ProgressPage = () => {
  const [unlocked, setUnlocked] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unlockedQs = JSON.parse(localStorage.getItem('unlockedQuestions') || '[]');
    const savedAnswers = JSON.parse(localStorage.getItem('answers') || '{}');
    setUnlocked(unlockedQs);
    setAnswers(savedAnswers);
  }, []);

  const handleAnswer = (qid, option) => {
    const question = questions.find(q => q.id === qid);
    const correct = question.correct === option;
    const updated = { ...answers, [qid]: { option, correct } };
    setAnswers(updated);
    localStorage.setItem('answers', JSON.stringify(updated));
  };

  const allCorrect = unlocked.length === 10 && unlocked.every(id => answers[id]?.correct);

  const submit = () => {
    if (!allCorrect) return;
    navigate('/congrats');
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <h2 className="text-2xl font-bold mb-4">Progress</h2>

      <div className="space-y-2 mb-6">
        {unlocked.map((qid, index) => (
          <div key={qid}>
            <button
              className={`w-full py-3 rounded-lg text-left px-4 ${
                answers[qid]
                  ? answers[qid].correct
                    ? 'bg-green-200'
                    : 'bg-red-200'
                  : 'bg-yellow-100'
              }`}
              onClick={() => setCurrent(qid)}
            >
              {`Question ${index + 1}`}
            </button>
          </div>
        ))}
      </div>

      {current && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{questions.find(q => q.id === current)?.text}</h3>
          <div className="space-y-2">
            {questions.find(q => q.id === current)?.options.map(opt => (
              <button
                key={opt}
                onClick={() => handleAnswer(current, opt)}
                className={`w-full py-2 rounded-lg border ${
                  answers[current]?.option === opt
                    ? answers[current]?.correct
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-100'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        disabled={!allCorrect}
        onClick={submit}
        className={`w-full py-3 rounded-lg font-bold ${
          allCorrect ? 'bg-green-600 text-white' : 'bg-gray-400 text-gray-200'
        }`}
      >
        Submit Answers
      </button>
    </div>
  );
};

export default ProgressPage;
