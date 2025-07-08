import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';

const SignIn = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const lowerEmail = email.trim().toLowerCase();

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', lowerEmail));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        // User exists — save to localStorage
        localStorage.setItem('quizUser', JSON.stringify({ name, email: lowerEmail }));
        navigate('/home');
      } else {
        // Create new user
        await addDoc(usersRef, {
          name: name.trim(),
          email: lowerEmail,
          unlockedQuestions: [],
          answers: {},
          chosenPrize: null,
          redeemCode: null,
        });
        localStorage.setItem('quizUser', JSON.stringify({ name, email: lowerEmail }));
        navigate('/home');
      }
    } catch (err) {
      console.error('Error signing in:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-sky-100 flex flex-col justify-center items-center px-6 py-10 text-center">
      <h2 className="text-4xl font-extrabold text-sky-800 mb-8 drop-shadow-sm">Welcome to Quiz Challenge 2025!</h2>
      <form onSubmit={handleSignIn} className="w-full max-w-sm bg-white p-6 rounded-lg shadow space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-sky-700 hover:bg-sky-800 text-white font-semibold py-3 rounded-lg transition"
        >
          🚀 Enter
        </button>
      </form>
    </div>
  );
};

export default SignIn;
