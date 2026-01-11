/**
 * Login Button Component
 * A simple login/logout button that uses ABP authentication
 */

import React from 'react';
import { useAbpAuth } from '../auth';

interface LoginButtonProps {
  className?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ className = '' }) => {
  const { isAuthenticated, isLoading, user, login, logout } = useAbpAuth();

  if (isLoading) {
    return (
      <button 
        disabled 
        className={`px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed ${className}`}
      >
        Loading...
      </button>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm text-gray-700">
          Welcome, {user.userName || user.email}
        </span>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={login}
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ${className}`}
    >
      Login
    </button>
  );
};

export default LoginButton;
