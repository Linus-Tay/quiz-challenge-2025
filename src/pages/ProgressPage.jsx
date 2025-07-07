import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Lock, AlertCircle } from 'lucide-react';

const questions = [
  {
    id: 'booth1',
    text: 'Which technology is widely considered the backbone of generative AI models?',
    options: ['A. Blockchain', 'B. Quantum Computing', 'C. Large Language Models (LLMs)', 'D. Edge Computing'],
    correct: 'C. Large Language Models (LLMs)',
  },
  {
    id: 'booth2',
    text: 'What does ESG stand for in the context of sustainable innovation?',
    options: ['A. Energy, Safety, Growth', 'B. Environmental, Social, and Governance', 'C. Emissions, Systems, Gains', 'D. Ethics, Science, Goals'],
    correct: 'B. Environmental, Social, and Governance',
  },
  {
    id: 'booth3',
    text: 'Which of the following is a key cybersecurity principle?',
    options: ['A. Data deletion', 'B. Vulnerability collection', 'C. Zero Trust Architecture', 'D. Blockchain mining'],
    correct: 'C. Zero Trust Architecture',
  },
  {
    id: 'booth4',
    text: 'What is the primary goal of a startup pitch during a tech conference?',
    options: ['A. Recruit developers', 'B. Raise investment or partnerships', 'C. Promote competitor products', 'D. Complain about bugs'],
    correct: 'B. Raise investment or partnerships',
  },
  {
    id: 'booth5',
    text: 'Which programming language is often used for AI/ML development?',
    options: ['A. JavaScript', 'B. Python', 'C. PHP', 'D. HTML'],
    correct: 'B. Python',
  },
  {
    id: 'booth6',
    text: 'What is a digital twin?',
    options: ['A. A virtual replica of a real-world system', 'B. A cryptocurrency', 'C. A backup robot', 'D. A browser extension'],
    correct: 'A. A virtual replica of a real-world system',
  },
  {
    id: 'booth7',
    text: 'Which organization commonly sets internet standards (like HTTP)?',
    options: ['A. NASA', 'B. W3C', 'C. IMF', 'D. WHO'],
    correct: 'B. W3C',
  },
  {
    id: 'booth8',
    text: 'What does the term “unicorn” refer to in the startup world?',
    options: ['A. A company with mythical branding', 'B. A startup with no revenue', 'C. A company valued at over $1B', 'D. A non-profit organization'],
    correct: 'C. A company valued at over $1B',
  },
  {
    id: 'booth9',
    text: 'In cloud computing, what does SaaS stand for?',
    options: ['A. System as a Server', 'B. Software and Analytics as Security', 'C. Software as a Service', 'D. Secure Access and Services'],
    correct: 'C. Software as a Service',
  },
  {
    id: 'booth10',
    text: 'Which of these technologies is central to reducing carbon emissions in data centers?',
    options: ['A. Water cooling', 'B. Coal-based energy', 'C. Overclocking', 'D. Distributed denial of service'],
    correct: 'A. Water cooling',
  },
];

const ProgressPage = () => {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState([]);
  const [answers, setAnswers] = useState({});
  const [openQuestionId, setOpenQuestionId] = useState(null);

  useEffect(() => {
    //const u = JSON.parse(localStorage.getItem('unlockedQuestions') || '[]');
    const u = ['booth1', 'booth2', 'booth3', 'booth4', 'booth5', 'booth6', 'booth7', 'booth8', 'booth9', 'booth10']
    console.log(u)
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

  const allCorrect =
    unlocked.length === 10 && unlocked.every(id => answers[id]?.correct);

  return (
    <div className="min-h-screen bg-white px-6 py-10 relative">
      {/* 🔙 Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-md shadow-sm"
      >
        ← Home
      </button>

      <h2 className="text-3xl font-bold text-center mb-10">Your Progress</h2>

      {/* Centered Timeline */}
      <div className="relative max-w-lg mx-auto border-l-4 border-gray-200 pl-6">
{questions.map((q, i) => {
  const isUnlocked = unlocked.includes(q.id);
  const userAnswer = answers[q.id];
  const isAnswered = !!userAnswer?.option;
  const isCorrect = userAnswer?.correct;

  let statusColor = 'bg-gray-300';
  let statusIcon = <Lock size={18} />;
  let textColor = 'text-gray-500';

  if (isUnlocked && !isAnswered) {
    statusColor = 'bg-yellow-400';
    textColor = 'text-yellow-700';
    statusIcon = <AlertCircle size={18} />;
  }
  if (isAnswered && isCorrect) {
    statusColor = 'bg-green-600';
    textColor = 'text-green-800';
    statusIcon = <CheckCircle size={18} />;
  }
  if (isAnswered && !isCorrect) {
    statusColor = 'bg-red-500';
    textColor = 'text-red-800';
    statusIcon = <AlertCircle size={18} />;
  }

  return (
    <div key={q.id} className="relative pl-10 mb-10">
      {/* Vertical connector (extends below icon) */}
      {i !== questions.length - 1 && (
        <div className="absolute top-6 left-[11px] w-0.5 h-full bg-gray-200 z-0" />
      )}

      {/* Status circle + label */}
      <div
        className="absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center z-10"
        style={{ backgroundColor: statusColor }}
      >
        {statusIcon}
      </div>

      {/* Clickable question label */}
      <div
        className={`cursor-pointer flex items-center ${textColor}`}
        onClick={() => isUnlocked && setOpenQuestionId(openQuestionId === q.id ? null : q.id)}
      >
        <span className="text-lg font-medium">Question {i + 1}</span>
      </div>

      {/* Inline question area */}
      {openQuestionId === q.id && (
        <div className="mt-3 ml-1 bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-base font-semibold mb-3">{q.text}</h3>
          <div className="space-y-2">
            {q.options.map((opt) => {
              const selected = answers[q.id]?.option === opt;
              const correct = answers[q.id]?.correct;

              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(q.id, opt)}
                  className={`w-full text-left px-4 py-2 rounded-lg border transition font-medium ${
                    selected
                      ? correct
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
})}

      </div>

      {/* ✅ Submit Button */}
      <div className="max-w-lg mx-auto mt-10">
        <button
          onClick={() => allCorrect && navigate('/congrats')}
          disabled={!allCorrect}
          className={`w-full py-3 rounded-lg font-bold transition ${
            allCorrect
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          ✅ Submit All Answers
        </button>
      </div>
    </div>
  );
};

export default ProgressPage;
