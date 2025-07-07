import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      alert('Invalid login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-sky-100 flex flex-col justify-center items-center px-6 py-10 text-center">
      <h2 className="text-4xl font-extrabold text-sky-800 mb-8 drop-shadow-sm">Welcome to Quiz Challenge 2025!</h2>
      <form onSubmit={handleSignIn} className="w-full max-w-sm bg-white p-6 rounded-lg shadow space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-sky-700 hover:bg-sky-800 text-white font-semibold py-3 rounded-lg transition"
        >
          🔐 Sign In
        </button>
        <p
          className="text-sm text-gray-600 text-center underline cursor-pointer"
          onClick={() => navigate('/signup')}
        >
          Don’t have an account? Sign Up
        </p>
      </form>
    </div>
  );
};

export default SignIn;
