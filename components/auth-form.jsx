'use client';

import { useState } from 'react';
// Using custom components for now

export default function AuthForm({ onAuthSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Login successful!');
        onAuthSuccess(data.user);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          password: signupData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account created successfully!');
        onAuthSuccess(data.user);
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="w-full max-w-md bg-gray-950 border border-gray-800 rounded-lg shadow-lg">
        <div className="p-6">
          <h1 className="text-center text-2xl font-bold text-white mb-6">
            Job Tracker
          </h1>
          
          {error && (
            <div className="mb-4 p-4 border border-red-800 bg-red-950 rounded text-red-300 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 border border-green-800 bg-green-950 rounded text-green-300 text-sm">
              {success}
            </div>
          )}

          <div className="w-full">
            <div className="flex w-full bg-gray-900 rounded-lg p-1 mb-4">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'login'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'signup'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-black py-2 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            )}

            {activeTab === 'signup' && (
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-black py-2 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}